import { Component, OnInit } from '@angular/core';
import { DialogConfig } from '../../dialog/dialog-config';
import { DialogRef } from '../../dialog/dialog-ref';

@Component({
  selector: 'app-new-monitor-group',
  templateUrl: './new-monitor-group.component.html',
  styleUrls: ['./new-monitor-group.component.scss']
})
export class NewMonitorGroupComponent implements OnInit {

  constructor(public config: DialogConfig, public dialogRef: DialogRef) { }

  ngOnInit(): void {
  }

  onClose() {
    this.dialogRef.close('some value');
  }
}
