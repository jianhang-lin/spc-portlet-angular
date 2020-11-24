import { Component, OnInit } from '@angular/core';
import { DialogConfig } from '../../dialog/dialog-config';

@Component({
  selector: 'app-new-monitor-group',
  templateUrl: './new-monitor-group.component.html',
  styleUrls: ['./new-monitor-group.component.scss']
})
export class NewMonitorGroupComponent implements OnInit {

  constructor(public config: DialogConfig) { }

  ngOnInit(): void {
  }

}
