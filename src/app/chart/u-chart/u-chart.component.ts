import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as d3 from 'd3';
import { ChartComponentBase } from '../chart-component-base';
import { least } from '../../utils/chart.util';
import { isEmptyArray, isNullObject } from '../../utils/object.util';
import * as fromReducers from '../../reducers';
import * as uChartAction from '../../actions/u-chart.action';
import { DiscreteData, PageDiscreteChart } from '../../domain/discrete-chart-data.model';
import { UChartDataModel } from '../../domain/u-chart-data.model';

@Component({
  selector: 'app-u-chart',
  templateUrl: './u-chart.component.html',
  styleUrls: ['./u-chart.component.scss']
})
export class UChartComponent implements OnInit, OnChanges, ChartComponentBase {

  public title = 'U Chart';
  public data: any;
  private margin = {top: 20, right: 20, bottom: 30, left: 30};
  public width: number;
  private height: number;
  private x: d3.ScaleOrdinal<string, any>;
  private y: d3.ScaleLinear<number, number>;
  private z: d3.ScaleOrdinal<string, any>;
  private svg: d3.Selection<any, any, HTMLElement, any>;
  private line: d3.Line<[number, number]>;

  @ViewChild('chart', {static: true}) private chartContainer: ElementRef;
  @Input() private datas: Array<any>;
  private chart: any;
  private xScale: any;
  private yScale: any;
  private colors: any;
  private xAxis: d3.Axis<d3.AxisDomain>;
  private yAxis: d3.Axis<d3.AxisDomain>;
  private xRangeArray: any;
  cChartDiscreteChartDataList: DiscreteData[];
  pageDiscreteChartData: PageDiscreteChart;
  uChartData: UChartDataModel;
  uChartData$: Observable<UChartDataModel>;
  constructor(public router: Router,
              private route: ActivatedRoute,
              private http: HttpClient,
              private store$: Store<fromReducers.State>) {
    this.width = 1200;
    this.height = 400;
    this.store$.dispatch(new uChartAction.LoadUChartDataAction(null));
    this.uChartData$ = this.store$.select(fromReducers.getUChartData);
  }

  ngOnInit(): void {
    this.uChartData$.subscribe(uChartData => {
      this.uChartData = uChartData;
      this.pageDiscreteChartData = this.uChartData.pageDiscreteChartData;
      if (isNullObject(this.pageDiscreteChartData)) {
        this.cChartDiscreteChartDataList = this.pageDiscreteChartData.discreteDataList;
        if (isEmptyArray(this.cChartDiscreteChartDataList)) {
          const labels = [];
          const ratio = [];
          const ucl = [];
          const lcl = [];
          const cl = [];
          this.cChartDiscreteChartDataList.forEach( (discreteData) => {
            labels.push(discreteData.seq);
            ratio.push(discreteData.defects);
            ucl.push(discreteData.ucl);
            lcl.push(discreteData.lcl);
            cl.push(discreteData.lcl);
          });
          this.data = Object.assign({
            y: 'Defects',
            series: [
              {name: 'Ratio(Defects/Inspected)', values: ratio, visibility: true},
              {name: 'UCL', values: ucl, visibility: true},
              {name: 'LCL', values: lcl, visibility: true},
              {name: 'CL', values: cl, visibility: true},
            ],
            dates: labels,
          });
          this.buildSvg();
          this.drawAxis();
          this.drawLineAndPath();
          this.drawLegend();
          this.showTip();
        }
      }

    });

    // this.createChart();
    if (this.datas) {
      // this.updateChart();
    }
  }

  public buildSvg(): void {
    this.svg = d3.select('svg')
      .attr('viewBox', `0, 0, ${this.width}, ${this.height}`)
      .style('overflow', 'visible');
  }

  public drawAxis(): void {
    const xAxisWidth = this.width - this.margin.right - this.margin.left;
    const xAxisTicksCount = this.data.series[0].values.length;
    const singleXAxisWidth = xAxisWidth / xAxisTicksCount;
    this.xRangeArray = [];
    for (let i = 0; i < xAxisTicksCount; i++) {
      this.xRangeArray.push(this.margin.left + singleXAxisWidth * i);
    }
    this.x = d3.scaleOrdinal().range(this.xRangeArray);
    this.y = d3.scaleLinear().range([this.height - this.margin.bottom, this.margin.top]);
    this.z = d3.scaleOrdinal(d3.schemeCategory10);
    this.x.domain(this.data.dates);
    this.y.domain([d3.min(this.data.series, (d: any) => d3.min(d.values) as unknown as number),
      d3.max(this.data.series, (d: any) => d3.max(d.values) as unknown as number)]).nice();
    this.z.domain(['Ratio(Defects/Inspected)', 'UCL', 'LCL', 'CL']);
    this.xAxis = d3.axisBottom(this.x).ticks(xAxisTicksCount);
    this.yAxis = d3.axisLeft(this.y);

    this.svg.append('g').attr('class', 'xAxis').attr('transform', `translate(0, ${this.height - this.margin.bottom})`).call(this.xAxis);
    this.svg.append('g').attr('class', 'yAxis').attr('transform', `translate(${this.margin.left}, 0)`).call(this.yAxis)
      .select('.domain').remove()
      .select('.tick:last-of-type text').clone().attr('x', 3)
      .attr('text-anchor', 'start')
      .attr('font-weight', 'bold').text(this.data.y);
  }

