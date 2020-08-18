import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as d3 from 'd3';
import * as fromReducers from '../../reducers';
import * as dotLineChartAction from '../../actions/dot-line-chart.action';
import { DotLineDataModel } from '../../domain/dot-line-data.model';

@Component({
  selector: 'app-dot-line-chart',
  templateUrl: './dot-line-chart.component.html',
  styleUrls: ['./dot-line-chart.component.scss']
})
export class DotLineChartComponent implements OnInit, OnChanges {
  public title = 'Line Chart';
  public data: any;
  private margin = {top: 20, right: 20, bottom: 30, left: 30};
  public width: number;
  private height: number;
  private x: d3.ScaleOrdinal<string, any>;
  private y: d3.ScaleLinear<number, number>;
  private svg: d3.Selection<any, any, HTMLElement, any>;
  private line: d3.Line<[number, number]>;
  private path: d3.Selection<any, any, any, any>;

  @ViewChild('chart', {static: true}) private chartContainer: ElementRef;
  @Input() private datas: Array<any>;
  private chart: any;
  private xScale: any;
  private yScale: any;
  private colors: any;
  private xAxis: d3.Axis<d3.AxisDomain>;
  private yAxis: d3.Axis<d3.AxisDomain>;
  private xRangeArray: any;

  dotLineDataList: DotLineDataModel[];
  dotLineDataList$: Observable<DotLineDataModel[]>;
  constructor(public router: Router,
              private route: ActivatedRoute,
              private http: HttpClient,
              private store$: Store<fromReducers.State>) {
    this.width = 1200; // window.innerWidth - this.margin.left - this.margin.right;
    this.height = 400; // window.innerHeight - this.margin.top - this.margin.bottom;
    this.store$.dispatch(new dotLineChartAction.LoadDotLineDataAction(null));
    this.dotLineDataList$ = this.store$.select(fromReducers.getDotLineDataList);
  }

  ngOnInit(): void {
    this.dotLineDataList$.subscribe(dotLineDataList => {
      if (dotLineDataList.length > 0) {
        this.dotLineDataList = dotLineDataList;
        const parseTime = d3.timeParse('%Y-%m-%d %H:%M:%S');
        const labelDateTimes = [];
        const data1 = [];
        const ucl1 = [];
        const lcl1 = [];
        const target1 = [];
        const data2 = [];
        const ucl2 = [];
        const lcl2 = [];
        const target2 = [];
        this.dotLineDataList.forEach( (dotlineData, index) => {
          if (index % 4 === 0) {
            labelDateTimes.push(dotlineData.labelDateTimeStr);
          }
        });
        this.dotLineDataList.forEach((dotlineData, index) => {
          if (dotlineData.dotDimensionName === 'data1' && !dotlineData.hideRow) {
            data1.push(dotlineData.data);
            ucl1.push(dotlineData.ucl);
            lcl1.push(dotlineData.lcl);
            target1.push(dotlineData.target);
          }
          if (dotlineData.dotDimensionName === 'data2' && !dotlineData.hideRow) {
            data2.push(dotlineData.data);
            ucl2.push(dotlineData.ucl);
            lcl2.push(dotlineData.lcl);
            target2.push(dotlineData.target);
          }
        });
        this.data = Object.assign({
          y: '% Unemployment',
          series: [
            {name: 'data1', values: data1},
            {name: 'ucl1', values: ucl1},
            {name: 'lcl1', values: lcl1},
            {name: 'target1', values: target1},
            {name: 'data2', values: data2},
            {name: 'ucl2', values: ucl2},
            {name: 'lcl2', values: lcl2},
            {name: 'target2', values: target2},
          ],
          dates: labelDateTimes,
        });
        this.buildSvg();
        this.addAxis();
        this.drawLineAndPath();
        this.showTip();
      }
    });

    // this.createChart();
    if (this.datas) {
      // this.updateChart();
    }
  }

  private getData(): Observable<string> {
    return this.http.get('http://localhost:4200/assets/cache' +
      '/b154f8efd1a64d5e3e829b93e4fefd6d72219371ef440007fe368369fea0bbcdc9bcac06b72aae851f392411102931eba7774befa8c8fcbfcad4fc28f136ecd6',
      {responseType: 'text'});
  }

