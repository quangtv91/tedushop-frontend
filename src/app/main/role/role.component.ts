import { Component, OnInit } from '@angular/core';
import { DataService } from '../../core/services/data.service';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {
  public pageIndex: Number = 1;
  public pageSize: Number = 20;
  public pageDisplay: Number = 10;
  public filter: String = '';
  public roles: any[];

  constructor(
    private _dataService: DataService
  ) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this._dataService.get('/api/appRole/getlistpaging?page=' + this.pageIndex + '&pageSize=' + this.pageSize + '&filter=' + this.filter)
      .subscribe((res: any) => {
        this.roles = res.Items;
      });
  }

}
