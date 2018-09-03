import { Component, ViewEncapsulation, OnInit } from '@angular/core';

import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3ScaleChromatic from 'd3-scale-chromatic';
import * as d3Shape from 'd3-shape';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';
import * as d3TimeFormat from 'd3-time-format';
import * as d3Zoom from 'd3-zoom';

@Component({
    selector: 'scatter-chart',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './scatter-chart.component.html',
    styleUrls: ['./scatter-chart.component.css']
})

export class ScatterChartComponent implements OnInit {
    chartData = [{
        'outageId': 10262,
        'description': 'Incident create 1',
        'start': '2018-05-15T02:29:46',
        'duration': 718.79810078872219,
        'priority': 1,
        'unavailablity': false,
        'rca': false
      }, {
        'outageId': 10264,
        'description': 'test create incident 121',
        'start': '2018-05-15T06:55:55',
        'duration': 2142.3243272679165,
        'priority': 4,
        'unavailablity': false,
        'rca': false
      }, {
        'outageId': 10266,
        'description': 'Incident 1a bcd',
        'start': '2018-05-15T13:11:12',
        'duration': 712.83220800527772,
        'priority': 2,
        'unavailablity': false,
        'rca': false
      }, {
        'outageId': 10267,
        'description': 'incident dem 1',
        'start': '2018-05-16T04:44:13',
        'duration': 693.30065933088883,
        'priority': 3,
        'unavailablity': false,
        'rca': false
      }, {
        'outageId': 10268,
        'description': 'incident 1 anb',
        'start': '2018-05-17T04:27:08',
        'duration': 665.57432856252774,
        'priority': 2,
        'unavailablity': false,
        'rca': false
      }, {
        'outageId': 10273,
        'description': 'des inci cis',
        'start': '2018-05-17T19:00:39',
        'duration': 1326.0112333883887,
        'priority': 1,
        'unavailablity': false,
        'rca': false
      }, {
        'outageId': 10275,
        'description': 'test daniel',
        'start': '2018-05-17T20:17:09',
        'duration': 649.74089454819443,
        'priority': 2,
        'unavailablity': true,
        'rca': false
      }, {
        'outageId': 10275,
        'description': 'test daniel',
        'start': '2018-05-17T20:17:09',
        'duration': 649.7408945765,
        'priority': 2,
        'unavailablity': false,
        'rca': false
      }, {
        'outageId': 10276,
        'description': 'inc ua test',
        'start': '2018-05-18T01:34:39',
        'duration': 648.45645157197225,
        'priority': 4,
        'unavailablity': false,
        'rca': false
      }, {
        'outageId': 10281,
        'description': 'general adr incident',
        'start': '2018-05-21T04:05:43',
        'duration': 0.33416666666666667,
        'priority': 3,
        'unavailablity': true,
        'rca': false
      }, {
        'outageId': 10281,
        'description': 'general adr incident',
        'start': '2018-05-21T04:05:43',
        'duration': 1124.175,
        'priority': 3,
        'unavailablity': false,
        'rca': false
      }, {
        'outageId': 10284,
        'description': 'Test Outage Time Cal',
        'start': '2018-05-31T13:46:19',
        'duration': 0.021111111111111112,
        'priority': 1,
        'unavailablity': true,
        'rca': false
      }, {
        'outageId': 10284,
        'description': 'Test Outage Time Cal',
        'start': '2018-05-31T13:46:19',
        'duration': 332.21951198861109,
        'priority': 1,
        'unavailablity': false,
        'rca': false
      }, {
        'outageId': 10285,
        'description': 'test Jun',
        'start': '2018-06-01T02:00:31',
        'duration': 623.99763637394437,
        'priority': 2,
        'unavailablity': true,
        'rca': false
      }, {
        'outageId': 10285,
        'description': 'test Jun',
        'start': '2018-06-01T02:00:31',
        'duration': 312.03173496427775,
        'priority': 2,
        'unavailablity': false,
        'rca': false
      }];

    svg: any;
    margin = {top: 20, right: 20, bottom: 20, left: 20};
    g: any;
    width = 700;
    height = 400;

    constructor() {
    }

    ngOnInit() {
        this.initChart();
    }

