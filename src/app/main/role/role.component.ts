import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../core/services/data.service';
import { NotificationService } from '../../core/services/notification.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { MessageContstants } from '../../core/common/message.constants';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {
  @ViewChild('addEditModal') addEditModal: ModalDirective;

  public pageIndex: Number = 1;
  public pageSize: Number = 20;
  public pageDisplay: Number = 10;
  public totalRow: Number;
  public filter: String = '';
  public roles: any[];
  public entity: any;

  constructor(
    private _dataService: DataService,
    private _notificationService: NotificationService,

  ) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this._dataService.get('/api/appRole/getlistpaging?page=' + this.pageIndex + '&pageSize=' + this.pageSize + '&filter=' + this.filter)
      .subscribe((res: any) => {
        this.roles = res.Items;
        this.pageIndex = res.PageIndex;
        this.pageSize = res.PageSize;
        this.totalRow = res.TotalRows;
      });
  }

  pageChanged(event: any): void {
    this.pageIndex = event.page;
    this.loadData();
  }

  showAddEditModal(): void {
    this.addEditModal.show();
    this.entity = {};
  }

  hideAddEditModal(): void {
    this.addEditModal.hide();
  }

  saveChange(valid: Boolean) {
    if (valid) {
      if (this.entity.Id === undefined) {
        this._dataService.post('/api/appRole/add', this.entity).subscribe((res: any) => {
          this.loadData();
          this.addEditModal.hide();
          this._notificationService.printSuccessMessage(MessageContstants.CREATED_OK_MSG);
        }, err => {
          this._dataService.handleError(err);
        });
      } else {
        // update
      }
    }

  }

}


