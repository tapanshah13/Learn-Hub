import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageAdminRoutingModule } from './manage-admin-routing.module';
import { ManageAdminComponent } from './manage-admin.component';
import { MaterialModule } from 'src/app/shared/material-module/material.module';
import { AddAdminComponent } from './add-admin/add-admin.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { ChangePasswordComponent } from './change-password/change-password.component';

@NgModule({
  declarations: [
    ManageAdminComponent,
    AddAdminComponent,
    ChangePasswordComponent,
  ],
  imports: [
    CommonModule,
    ManageAdminRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule,
    TranslateModule
  ],
  exports: [
    ManageAdminComponent
  ]
})
export class ManageAdminModule { }