  private dataProcess(data: string): void {
    const tsvArray = d3.tsvParse(data);
    const columns = tsvArray.columns.slice(1);
    const t = Object.assign({
      y: '% Unemployment',
      series: tsvArray.map(d => ({
        name: d.name.replace(/, ([\w-]+).*/, ' $1'),
        values: columns.map(k => +d[k])
      })),
      dates: columns.map(d3.utcParse('%Y-%m'))
    });
  }

  private buildSvg(): void {
    this.svg = d3.select('svg')
      .attr('viewBox', `0, 0, ${this.width}, ${this.height}`)
      .style('overflow', 'visible');
  }

  private addAxis(): void {
    const xAxisWidth = this.width - this.margin.right - this.margin.left;
    const xAxisTicksCount = this.data.series[0].values.length;
    const singleXAxisWidth = xAxisWidth / xAxisTicksCount;
    this.xRangeArray = [];
    for (let i = 0; i < xAxisTicksCount; i++) {
      this.xRangeArray.push(this.margin.left + singleXAxisWidth * i);
    }
    this.x = d3.scaleOrdinal().range(this.xRangeArray);
    this.y = d3.scaleLinear().range([this.height - this.margin.bottom, this.margin.top]);
    this.x.domain(this.data.dates);
    this.y.domain([d3.min(this.data.series, (d: any) => d3.min(d.values) as unknown as number),
      d3.max(this.data.series, (d: any) => d3.max(d.values) as unknown as number)]).nice();

    this.xAxis = d3.axisBottom(this.x).ticks(xAxisTicksCount);
    this.yAxis = d3.axisLeft(this.y);

    this.svg.append('g').attr('class', 'xAxis').attr('transform', `translate(0, ${this.height - this.margin.bottom})`).call(this.xAxis);
    this.svg.append('g').attr('class', 'yAxis').attr('transform', `translate(${this.margin.left}, 0)`).call(this.yAxis)
      .select('.domain').remove()
      .select('.tick:last-of-type text').clone().attr('x', 3)
      .attr('text-anchor', 'start')
      .attr('font-weight', 'bold').text(this.data.y);
  }

  private drawLineAndPath(): void {
    this.line = d3.line()
      .x((d: any, i) => this.x(this.data.dates[i]))
      .y((d: any) => this.y(d));
    this.path = this.svg.append('g')
      .attr('class', 'line')
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 1.5)
      .attr('stroke-linejoin', 'round')
      .attr('stroke-linecap', 'round')
      .selectAll('path')
      .data(this.data.series)
      .join('path')
      .style('mix-blend-mode', 'multiply')
      .attr('d', (d: any) => this.line(d.values))
      .selectAll('.xAxis path').style('mix-blend-mode', 'none');
  }

  private showTip(): void {
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
        d3.selectAll('.line path').attr('stroke', v => v === s ? null : '#ddd').filter(v => v === s).raise();
        dot.attr('transform', `translate(${this.x(this.data.dates[i])}, ${this.y(s.values[i])})`);
        dot.select('.tooltip-date').text(formatTime(this.data.dates[i]));
        dot.select('.tooltip-likes').text(s.values[i]);
      }
    };
    const entered = () => {
      d3.selectAll('.line path').style('mix-blend-mode', null).attr('stroke', '#ddd');
      dot.attr('display', null);
    };
    const left = () => {
      d3.selectAll('.line path').style('mix-blend-mode', 'multiply').attr('stroke', null);
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

function least(values, compare = d3.ascending) {
  let min;
  let defined = false;
  if (compare.length === 1) {
    let minValue;
    for (const element of values) {
      const value = compare(element, minValue);
      if (defined ? d3.ascending(value, minValue) < 0 : d3.ascending(value, value) === 0) {
        min = element;
        minValue = value;
        defined = true;
      }
    }
  } else {
    for (const value of values) {
      if (defined ? compare(value, min) < 0 : compare(value, value) === 0) {
        min = value;
        defined = true;
      }
    }
  }
  return min;
}
