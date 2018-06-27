import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { HomeModule } from './home/home.module';
import { UserModule } from './user/user.module';
import { RouterModule } from '@angular/router';
import { mainRoutes } from './main.routes';
import { AuthenService } from '../core/services/authen.service';
import { UtilityService } from '../core/services/utility.service';

@NgModule({
  imports: [
    CommonModule,
    HomeModule,
    UserModule,
    RouterModule.forChild(mainRoutes),
  ],
  providers: [AuthenService, UtilityService],
  declarations: [MainComponent]
})
export class MainModule { }
