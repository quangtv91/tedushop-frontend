import { Component, OnInit } from '@angular/core';
import { LoggedInUser } from '../domain/loggedin.user';
import { AuthenService } from '../core/services/authen.service';
import { UtilityService } from '../core/services/utility.service';
import { SystemConstants } from '../common/system.constants';
import { UrlConstants } from '../common/url.constants';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  public user: LoggedInUser;

  constructor(
    private authenService: AuthenService,
    private utilityService: UtilityService,
  ) { }

  ngOnInit() {
  }

  logout() {
    localStorage.removeItem(SystemConstants.CURRENT_USER);
    this.utilityService.navigate(UrlConstants.LOGIN);
  }

}
