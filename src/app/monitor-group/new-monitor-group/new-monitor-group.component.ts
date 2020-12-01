import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { DialogConfig } from '../../dialog/dialog-config';
import { DialogRef } from '../../dialog/dialog-ref';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NetUserModel } from '../../domain/net-user.model';
import * as fromReducers from '../../reducers';
import * as netUserAction from '../../actions/net-user.action';

@Component({
  selector: 'app-new-monitor-group',
  templateUrl: './new-monitor-group.component.html',
  styleUrls: ['./new-monitor-group.component.scss']
})
export class NewMonitorGroupComponent implements OnInit {

  title = 'Add Monitor Group';
  form: FormGroup;
  @Input() private data;
  netUsers: NetUserModel[];
  netUsers$: Observable<NetUserModel[]>;
  constructor(
    public config: DialogConfig,
    public dialogRef: DialogRef,
    private fb: FormBuilder,
    private store$: Store<fromReducers.State>,
    ) {
    this.store$.dispatch(new netUserAction.LoadNetUserAction(null));
    this.netUsers$ = this.store$.select(fromReducers.getNetUserList);
  }

  ngOnInit(): void {
    this.netUsers$.subscribe(value => {
      this.netUsers = value;
    });
    this.form = this.fb.group({
      name: ['', Validators.required],
      dataSourceType: ['', Validators.required],
      floorId: ['', Validators.required],
      timeZone: ['', Validators.required],
      description: '',
    });
  }

  onClose() {
    this.dialogRef.close('some value');
  }

  onSubmit({value, valid}, ev: Event) {
    ev.preventDefault();
    if (!valid) {
      return;
    }
    this.dialogRef.close(value);
  }
}
