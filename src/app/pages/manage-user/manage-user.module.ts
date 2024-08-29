import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageUserRoutingModule } from './manage-user-routing.module';
import { ManageUserComponent } from './manage-user.component';
import { MaterialModule } from 'src/app/shared/material-module/material.module';
import { EditUserComponent } from './edit-user/edit-user.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    ManageUserComponent,
    EditUserComponent,
  ],
  imports: [
    CommonModule,
    ManageUserRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule
  ]
})
export class ManageUserModule { }
