import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { HomeModule } from './home/home.module';
import { UserModule } from './user/user.module';
import { RouterModule } from '@angular/router';
import { mainRoutes } from './main.routes';

@NgModule({
  imports: [
    CommonModule,
    HomeModule,
    UserModule,
    RouterModule.forChild(mainRoutes),
  ],
  declarations: [MainComponent]
})
export class MainModule { }
