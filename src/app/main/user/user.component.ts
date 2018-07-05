import { Component, OnInit, ViewChild } from '@angular/core';
import { IMultiSelectOption } from 'angular-2-dropdown-multiselect';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { MessageContstants } from '../../core/common/message.constants';
import { SystemConstants } from '../../core/common/system.constants';
import { AuthenService } from '../../core/services/authen.service';
import { DataService } from '../../core/services/data.service';
import { NotificationService } from '../../core/services/notification.service';
import { UploadService } from '../../core/services/upload.service';
import { UtilityService } from '../../core/services/utility.service';

declare var moment: any;

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  @ViewChild('addEditModal') addEditModal: ModalDirective;
  @ViewChild('avatar') avatar;

  public pageIndex: Number = 1;
  public pageSize: Number = 20;
  public pageDisplay: Number = 10;
  public totalRow: Number;
  public filter: String = '';
  public users: any[];
  public entity: any;

  public myRoles: string[] = [];
  public allRoles: IMultiSelectOption[] = [];
  public roles: any[];

  public baseFolder: String = SystemConstants.BASE_API;

  public dateOptions: any = {
    locale: { format: 'DD/MM/YYYY' },
    alwaysShowCalendars: false,
    singleDatePicker: true
  };

  constructor(
    private _dataService: DataService,
    private _notificationService: NotificationService,
    private _uploadService: UploadService,
    public _authenService: AuthenService,
    private _utilityService: UtilityService
  ) {
    if (_authenService.checkAccess('USER') === false) {
      _utilityService.navigateToLogin();
    }
  }

  ngOnInit() {
    this.loadRoles();
    this.loadData();
  }

  loadData() {
    this._dataService.get('/api/appUser/getlistpaging?page=' + this.pageIndex + '&pageSize=' + this.pageSize + '&filter=' + this.filter)
      .subscribe((res: any) => {
        this.users = res.Items;
        this.pageIndex = res.PageIndex;
        this.pageSize = res.PageSize;
        this.totalRow = res.TotalRows;
      });
  }

  loadRoles() {
    this._dataService.get('/api/appRole/getlistall/').subscribe((res: any[]) => {
      this.allRoles = [];
      for (let role of res) {
        this.allRoles.push({
          id: role.Name,
          name: role.Description
        });
      }
    });
  }

  loadUserDetail(id: any) {
    this._dataService.get('/api/appUser/detail/' + id)
      .subscribe((res: any) => {
        this.entity = res;
        // gan role hien tai cua user
        this.myRoles = [];
        for (let role of this.entity.Roles) {
          this.myRoles.push(role);
        }
        this.entity.BirthDay = moment(new Date(this.entity.BirthDay)).format('DD/MM/YYYY');
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
    this.loadUserDetail(id);
  }

  hideAddEditModal(): void {
    this.addEditModal.hide();
  }

  saveChange(valid: Boolean) {
    if (valid) {
      this.entity.Roles = this.myRoles;
      let fileImage = this.avatar.nativeElement;
      if (fileImage.files.lenght > 0) {
        this._uploadService.postWithFile('/api/upload/saveImage', null, fileImage.files).then((imageUrl: string) => {
          this.entity.Avatar = imageUrl;
        }).then(() => {
          this.saveData();
        });
      } else {
        this.saveData();
      }
    }
  }

  saveData() {
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

  deleteItem(id: any) {
    this._notificationService.printConfirmationDialog(MessageContstants.CONFIRM_DELETE_MSG, () => this.deleteItemConfirm(id));
  }
  deleteItemConfirm(id: any) {
    this._dataService.delete('/api/appUser/delete', 'id', id).subscribe((response: Response) => {
      this._notificationService.printSuccessMessage(MessageContstants.DELETED_OK_MSG);
      this.loadData();
    });
  }

  public selectGender(event) {
    this.entity.Gender = event.target.value;
  }

  public selectedDate(value: any) {
    this.entity.BirthDay = moment(value.end._d).format('DD/MM/YYYY');
  }

}