    private initChart(): void {
        this.svg = d3.select('svg')
                    .attr('width', this.width + 20)
                    .attr('height', this.height + this.margin.left * 5 );
        this.svg.append('clipPath')
                .attr('id', 'clip-path')
                .append('rect')
                .attr('x', this.margin.left * 2)
                .attr('y', this.margin.top - 10)
                .attr('width', this.width)
                .attr('height', this.height - this.margin.left);

        const xDomain = [0, d3Array.max(this.chartData, d => d.duration)];
        const yDomain = [0, 4];
        const xScale = d3Scale.scaleLinear().domain(xDomain).range([this.margin.left * 2, this.width]).nice();
        const yScale = d3Scale.scaleLinear().domain(yDomain).range([this.height, this.margin.left * 2]);

        this.svg.append('text')
                .attr('transform', 'translate(' + (this.width / 2) + ',' + (this.height + this.margin.top + this.margin.left) + ')')
                .style('text-anchor', 'middle')
                .text('Duration');
        this.svg.append('text')
                .attr('transform', 'rotate(-90)')
                .attr('y', -1)
                .attr('x', 0 - (this.height / 2))
                .attr('dy', '1em')
                .style('text-anchor', 'middle')
                .text('Impact');

        const xGridlines = d3Axis.axisBottom(xScale).ticks(5);
        const yGridlines = d3Axis.axisLeft(yScale).ticks(5);

        this.svg.append('text').attr('class', 'noDataMessage')
                .attr('x', (this.width / 2) - (this.margin.left * 3 - 10))
                .attr('y', this.margin.left * 2 - 3)
                .html('Hmmmmmmmmm, No data available');
        this.svg.select('.noDataMessage').remove();

        const xAxis = d3Axis.axisBottom(xScale);
        const yAxis = d3Axis.axisLeft(yScale).ticks(5);

        const gX = this.svg.append('g')
                            .attr('class', 'axis axis-x')
                            .attr('transform', 'translate(0, ' + (this.height) + ')')
                            .style('text-anchor', 'middle')
                            .call(xAxis);
        const gY = this.svg.append('g')
                            .attr('class', 'axis axis-y')
                            .attr('transform', 'translate(' + (this.margin.left * 2) + ')')
                            .call(yAxis);
        this.svg.append('g').attr('class', 'grid x')
                .attr('transform', 'translate(0, ' + (this.height) + ')')
                .call(d3Axis.axisBottom(xScale).tickSize(-this.height));
        this.svg.append('g').attr('class', 'grid y')
                .attr('transform', 'translate(' + (this.margin.left * 2) + ')')
                .call(d3Axis.axisLeft(yScale).tickSize(-this.width));
        this.svg.selectAll('.grid .tick text').style('opacity', '0');
        this.svg.selectAll('.grid .tick line').style('stroke', 'lightgrey');

        const timeFormat = d3TimeFormat.timeFormat('%x');

        const circles = this.svg.selectAll('dot')
                                .data(this.chartData)
                                .enter()
                                .append('circle')
                                .attr('class', 'dot')
                                .attr('r', 7)
                                .attr('clip-path', 'url(#clip-path)')
                                .attr('cx', d => xScale(d.duration))
                                .attr('cy', d => yScale(d.priority) - 20)
                                .attr('stoke', (d) => {
                                    return d.color;
                                }).attr('fill', (d) => {
                                    return d3ScaleChromatic.schemeCategory10[d.priority];
                                });
        circles.append('svg:title').html(d => {
            return 'Date :' + d3TimeFormat.timeFormat(new Date(d.start)) + ', <br> Description: '
                    + d.description + ', <br> Impact: ' + d.priority + ', <br> Hours: ' + Math.round(d.duration);
        });

        // const redCircles = this.svg.selectAll('dot')
        //                     .data(this.chartData)
        //                     .enter()
        //                     .append('circle')
        //                     .attr('class', 'redDot')
        //                     .attr('r', 7)
        //                     .attr('clip-path', 'url(#clip-path)')
        //                     .attr('cx', d => xScale(d.duration))
        //                     .attr('cy', d => yScale(d.priority) - 20)
        //                     .attr('stroke', (d) => {
        //                         return 'red';
        //                     }).attr('stoke-width', (d) => {
        //                         if (d.rca === false) {
        //                             return 2;
        //                         }
        //                     }).attr('fill', 'none');
        // redCircles.append('svg:title').html(d => {
        //     return 'Date : ' + d3TimeFormat.timeFormat(new Date(d.start)) + ',<br> Description: '
        //      + d.description + ',<br> Impact: ' + d.priority + ',<br> Hours: ' + Math.round(d.duration);
        // });

        this.svg.call(d3Zoom.zoom().on('zoom', (d) => {
            const xNewScale = d3.event.transform.rescaleX(xScale);
            const yNewScale = d3.event.transform.rescaleY(yScale);

            gX.call(xAxis.scale(xNewScale));
            gY.call(yAxis.scale(yNewScale));

            circles.attr('cx', d => xNewScale(d.duration))
                    .attr('cy', d => yNewScale(d.priority));
            // redCircles.attr('cx', d => xNewScale(d.duration))
            //             .attr('cy', d => yNewScale(d.priority));
        }));
    }
}
