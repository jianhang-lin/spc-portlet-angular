import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { formatPercent } from '@angular/common';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as d3 from 'd3';
import { ChartComponentBase } from '../chart-component-base';
import { isEmptyArray, isNullObject } from '../../utils/object.util';
import * as fromReducers from '../../reducers';
import * as yieldChartAction from '../../actions/yield-chart.action';
import { DiscreteData, PageDiscreteChart } from '../../domain/discrete-chart-data.model';
import { YieldChartDataModel } from '../../domain/yield-chart-data.model';

@Component({
  selector: 'app-yield-chart',
  templateUrl: './yield-chart.component.html',
  styleUrls: ['./yield-chart.component.scss']
})
export class YieldChartComponent implements OnInit, OnChanges, ChartComponentBase {

  public title = 'Yield Chart';
  public data: any;
  public pieData: any;
  private margin = {top: 20, right: 20, bottom: 30, left: 30};
  public width: number;
  private height: number;
  // private x: d3.ScaleOrdinal<string, any>;
  // private y: d3.ScaleLinear<number, number>;
  private z: d3.ScaleOrdinal<string, any>;
  private svg: d3.Selection<any, any, HTMLElement, any>;
  // private line: d3.Line<[number, number]>;

  @ViewChild('chart', {static: true}) private chartContainer: ElementRef;
  @Input() private datas: Array<any>;
  private chart: any;
  private xScale: any;
  private yScale: any;
  private colors: any;
  // private xAxis: d3.Axis<d3.AxisDomain>;
  // private yAxis: d3.Axis<d3.AxisDomain>;
  // private xRangeArray: any;
  yieldChartDiscreteChartDataList: DiscreteData[];
  pageDiscreteChartData: PageDiscreteChart;
  yieldChartData: YieldChartDataModel;
  yieldChartData$: Observable<YieldChartDataModel>;

  radius: number;
  donutWidth: number;
  path: any;
  arcs: any;
  // current: any;
  constructor(public router: Router,
              private route: ActivatedRoute,
              private http: HttpClient,
              private store$: Store<fromReducers.State>) {
    this.width = 1200;
    this.height = 400;

    this.store$.dispatch(new yieldChartAction.LoadYieldChartDataAction(null));
    this.yieldChartData$ = this.store$.select(fromReducers.getYieldChartData);
  }

