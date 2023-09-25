import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as d3 from 'd3';
import { DataService } from '../data.service';

@Component({
  selector: 'pb-d3js',
  templateUrl: './d3js.component.html',
  styleUrls: ['./d3js.component.scss']
})
export class D3jsComponent implements OnInit{
  constructor(private dataService: DataService) { }
  ngOnInit(): void {
    this.dataService.getData().subscribe((res: any) => {
      this.createD3Chart(res);
      });
  }
  createD3Chart(data: any[]) {
    // const data = await this.getData();
    const width = 330;
    const height = 330;
    const radius = Math.min(width, height) / 2;

    const svg = d3.select("#chart")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    const color = d3.scaleOrdinal()
      .range(["#FFA07A", "#FF0000", "#FFC0CB", "#fd6b19", "#000080", "#FF00FF", "#008000", "#AFEEEE"]);

    const pie = d3.pie()
      .value((d: any) => d.budget);

    const arc = d3.arc()
      .innerRadius(0)
      .outerRadius(radius);

    const arcs = svg.selectAll("arc")
      .data(pie(data))
      .enter()
      .append("g");

    arcs.append("path")
      .attr("d", (d: any) => arc(d))
      .attr("fill", (d: any) => color(d.data.title) as string);

    arcs.append("text")
      .attr("transform", (d: any) => "translate(" + arc.centroid(d) + ")")
      .attr("text-anchor", "middle")
      .text((d: any) => d.data.title);
  }


}