  public drawLineAndPath(): void {
    this.line = d3.line()
      .x((d: any, i) => this.x(this.data.dates[i]))
      .y((d: any) => this.y(d));
    const lines = this.svg.selectAll('lines').data(this.data.series).enter().append('g').attr('class', 'line')
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 1.5)
      .attr('stroke-linejoin', 'round')
      .attr('stroke-linecap', 'round');

    lines.append('path').attr('class', 'line').attr('d', (d: any) => this.line(d.values)).style('stroke', (d: any) => this.z(d.name));
  }

  public drawLegend(): void {

    const xAxisWidth = this.width - this.margin.right - this.margin.left;
    const xAxisTicksCount = this.data.series[0].values.length;
    const singleXAxisWidth = xAxisWidth / xAxisTicksCount;

    const legend = this.svg.append('g')
      .attr('transform', 'translate(' + (this.margin.left + singleXAxisWidth * (xAxisTicksCount - 1) + 10)  + ', 100)');
    const size = 20;
    const borderPadding = 15;
    const itemPadding = 5;
    const textOffset = 2;
    const domains = ['Ratio(Defects/Inspected)', 'UCL', 'LCL', 'CL'];
    legend.append('rect')
      .attr('width', 120)
      .attr('height', 125)
      .style('fill', 'none')
      .style('stroke-width', 1)
      .attr('stroke', 'black');
    legend.selectAll('boxes').data(domains).enter().append('rect')
      .attr('x', borderPadding)
      .attr('y', (d, i) => borderPadding + (i * (size + itemPadding)))
      .attr('width', size)
      .attr('height', size)
      .style('fill', (d) => this.z(d));
    legend.selectAll('labels')
      .data(domains)
      .enter()
      .append('text')
      .attr('x', borderPadding + size + itemPadding)
      .attr('y', (d, i) => borderPadding + i * ( size + itemPadding) + (size / 2) + textOffset)
      .text((d) => d)
      .attr('text-anchor', 'left')
      .style('alignment-baseline', 'middle')
      .style('font-family', 'sans-serif')
      .on('click', (d) => {
        this.data.series.forEach((w: any) => {
          if (w.name === d) {
            w.visibility = !w.visibility;
          }
        });
        d3.selectAll('.line path')
          .style('stroke', (v: any) => {
            return (v.name !== d && !v.visibility) ? '#DCDCDC' : this.z(v.name);
          })
          .style('visibility', (v: any) => {
            let toggleVisibility = false;
            this.data.series.forEach((w: any) => {
              if (w.name === v.name) {
                toggleVisibility = w.visibility;
              }
            });
            return toggleVisibility ? 'visible' : 'hidden';
          })
          .filter((v: any) => v.name === d).raise();
      });
  }

  public showTip(): void {
    const formatTime = d3.timeFormat('%m/%d/%y');

    const moved = () => {
      d3.event.preventDefault();
      const mouse = d3.mouse(d3.event.target);
      // const xm: any = this.x.invert(mouse[0]);
      const position = d3.bisectLeft(this.xRangeArray, mouse[0]);
      const xm = 0;
      const ym = this.y.invert(mouse[1]);
      const i1 = position; // d3.bisectLeft(this.xRangeArray, xm , 1);
      const i0 = i1 - 1;
      let i = xm - this.data.dates[0] > this.data.dates[i1] - xm ? i1 : i0;
      i = i1;
      const s: any = least(this.data.series, (r: any) => Math.abs(r.values[i] - ym));
      if (s) {
        d3.selectAll('.line path')
        // .style('stroke', (v: any) => {
        // v !== s ? '#DCDCDC' : this.z(v.name);
        //  return this.z(v.name);
        // })
          .filter(v => v === s).raise();
        dot.attr('transform', `translate(${this.x(this.data.dates[i])}, ${this.y(s.values[i])})`);
        dot.select('.tooltip-date').text(formatTime(this.data.dates[i]));
        dot.select('.tooltip-likes').text(s.values[i]);
      }
    };
    const entered = () => {
      d3.selectAll('.line path').attr('mix-blend-mode', null).style('stroke', (v: any) => {
        return this.z(v.name);
      });
      dot.attr('display', null);
    };
    const left = () => {
      d3.selectAll('.line path').style('mix-blend-mode', 'multiply').style('stroke', (d: any) => this.z(d.name));
      dot.attr('display', 'none');
    };
    if ('ontouchstart' in document) {
      d3.select('svg').style('-webkit-tap-highlight-color', 'transparent')
        .on('touchmove', moved)
        .on('touchstart', entered)
        .on('touchend', left);
    } else {
      d3.select('svg')
        .on('mousemove', moved)
        .on('mouseenter', entered)
        .on('mouseleave', left);
    }
    const dot = d3.select('svg').append('g')
      .attr('class', 'focus')
      .attr('display', 'none');
    dot.append('circle')
      .attr('r', 2.5).attr('fill', 'steelblue');
    dot.append('rect')
      .attr('class', 'tooltip')
      .attr('width', 100)
      .attr('height', 50)
      .attr('x', 10)
      .attr('y', -22)
      .attr('rx', 4)
      .attr('ry', 4)
      .attr('fill', 'white')
      .attr('stroke', '#000');
    dot.append('text')
      .attr('class', 'tooltip-date')
      .attr('x', 18)
      .attr('y', -2)
      .attr('font-weight', 'bold')
      .attr('font-size', 14);
    // .attr('font-family', 'sans-serif').attr('font-size', 10).attr('text-anchor', 'middle').attr('y', -8);
    dot.append('text')
      .attr('x', 18)
      .attr('y', 18)
      .attr('font-size', 14)
      .text('Value:');
    dot.append('text')
      .attr('class', 'tooltip-likes')
      .attr('x', 60)
      .attr('y', 18)
      .attr('font-size', 14)
      .attr('font-weight', 'bold');
  }

  createChart() {
    const element = this.chartContainer.nativeElement;
    this.width = 296 - this.margin.left - this.margin.right; // element.offsetWidth - this.margin.left - this.margin.right;
    this.height = 150 - this.margin.top - this.margin.bottom; // element.offsetHeight - this.margin.top - this.margin.bottom;
    const svg = d3.select(element).append('svg').attr('width', element.offsetWidth).attr('height', element.offsetHeight);

    this.chart = svg.append('g').attr('class', 'bars')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);

    const xDomain = this.datas.map(d => d[0]);
    const yDomain = [0, d3.max(this.datas, d => d[1])];

    this.xScale = d3.scaleBand().padding(0.1).domain(xDomain).rangeRound([0, this.width]);
    this.yScale = d3.scaleLinear().domain(yDomain).range([this.height, 0]);

    this.colors = d3.scaleLinear().domain([0, this.datas.length]).range(['red', 'blue'] as any[]);
    /*this.xAxis = svg.append('g')
      .attr('class', 'axis axis-x')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top + this.height})`)
      .call(d3.axisBottom(this.xScale));
    this.yAxis = svg.append('g')
      .attr('class', 'axis axis-y')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`)
      .call(d3.axisLeft(this.yScale));*/
  }

  updateChart() {
    this.xScale.domain(this.datas.map(d => d[0]));
    this.yScale.domain([0, d3.max(this.datas, d => d[1])]);
    this.colors.domain([0, this.datas.length]);
    // this.xAxis.transition().call(d3.axisBottom(this.xScale));
    // this.yAxis.transition().call(d3.axisLeft(this.yScale));

    const update = this.chart.selectAll('.bar').data(this.datas);
    update.exit().remove();
    this.chart.selectAll('.bar').transition()
      .attr('x', d => this.xScale(d[0]))
      .attr('y', d => this.yScale(d[1]))
      .attr('width', d => this.xScale.bandwidth())
      .attr('height', d => this.height - this.yScale(d[1]))
      .style('fill', (d, i) => this.colors(i));

    update.enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', d => this.xScale(d[0]))
      .attr('y', d => this.yScale(0))
      .attr('width', this.xScale.bandwidth())
      .attr('height', 0)
      .style('fill', (d, i) => this.colors(i))
      .transition()
      .delay((d, i) => i * 10)
      .attr('y', d => this.yScale(d[1]))
      .attr('height', d => this.height - this.yScale(d[1]));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.chart) {
      // this.updateChart();
    }
  }

}