  ngOnInit(): void {
    this.yieldChartData$.subscribe(yieldChartData => {
      this.yieldChartData = yieldChartData;
      this.yieldChartDiscreteChartDataList = this.yieldChartData.discreteDataList;
      if (isEmptyArray(this.yieldChartDiscreteChartDataList)) {
        const discreteChartData = this.yieldChartDiscreteChartDataList[0];
        this.pieData = Object.assign([
          [
            {label: 'Pass', value: 100 - discreteChartData.defective, visibility: true},
            {label: 'Fail', value: discreteChartData.defective, visibility: true},
          ],
          [
            {label: '', value: 0, visibility: false},
            {label: 'Fail', value: discreteChartData.defective, visibility: true},
          ],
          [
            {label: 'Pass', value: 100 - discreteChartData.defective, visibility: true},
            {label: '', value: 0, visibility: false},
          ]
        ]);
        this.data = Object.assign(this.pieData[0]);
        this.buildSvg();
        this.drawAxis();
        this.drawLineAndPath();
        this.drawLegend();
        this.showTip();
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
    // const xAxisWidth = this.width - this.margin.right - this.margin.left;
    // const xAxisTicksCount = 20;
    // const singleXAxisWidth = xAxisWidth / xAxisTicksCount;
    // this.xRangeArray = [];
    // for (let i = 0; i < xAxisTicksCount; i++) {
    //   this.xRangeArray.push(this.margin.left + singleXAxisWidth * i);
    // }
    // this.x = d3.scaleOrdinal().range(this.xRangeArray);
    // this.y = d3.scaleLinear().range([this.height - this.margin.bottom, this.margin.top]);
    this.z = d3.scaleOrdinal(d3.schemeCategory10);
    this.z.domain(['Pass', 'Fail']);
    // this.y.domain([-1000, 1000]).nice();
  }

  public drawLineAndPath(): void {
    this.radius = this.height / 2;
    this.donutWidth = this.radius;
    const temp = this.svg
      .data([this.data])
      .attr('width', this.width)
      .attr('height', this.height)
      .append('g')
      .attr('class', 'currentPie')
      .attr('transform', `translate(${this.width / 2}, ${this.height / 2})`);
    const pie = d3.pie().value((d: any) => d.value);

    this.arcs = temp.selectAll('g.slice').data(pie(this.data)).enter().append('g').attr('class', (d: any) => {
      const currentLabel: string = d.data.label;
      if (Object.is(currentLabel, 'Pass')) {
        return 'slice passSlice';
      } else if (Object.is(currentLabel, 'Fail')) {
        return 'slice failSlice';
      }

    });
    this.path = this.arcs.append('path')
      .attr('fill', (d, i) => this.z(i.toString()))
      .attr('d', d3.arc().outerRadius(this.radius).innerRadius(0));

  }


  public drawLegend(): void {

    const legend = this.svg.append('g')
      .attr('transform', `translate(${this.width - this.margin.right - this.margin.left}, 100)`);
    const size = 20;
    const borderPadding = 15;
    const itemPadding = 5;
    const textOffset = 2;
    const domains = ['Pass', 'Fail'];
    const arc = d3.arc().innerRadius(0).outerRadius(this.radius);

    legend.append('rect')
      .attr('width', 210)
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
      .text((d) => {
        return d;
      })
      .attr('text-anchor', 'left')
      .style('alignment-baseline', 'middle')
      .style('font-family', 'sans-serif')
      .on('click', (d) => {
        const toggleVisibility = this.data[0].visibility && this.data[1].visibility;
        if (Object.is(d, 'Pass')) {
          this.data = toggleVisibility ? this.pieData[2] : this.pieData[0];
          d3.selectAll('.passSlice').selectAll('text').attr('visibility', this.data[0].visibility ? 'visible' : 'hidden');
          d3.selectAll('.failSlice').selectAll('text').attr('visibility', this.data[1].visibility ? 'visible' : 'hidden');
        } else if (Object.is(d, 'Fail')) {
          this.data = toggleVisibility ? this.pieData[1] : this.pieData[0];
          d3.selectAll('.passSlice').selectAll('text').attr('visibility', this.data[0].visibility ? 'visible' : 'hidden');
          d3.selectAll('.failSlice').selectAll('text').attr('visibility', this.data[1].visibility ? 'visible' : 'hidden');
        }
        const pie = d3.pie().value((dd: any) => dd.value);
        const path = d3.select('svg').selectAll('path').data(pie(this.data));
        path.transition().duration(200).attrTween('d', arcTween);
        path
          .enter()
          .append('path')
          .attr('fill', (ddd, i) => this.z(i.toString()))
          .attr('d', null)
          .attr('stroke', 'white')
          .attr('stroke-width', '6px')
          .each(() => {

          });
      });

    function arcTween(a) {
      const i = d3.interpolate(this._current, a);
      // this._current = i(1);
      return (t) => arc(i(t));
    }
  }

  public showTip(): void {
    const arcOver = d3.arc().outerRadius(this.radius + 10).innerRadius(0);
    const moved = function(d) {
      d3.event.preventDefault();
      const mouse = d3.mouse(this);
      dot.attr('transform', 'translate(' + d3.event.pageX + ',' +  d3.event.pageY + ')');
      dot.select('.tooltip-date').text(d.data.label);
      dot.select('.tooltip-likes').text(formatPercent(d.data.value / 100, 'en-US', '1.2-2'));
    };
    const entered = function(d) {
      const mouse = d3.mouse(this);
      d3.select(this)
        .attr('stroker', 'white')
        .transition()
        .duration(1000)
        .attr('d', arcOver.startAngle(d.startAngle).endAngle(d.endAngle))
        .attr('stroker-width', 6);
      dot.attr('transform', 'translate(' + d3.event.pageX + ',' +  d3.event.pageY + ')');
      d3.select('.tooltip-date').text(d.data.label);
      d3.select('.tooltip-likes').text(formatPercent(d.data.value / 100, 'en-US', '1.2-2'));
      d3.select('.focus').attr('display', null);
    };
    const left = function(d) {
      d3.select(this).transition().duration(1000).attr('d', d3.arc().outerRadius(200).innerRadius(0));
      d3.select('.focus').attr('display', 'none');
    };
    if ('ontouchstart' in document) {
      /*d3.select('svg').style('-webkit-tap-highlight-color', 'transparent')
        .on('touchmove', moved)
        .on('touchstart', entered)
        .on('touchend', left);*/
    } else {
      this.path
        .on('mousemove', moved)
        .on('mouseenter', entered)
        .on('mouseout', left);
      this.arcs.append('text').attr('transform', (d: any) => {
        const arc = d3.arc().outerRadius(this.radius).innerRadius(0);
        const c = arc.centroid(d);
        return 'translate(' + c[0] + ',' + c[1] + ')';
      }).text((d: any) => {
        return d.data.label;
      });
    }
    const dot = d3.select('svg').append('g')
      .attr('class', 'focus')
      .attr('display', 'none');
     // .append('circle')
     //  .attr('r', 2.5).attr('fill', 'steelblue');
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
    if (this.data) {
      console.log(this.data);
    }
    if (this.datas) {
      console.log(this.datas);
    }
  }

}
