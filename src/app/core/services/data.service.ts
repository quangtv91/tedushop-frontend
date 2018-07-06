import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthenService } from './authen.service';
import { NotificationService } from './notification.service';
import { UtilityService } from './utility.service';
import { SystemConstants } from '../common/system.constants';
import { MessageContstants } from '../common/message.constants';
import 'rxjs/add/observable/throw';

@Injectable()
export class DataService {
  private headers: Headers;

  constructor(
    private _http: Http,
    private _router: Router,
    private _authenService: AuthenService,
    private _notificationService: NotificationService,
    private _utilityService: UtilityService
  ) {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
  }

  private extractData(res: Response) {
    const body = res.json();
    return body || {};
  }

  public handleError(error: any) {
    if (error.status === 401) {
      localStorage.removeItem(SystemConstants.CURRENT_USER);
      this._notificationService.printErrorMessage(MessageContstants.LOGIN_AGAIN_MSG);
      this._utilityService.navigateToLogin();
    } else {
      const errMsg = (error.message) ? error.message : error.status ? '${error.status} - ${error.statusText}' : 'Lỗi hệ thống';
      this._notificationService.printErrorMessage(errMsg);

      return Observable.throw(errMsg);
    }
  }

  get(url: string) {
    this.headers.delete('Authorization');
    this.headers.append('Authorization', 'Bearer ' + this._authenService.getLoggedInUser().access_token);
    return this._http.get(SystemConstants.BASE_API + url, { headers: this.headers }).map(this.extractData);

  }

  post(url: string, data?: any) {
    this.headers.delete('Authorization');
    this.headers.append('Authorization', 'Bearer ' + this._authenService.getLoggedInUser().access_token);
    return this._http.post(SystemConstants.BASE_API + url, data, { headers: this.headers }).map(this.extractData);
  }

  put(url: string, data?: any) {
    this.headers.delete('Authorization');
    this.headers.append('Authorization', 'Bearer ' + this._authenService.getLoggedInUser().access_token);
    return this._http.put(SystemConstants.BASE_API + url, data, { headers: this.headers }).map(this.extractData);
  }

  delete(url: string, key: string, id: string) {
    this.headers.delete('Authorization');
    this.headers.append('Authorization', 'Bearer ' + this._authenService.getLoggedInUser().access_token);
    return this._http.delete(SystemConstants.BASE_API + url + '/?' + key + '=' + id, { headers: this.headers }).map(this.extractData);
  }

  postFile(url: string, data?: any) {
    this.headers.delete('Authorization');
    this.headers.append('Authorization', 'Bearer ' + this._authenService.getLoggedInUser().access_token);
    return this._http.post(SystemConstants.BASE_API + url, data, { headers: this.headers }).map(this.extractData);
  }

}
