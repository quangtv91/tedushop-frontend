import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import { FormsModule } from '@angular/forms';
import { ProductRouter } from './product.routes';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ModalModule } from 'ngx-bootstrap/modal';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { Daterangepicker } from 'ng2-daterangepicker';
import { SimpleTinyComponent } from '../../shared/simple-tiny/simple-tiny.component';
import { DataService } from '../../core/services/data.service';
import { UtilityService } from '../../core/services/utility.service';
import { UploadService } from '../../core/services/upload.service';
import { EditorModule } from '@tinymce/tinymce-angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ProductRouter,
    PaginationModule,
    ModalModule,
    MultiselectDropdownModule,
    Daterangepicker,
    EditorModule
  ],
  declarations: [ProductComponent, SimpleTinyComponent],
  providers: [DataService, UtilityService, UploadService]
})
export class ProductModule { }
