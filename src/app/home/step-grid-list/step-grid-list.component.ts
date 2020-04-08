import { Component, OnInit } from '@angular/core';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  hearText: string;
  footerText: string;
}

@Component({
  selector: 'app-step-grid-list',
  templateUrl: './step-grid-list.component.html',
  styleUrls: ['./step-grid-list.component.scss']
})
export class StepGridListComponent implements OnInit {

  tiles: Tile[] = [
    {hearText: '1', footerText: 'Configure monitor', cols: 1, rows: 1, color: 'lightblue'},
    {hearText: '2', footerText: 'Collect data', cols: 1, rows: 1, color: 'red'},
    {hearText: 'Welcome To', footerText: 'MES15 SPC 1.2.22', cols: 1, rows: 1, color: 'lightgreen'},
    {hearText: '3', footerText: 'Analyze data', cols: 1, rows: 1, color: 'lightpink'},
    {hearText: '4', footerText: 'View SPC chart', cols: 1, rows: 1, color: 'black'},
    {hearText: '', footerText: '', cols: 1, rows: 1, color: 'red'},
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
