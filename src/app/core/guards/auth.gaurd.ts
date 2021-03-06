import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { SystemConstants } from '../common/system.constants';
import { UrlConstants } from '../common/url.constants';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router
  ) { }

  canActivate(activateRoute: ActivatedRouteSnapshot, routerState: RouterStateSnapshot) {
    if (localStorage.getItem(SystemConstants.CURRENT_USER)) {
      return true;
    } else {
      this.router.navigate([UrlConstants.LOGIN], {
        queryParams: {
          returnUrl: routerState.url
        }
      });
      return false;
    }
  }
}
