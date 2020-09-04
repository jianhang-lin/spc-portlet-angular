import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as d3 from 'd3';
import { ChartComponentBase } from '../chart-component-base';
import { isEmptyArray } from '../../utils/object.util';
import * as fromReducers from '../../reducers';
import * as paretoChartAction from '../../actions/pareto-chart.action';
import { ParetoChartDataModel } from '../../domain/pareto-chart-data.model';

@Component({
  selector: 'app-pareto-chart',
  templateUrl: './pareto-chart.component.html',
  styleUrls: ['./pareto-chart.component.scss']
})
export class ParetoChartComponent implements OnInit, OnChanges, ChartComponentBase {

  public title = 'Pareto Chart';
  public data: any;
  private margin = {top: 50, right: 50, bottom: 50, left: 50};
  public width: number;
  private height: number;
  // private x: d3.ScaleOrdinal<string, any>;
  // private y: d3.ScaleLinear<number, number>;
  private z: d3.ScaleOrdinal<string, any>;
  private svg: d3.Selection<any, any, HTMLElement, any>;
  private line: any;
  private cumulativeDot: any;

  @ViewChild('chart', {static: true}) private chartContainer: ElementRef;
  @Input() private datas: Array<any>;
  private chart: any;
  private xScale: any;
  private yScale: any;
  private colors: any;
  private xAxis: d3.Axis<d3.AxisDomain>;
  private yAxis: d3.Axis<d3.AxisDomain>;
  private yAxis2: d3.Axis<d3.AxisDomain>;
  private xRangeArray: any;
  private yhist: any;
  private ycum: any;
  private showDefectNumber: boolean;
  private showCumulative: boolean;
  private bar: any;
  paretoChartDataList: ParetoChartDataModel[];
  paretoChartDataList$: Observable<ParetoChartDataModel[]>;
  constructor(public router: Router,
              private route: ActivatedRoute,
              private http: HttpClient,
              private store$: Store<fromReducers.State>) {
    this.width = 960 - this.margin.left - this.margin.right; // window.innerWidth - this.margin.left - this.margin.right;
    this.height = 500 - this.margin.top - this.margin.bottom; // window.innerHeight - this.margin.top - this.margin.bottom;
    this.showDefectNumber = true;
    this.showCumulative = true;
    this.store$.dispatch(new paretoChartAction.LoadParetoChartDataListAction(null));
    this.paretoChartDataList$ = this.store$.select(fromReducers.getParetoChartData);
  }

