import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { DataService } from '../../core/services/data.service';
import { NotificationService } from '../../core/services/notification.service';
import { MessageContstants } from '../../core/common/message.constants';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  @ViewChild('addEditModal') addEditModal: ModalDirective;

  public pageIndex: Number = 1;
  public pageSize: Number = 20;
  public pageDisplay: Number = 10;
  public totalRow: Number;
  public filter: String = '';
  public users: any[];
  public entity: any;

  constructor(
    private _dataService: DataService,
    private _notificationService: NotificationService,

  ) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this._dataService.get('/api/appUser/getlistpaging?page=' + this.pageIndex + '&pageSize=' + this.pageSize + '&filter=' + this.filter)
      .subscribe((res: any) => {
        this.users = res.Items;
        this.pageIndex = res.PageIndex;
        this.pageSize = res.PageSize;
        this.totalRow = res.TotalRows;
        console.log(res);
      });
  }

  loadRole(id: any) {
    this._dataService.get('/api/appUser/detail/' + id)
      .subscribe((res: any) => {
        this.entity = res;
        console.log(res);
      });
  }

  pageChanged(event: any): void {
    this.pageIndex = event.page;
    this.loadData();
  }

  showAddModal(): void {
    this.addEditModal.show();
    this.entity = {};
  }

  showEditModal(id: any): void {
    this.addEditModal.show();
    this.loadRole(id);
  }

  hideAddEditModal(): void {
    this.addEditModal.hide();
  }

  saveChange(valid: Boolean) {
    if (valid) {
      if (this.entity.Id === undefined) {
        this._dataService.post('/api/appUser/add', this.entity).subscribe((res: any) => {
          this.loadData();
          this.addEditModal.hide();
          this._notificationService.printSuccessMessage(MessageContstants.CREATED_OK_MSG);
        }, err => {
          this._dataService.handleError(err);
        });
      } else {
        // update
        this._dataService.put('/api/appUser/update', this.entity).subscribe((res: any) => {
          this.loadData();
          this.addEditModal.hide();
          this._notificationService.printSuccessMessage(MessageContstants.UPDATED_OK_MSG);
        }, err => {
          this._dataService.handleError(err);
        });
      }
    }
  }

  deleteItem(id: any) {
    this._notificationService.printConfirmationDialog(MessageContstants.CONFIRM_DELETE_MSG, () => this.deleteItemConfirm(id));
  }
  deleteItemConfirm(id: any) {
    this._dataService.delete('/api/appUser/delete', 'id', id).subscribe((response: Response) => {
      this._notificationService.printSuccessMessage(MessageContstants.DELETED_OK_MSG);
      this.loadData();
    });
  }
}
