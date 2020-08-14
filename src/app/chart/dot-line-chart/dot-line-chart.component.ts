import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as d3 from 'd3';


@Component({
  selector: 'app-dot-line-chart',
  templateUrl: './dot-line-chart.component.html',
  styleUrls: ['./dot-line-chart.component.scss']
})
export class DotLineChartComponent implements OnInit, OnChanges {
  constructor(public router: Router, private route: ActivatedRoute, private http: HttpClient) {
     this.width = 1200; // window.innerWidth - this.margin.left - this.margin.right;
     this.height = 400; // window.innerHeight - this.margin.top - this.margin.bottom;
  }

  public title = 'Line Chart';
  public data: any;
  private margin = {top: 20, right: 20, bottom: 30, left: 30};
  public width: number;
  private height: number;
  private x: d3.ScaleTime<number, number>;
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

  ngOnInit(): void {
    this.getData().subscribe(data => {

      this.dataProcess(data);
      this.buildSvg();
      this.addAxis();
      this.drawLineAndPath();
      this.hover();
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
    this.data = Object.assign({
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
    this.x = d3.scaleUtc().range([this.margin.left, this.width - this.margin.right]);
    this.y = d3.scaleLinear()
      .range([this.height - this.margin.bottom, this.margin.top]);
    this.x.domain(d3.extent(this.data.dates as Date[]));
    this.y.domain([0, d3.max(this.data.series, (d: any) => d3.max(d.values) as unknown as number)]).nice();

    this.xAxis = d3.axisBottom(this.x).ticks(this.width / 80).tickSizeOuter(0);
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

  private hover(): void {
    const moved = () => {
      d3.event.preventDefault();
      const mouse = d3.mouse(d3.event.target);
      const xm: any = this.x.invert(mouse[0]);
      const ym = this.y.invert(mouse[1]);
      const i1 = d3.bisectLeft(this.data.dates, xm , 1);
      const i0 = i1 - 1;
      const i = xm - this.data.dates[0] > this.data.dates[i1] - xm ? i1 : i0;
      const s: any = least(this.data.series, (r: any) => Math.abs(r.values[i] - ym));
      d3.selectAll('.line path').attr('stroke', v => v === s ? null : '#ddd').filter(v => v === s).raise();
      dot.attr('transform', `translate(${this.x(this.data.dates[i])}, ${this.y(s.values[i])})`);
      dot.select('text').text(s.name);
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
    const dot = d3.select('svg').append('g').attr('display', 'none');
    dot.append('circle').attr('r', 2.5);
    dot.append('text').attr('font-family', 'sans-serif').attr('font-size', 10).attr('text-anchor', 'middle').attr('y', -8);
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
