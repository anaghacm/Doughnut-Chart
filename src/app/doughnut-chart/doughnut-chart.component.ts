import { Component, Input, OnInit } from '@angular/core';
import { DoughnutData } from '../Services/doughnut-data';
import * as d3 from 'd3';

@Component({
  selector: 'app-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.scss']
})
export class DoughnutChartComponent implements OnInit {

  @Input() chartData!: DoughnutData[];

  private width: number = 400;
  private height: number = 300;
  private svg: any;
  private colors: any;

  constructor() { }

  ngOnInit(): void {
    this.createSvg();
    this.drawChart();
  }

  //Create SVG
  createSvg() {
    this.svg = d3.select('#donut')
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height);
  }

  drawChart() {
    //Set colors
    this.colors = d3.scaleOrdinal()
      .domain(this.chartData.map((d) => d.value.toString()))
      .range(this.chartData.map((d) => d.color));

    //Generate Pie
    var pie = d3.pie()
      .sort(null)
      .value((d: any) => { return d.value });
    var data_set = pie(this.chartData.map((d: any) => { return d }));
    console.log(data_set)

    //Arc generator
    var segments = d3.arc()
      .innerRadius(90)
      .outerRadius(130)
      .padAngle(0.05)
      .padRadius(50);

    var hoversegment = d3.arc()
      .innerRadius(94)
      .outerRadius(134);

    var sections = this.svg.append('g')
      .attr('transform', 'translate(200,150)')
      .selectAll('path')
      .data(data_set);

    sections
      .enter()
      .append('path')
      .attr('d', segments)
      .attr('fill', (d: any) => this.colors(d.data.value))

      .on('mouseover', (d: any) => {
        d3.select(d.currentTarget)
          .transition()
          .duration(500)
          .attr('d', <any>hoversegment)
      })
      .on('mouseout', (d: any) => {
        d3.select(d.currentTarget)
          .transition()
          .duration(500)
          .attr('d', <any>segments)
      })
      .append('title')
      .text((d: any) => { return d.data.name + ' - ' + d.value })

    d3.select('g')
      .selectAll('text')
      .data(data_set)
      .enter()
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('fill', '#fff')
      .attr('transform', (d: any) => { return 'translate(' + segments.centroid(d) + ')' })
      .text((d: any) => { return d.data.percentage + ' %' })
      .style('font-size', '13px')
      .style('font-weight', 800)
      .style('text-shadow', '2px 2px #000');

    //Legends
    var legends = this.svg.append('g')
      .attr('transform', 'translate(350,150)')
      .selectAll('.legends')
      .data(data_set);

    var legend = legends.enter()
      .append('g')
      .classed('lengends', true)
      .attr('transform', (d: any, i: any) => { return "translate(0," + (i + 1) * 30 + ")" });

    legend.append('rect')
      .attr('width', 20)
      .attr('height', 20)
      .attr('fill', (d: any) => this.colors(d.data.value));

    legend.append('text')
      .text((d: any) => { return d.data.name })
      .attr('fill', (d: any) => this.colors(d.data.value))
      .attr('x', 30)
      .attr('y', 15);
  }
}
