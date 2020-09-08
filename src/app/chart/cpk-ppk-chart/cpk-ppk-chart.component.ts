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
import * as cpkPpkChartAction from '../../actions/cpk-ppk-chart.action';
import { DiscreteData, PageDiscreteChart } from '../../domain/discrete-chart-data.model';
import { CpkPpkChartDataModel } from '../../domain/cpk-ppk-chart-data.model';

@Component({
  selector: 'app-cpk-ppk-chart',
  templateUrl: './cpk-ppk-chart.component.html',
  styleUrls: ['./cpk-ppk-chart.component.scss']
})
export class CpkPpkChartComponent implements OnInit, OnChanges, ChartComponentBase  {

  public title = 'CpkPpk Chart';
  public data: any;
  public pieData: any;
  private margin = {top: 20, right: 40, bottom: 30, left: 50};
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
  cpkPpkChartData: CpkPpkChartDataModel;
  cpkPpkChartData$: Observable<CpkPpkChartDataModel>;

  radius: number;
  donutWidth: number;
  path: any;
  arcs: any;
  series: any;
  // current: any;
  formatCount: any;
  numBuckets: number;
  numberOfDataPoints: number;
  mean: number;
  stdDeviatian: number;
  stdDeviationWithIn: number;
  normalDistributionFunction: any;
  actualData: any;
  sum: any;
  probability: number;
  variance: number;
  idealData: number[];
  idealData2: number[];
  max: any;
  min: any;
  dataBar: any;
  x: any;
  yMax: any;
  y: any;
  xAxis: any;
  yAxis: any;
  private yAxis2: d3.Axis<d3.AxisDomain>;
  xNormal: any;
  yNormal: any;
  xNormal2: any;
  yNormal2: any;
  linePlot: any;
  linePlot2: any;
  ycum: any;
  constructor(public router: Router,
              private route: ActivatedRoute,
              private http: HttpClient,
              private store$: Store<fromReducers.State>) {
    this.width = 960 - this.margin.left - this.margin.right;
    this.height = 500 - this.margin.top - this.margin.bottom;



    this.store$.dispatch(new cpkPpkChartAction.LoadCpkPpkChartDataAction(null));
    this.cpkPpkChartData$ = this.store$.select(fromReducers.getCpkPpkChartData);


  }

  private get_data(mean, sigma, x) {
    const data = [];
    for (let i = 0; i < this.width; i++) {
      const q = x.invert(i);
      const p = this.gaussian_pdf(q, mean, sigma);
      const el = {q, p};
      data.push(el);
    }
    data.sort(function (xx, y) {
      return xx.q - y.q;
    });
    return data;
  }

  private gaussian_pdf(xR, mean, sigma) {
    const gaussianConstant = 1 / Math.sqrt(2 * Math.PI);
    const xxxx = (xR - mean) / sigma;
    return gaussianConstant * Math.exp(-.5 * xxxx * xxxx) / sigma;
  }

  private getProbabilityData(normalizedData, m, v): number[] {
    const data = [];
    for (let i = 0; i < normalizedData.length; i += 1) {
      const q = normalizedData[i];
      const p = this.probabilityDensityCalculation(q, m, v);
      const el = { q, p};
      data.push(el);
    }
    /*data.push({q: 31.3636, p: 1});
    data.push({q: 34.0909, p: 1});
    data.push({q: 36.8182, p: 0});
    data.push({q: 39.5455, p: 1});
    data.push({q: 42.2727, p: 0});
    data.push({q: 45, p: 4});
    data.push({q: 47.7273, p: 2});
    data.push({q: 50.4545, p: 1});
    data.push({q: 53.1818, p: 0});
    data.push({q: 55.9091, p: 0});
    data.push({q: 58.6364, p: 0});*/
    data.sort(function(x, y) {
      return x.q - y.q;
    });
    return data;
  }

  private probabilityDensityCalculation(x, mean, variance): number {
    const m = Math.sqrt(2 * Math.PI * variance);
    const e = Math.exp(-Math.pow(x - mean, 2) / (2 * variance));
    return e / m;
  }