  ngOnInit(): void {
    this.paretoChartDataList$.subscribe(paretoChartDataList => {
      this.paretoChartDataList = paretoChartDataList;
      if (isEmptyArray(this.paretoChartDataList)) {
        this.data = [];
        this.paretoChartDataList.forEach((w) => {
          this.data.push(Object.assign({Category: w.description, Amount: w.countnumber, visibility: true}));
        });

        let totalAmount = 0;
        for (let i = 0; i < this.data.length; i++) {
          this.data[i].Amount = +this.data[i].Amount;
          totalAmount += this.data[i].Amount;
          if (i > 0) {
            this.data[i].CumulativeAmount = this.data[i].Amount + this.data[i - 1].CumulativeAmount;
          } else {
            this.data[i].CumulativeAmount = this.data[i].Amount;
          }
        }
        for (let i = 0; i < this.data.length; i++) {
          this.data[i].CumulativePercentage = (this.data[i].CumulativeAmount / totalAmount);
          this.data[i].CumulativePercentage = parseFloat(this.data[i].CumulativePercentage.toFixed(2));
        }

        const dataset = this.data;
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
      .attr('width', this.width + this.margin.left + this.margin.right)
      .attr('height', this.height + this.margin.top + this.margin.bottom)
      .attr('class', 'paretoSvg')
      .append('g')
      .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
  }

  public drawAxis(): void {
    const xAxisWidth = this.width - this.margin.right - this.margin.left;
    const xAxisTicksCount = this.data.length;
    const singleXAxisWidth = xAxisWidth / xAxisTicksCount;
    this.xRangeArray = [];
    for (let i = 0; i < xAxisTicksCount; i++) {
      this.xRangeArray.push(this.margin.left + singleXAxisWidth * i);
    }

    this.xScale = d3.scaleBand().rangeRound([0, this.width]).padding(0.1);
    this.xScale.domain(this.data.map((d) => d.Category));
    this.yhist = d3.scaleLinear().domain([0, d3.max(this.data, (d: any) => Number(d.Amount))]).range([this.height, 0]);

    this.ycum = d3.scaleLinear().domain([0, 1]).range([this.height, 0]);
    this.xAxis = d3.axisBottom(this.xScale); // .ticks(xAxisTicksCount);
    this.yAxis = d3.axisLeft(this.yhist);
    this.yAxis2 = d3.axisRight(this.ycum);
    this.z = d3.scaleOrdinal(d3.schemeCategory10);
    this.z.domain(['Defect Number', 'Cumulative']);

    this.svg.append('g')
      .attr('class', 'x paretoAxis')
      .attr('transform', `translate(0, ${this.height})`)
      .style('fill', 'unset')
      .style('font-size', 'unset')
      .style('font-family', 'unset')
      // .style('text-anchor', 'unset')
      .call(this.xAxis);
    this.svg.append('g')
      .attr('class', 'y paretoAxis')
      .style('fill', 'unset')
      .call(this.yAxis)
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6).attr('dy', '.71em')
      .style('text-anchor', 'end').text('Defect Number');
    this.svg.append('g')
      .attr('class', 'y paretoAxis')
      .attr('transform', 'translate(' + this.width   + ',0)')
      .style('fill', 'unset')
      .call(this.yAxis2)
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 4)
      .attr('dy', '-.71em')
      .style('text-anchor', 'end')
      .text('Cumulative %');

  }

  public drawLineAndPath(): void {
    this.bar = this.svg.selectAll('.paretoBar').data(this.data).enter().append('g').attr('class', 'paretoBar');
    this.bar.append('rect')
      .attr('x',  (d: any) => this.xScale(d.Category))
      .attr('width', this.xScale.bandwidth())
      .attr('y',  (d: any) => this.yhist(d.Amount))
      .attr('height', (d: any) => this.height - this.yhist(d.Amount))
    // .style('fill', 'steelblue')
    // .style('shape-rendering', 'crispEdges')
    ;

    const guide = d3.line()
      .x( (d: any) => this.xScale(d.Category))
      .y( (d: any) => this.ycum(d.CumulativePercentage))
      .curve(d3.curveLinear);
    this.line = this.svg.append('path')
        .datum(this.data)
        .attr('d', guide)
        .attr('class', 'paretoLine')
    ;
    this.cumulativeDot = this.svg.selectAll('.cumulativeDot')
      .data(this.data)
      .enter()
      .append('circle')
      .attr('class', 'cumulativeDot')
      .attr('r', 3.5)
      .attr('fill', 'steelblue')
      .attr('cx', (d: any) => this.xScale(d.Category))
      .attr('cy', (d: any) => this.ycum(d.CumulativePercentage));
  }

  public drawLegend(): void {

    const legend = this.svg.append('g')
      .attr('transform', 'translate(' + (this.width - this.margin.right - this.margin.left)  + ', 100)');
    const size = 20;
    const borderPadding = 15;
    const itemPadding = 5;
    const textOffset = 2;
    const domains = ['Defect Number', 'Cumulative'];
    legend.append('rect')
      .attr('width', 120)
      .attr('height', 80)
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
        if (Object.is(d, 'Defect Number')) {
          this.showDefectNumber = !this.showDefectNumber;
          d3.selectAll('.paretoBar').style('visibility', this.showDefectNumber ? 'visible' : 'hidden');
        } else if (Object.is(d, 'Cumulative')) {
          this.showCumulative = !this.showCumulative;
          d3.selectAll('.paretoLine').style('visibility', this.showCumulative ? 'visible' : 'hidden');
          d3.selectAll('.cumulativeDot').style('visibility', this.showCumulative ? 'visible' : 'hidden');
        }
      });
  }

  public showTip(): void {
    const barMoved = (d) => {
      d3.event.preventDefault();
      const mouse = d3.mouse(d3.event.target);
      d3.selectAll('.circleTip').style('visibility', 'hidden');
      barTip.attr('transform', 'translate(' + d3.event.pageX + ',' +  d3.event.pageY + ')');
      barTip.select('.tooltip-date').text(d.Category);
      barTip.select('.tooltip-likes').text(d.Amount);
    };
    const barEntered = () => {
      /*d3.selectAll('.line path').attr('mix-blend-mode', null).style('stroke', (v: any) => {
        return this.z(v.name);
      });*/
      barTip.attr('display', null);
    };
    const barLeft = () => {
      // d3.selectAll('.line path').style('mix-blend-mode', 'multiply').style('stroke', (d: any) => this.z(d.name));
      barTip.attr('display', 'none');
    };
    const dotMoved = (d) => {
      d3.event.preventDefault();
      const mouse = d3.mouse(d3.event.target);
      const position = d3.bisectLeft(this.xRangeArray, mouse[0]);
      const xm = 0;
      const ym = this.ycum.invert(mouse[1]);
      const i1 = position;
      const i0 = i1 - 1;
      const i = i0 > 0 ? i1 : 1;
      barTip
        .attr('transform',
          `translate(${(this.xScale(this.data[i - 1].Category) + this.margin.left)} , ${(this.ycum(ym) + this.margin.top)})`);
      barTip.select('.tooltip-date').text(d.Category);
      barTip.select('.tooltip-likes').text(d.CumulativePercentage);
    };
    const dotEntered = () => {
      /*d3.selectAll('.line path').attr('mix-blend-mode', null).style('stroke', (v: any) => {
        return this.z(v.name);
      });*/
      barTip.attr('display', null);
    };
    const dotLeft = () => {
      // d3.selectAll('.line path').style('mix-blend-mode', 'multiply').style('stroke', (d: any) => this.z(d.name));
      barTip.attr('display', 'none');
    };
    if ('ontouchstart' in document) {
      /*d3.select('svg').style('-webkit-tap-highlight-color', 'transparent')
        .on('touchmove', barMoved)
        .on('touchstart', barEntered)
        .on('touchend', barLeft);*/
    } else {
      this.bar
        .on('mousemove', barMoved)
        .on('mouseenter', barEntered)
        .on('mouseleave', barLeft);

      this.cumulativeDot
        .on('mousemove', dotMoved)
        .on('mouseenter', dotEntered)
        .on('mouseleave', dotLeft);
    }
    const barTip = d3.select('svg').append('g')
      .attr('class', 'focus')
      .attr('display', 'none');
    // barTip.append('circle').attr('r', 2.5).attr('fill', 'steelblue').attr('class', 'circleTip');
    barTip.append('rect')
      .attr('class', 'tooltip')
      .attr('width', 100)
      .attr('height', 50)
      .attr('x', 10)
      .attr('y', -22)
      .attr('rx', 4)
      .attr('ry', 4)
      .attr('fill', 'white')
      .attr('stroke', '#000');
    barTip.append('text')
      .attr('class', 'tooltip-date')
      .attr('x', 18)
      .attr('y', -2)
      .attr('font-weight', 'bold')
      .attr('font-size', 14);
    // .attr('font-family', 'sans-serif').attr('font-size', 10).attr('text-anchor', 'middle').attr('y', -8);
    barTip.append('text')
      .attr('x', 18)
      .attr('y', 18)
      .attr('font-size', 14)
      .text('Value:');
    barTip.append('text')
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
