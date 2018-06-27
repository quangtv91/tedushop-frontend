import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { UserModule } from './user/user.module';
import { RouterModule } from '@angular/router';
import { mainRoutes } from './main.routes';

@NgModule({
  imports: [
    CommonModule,
    UserModule,
    RouterModule.forChild(mainRoutes),
  ],
  declarations: [MainComponent]
})
export class MainModule { }