  ngOnInit(): void {
    this.cpkPpkChartData$.subscribe(cpkPpkChartData => {
      this.cpkPpkChartData = cpkPpkChartData;
      if (isEmptyArray(this.cpkPpkChartData.datas)) {
        this.pieData = [];
        this.data = [];
        console.log(JSON.stringify(cpkPpkChartData));

        this.series = ['Actual', 'Ideal'];
        this.colors = d3.scaleOrdinal(d3.schemeCategory10);
        this.colors.domain(this.series);
        this.formatCount = d3.format(',.0f');
        this.numBuckets = 10;
        this.numberOfDataPoints = 20;
        this.mean = 105.458;
        this.stdDeviatian = 8.31948;
        this.stdDeviationWithIn = 6.28966;
        this.normalDistributionFunction = d3.randomNormal(this.mean, this.stdDeviatian);
        // ['31.3636', '34.0909', '36.8182', '39.5455', '42.2727',
        //           '45', '47.7273', '50.4545', '53.1818', '55.9091', '58.6364'];
        this.actualData = [
          125.358493,
          107.609410,
          112.524459,
          101.673722,
          103.311081,
          110.197375,
          106.192040,
          101.928823,
          96.318163,
          105.644594,
          92.994049,
          94.065836,
          99.319944,
          99.483252,
          104.607748,
          120.619625,
          114.920230,
          102.841946,
          100.294047,
          109.248236,
        ]; /*[31.3636, 34.0909, 39.5455,
          45, 45, 45, 45, 47.7273, 47.7273, 50.4545, 55.9091, 58.6364];*/
        // d3.range(this.numberOfDataPoints).map(this.normalDistributionFunction);
        this.sum = d3.sum(this.actualData);
        this.probability = 1 / this.numberOfDataPoints;
        this.variance = this.sum * this.probability * (1 - this.probability);
        const actualData2 = d3.range(1000).map(this.normalDistributionFunction);
         // this.getProbabilityData(actualData2, this.mean, this.variance);
        this.max = d3.max(this.actualData);
        this.min = d3.min(this.actualData);
        this.x = d3.scaleLinear().range([0, this.width]).domain([this.min, this.max]);
        this.idealData = this.get_data(this.mean,
          this.stdDeviatian,
          d3.scaleLinear().range([0, this.width]).domain([this.mean - (3 * this.stdDeviatian), this.mean + (3 * this.stdDeviatian)]));
        this.idealData2 = this.get_data(this.mean,
          this.stdDeviationWithIn,
          d3.scaleLinear().range([0, this.width])
            .domain([this.mean - (3 * this.stdDeviationWithIn), this.mean + (3 * this.stdDeviationWithIn)]));
        // this.dataBar = d3.histogram().thresholds(this.numBuckets)(this.actualData);
        this.dataBar = d3.histogram().thresholds([92.5, 97.5, 102.5, 107.5, 112.5, 117.5, 122.5, 127.5])(this.actualData);
        this.yMax = d3.max(this.dataBar, (d: any) => {
          return d.length;
        });
        this.y = d3.scaleLinear().domain([0, this.yMax]).range([this.height, 0]);
        this.xAxis = d3.axisBottom(this.x).ticks(10);
        this.yAxis = d3.axisLeft(this.y).tickFormat(d3.format('.2s'));

        const d1 = d3.min(this.idealData, (d: any) => d.q);
        const d2 = d3.min(this.idealData2, (d: any) => d.q);
        const minD = d3.min([d1, d2]);
        const d4 = d3.max(this.idealData, (d: any) => d.q);
        const d5 = d3.max(this.idealData2, (d: any) => d.q);
        const maxD = d3.max([d4, d5]);
        const d6 = d3.max(this.idealData, (d: any) => d.p);
        const d7 = d3.max(this.idealData2, (d: any) => d.p);
        const maxP = d3.max([d6, d7]);
        this.ycum = d3.scaleLinear().domain([0, maxP]).range([this.height, 0]);
        this.yAxis2 = d3.axisRight(this.ycum);
        // this.xNormal = d3.scaleLinear().range([0, this.width]).domain(d3.extent(this.idealData, (d: any) => d.q));
        this.xNormal = d3.scaleLinear().range([0, this.width]).domain([minD, maxD]);
        // this.yNormal = d3.scaleLinear().range([this.height, 0]).domain(d3.extent(this.idealData, (d: any) => d.p));
        this.yNormal = d3.scaleLinear().range([this.height, 0]).domain([0, maxP]);
        // this.xNormal2 = d3.scaleLinear().range([0, this.width]).domain(d3.extent(this.idealData2, (d: any) => d.q));
        // this.yNormal2 = d3.scaleLinear().range([this.height, 0]).domain(d3.extent(this.idealData2, (d: any) => d.p));
        this.linePlot = d3.line().x((d: any) => {
          return this.xNormal(d.q);
        }).y((d: any) => {
          return this.ycum(d.p);
        });
        /*this.linePlot2 = d3.line().x((d: any) => {
          return this.xNormal2(d.q);
        }).y((d: any) => {
          return this.yNormal2(d.p);
        });*/

        this.svg = d3.select('svg')
          .attr('width', this.width + this.margin.left + this.margin.right)
          .attr('height', this.height + this.margin.top + this.margin.bottom)
          .append('g').attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')')
        ;
        const bar = this.svg.selectAll('.bar').data(this.dataBar).enter()
          .append('g').attr('class', 'bar')
          .attr('transform', (d: any) => {
            // return 'translate(' + this.x(d.x) + ',' + this.y(d.y) + ')';
            return 'translate(' + this.x(d.x0) + ',' + this.y(d.length) + ')';
          });
        bar.append('rect').attr('x', 1).attr('width', (d: any) => {
          return (this.x(d.x1 - d.x0) - this.x(0)) <= 0 ? 0 : (this.x(d.x1 - d.x0) - this.x(0)) - 1;
        }).attr('height', (d: any) => {
          return this.height - this.y(d.length);
        }).attr('fill', (d: any) => {
          return this.colors(this.series[0]);
        })
        ;
        bar.append('text').attr('dy', '.75em').attr('y', -12)
          .attr('x', (d) => {
            const dx = this.dataBar[0].x1 - this.dataBar[0].x0;
            console.log(this.dataBar[0].x1 - this.dataBar[0].x0);
            const b = (this.x(dx) - this.x(0)) / 2;
            console.log(b);
            return b;
          })
          .attr('text-anchor', 'middle').text((d: any) => this.formatCount(d.length));

        /*const lines = this.svg.selectAll('.series')
          .data([1])
          .enter().append('g').attr('class', 'series');*/
        this.svg.append('path').datum(this.idealData).attr('class', 'line').attr('d', this.linePlot)
          .style('stroke', () => this.colors(this.series[1]))
          .style('stroke-width', '2px').style('fill', 'none')
          .attr('id', 'line1')
        ;
        this.svg.append('path').datum(this.idealData2).attr('class', 'line').attr('d', this.linePlot)
          .style('stroke', 'red')
          .style('stroke-width', '2.2px').style('fill', 'none')
          .attr('id', 'line2')
          .style('stroke-dasharray', ('10,3'))
        ;
        this.svg.append('g').attr('class', 'x axis').attr('transform', 'translate(0,' + this.height + ')' )
          .call(this.xAxis);
        this.svg.append('g').attr('class', 'y axis')
          .call(this.yAxis);
        this.svg.append('g')
          .attr('class', 'y2 axis')
          .attr('transform', 'translate(' + this.width   + ',0)')
          .style('fill', 'unset')
          .call(this.yAxis2)
          .append('text')
          .attr('transform', 'rotate(-90)')
          .attr('y', 4)
          .attr('dy', '-.71em')
          .style('text-anchor', 'end')
          .text('Cumulative %');
        // this.buildSvg();
        // this.drawAxis();
        // this.drawLineAndPath();
        // this.drawLegend();
        // this.showTip();
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
