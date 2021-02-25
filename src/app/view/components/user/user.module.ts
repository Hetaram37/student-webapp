import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { AddComponent } from './components/add/add.component';
import { UpdateComponent } from './components/update/update.component';
import { ListComponent } from './components/list/list.component';
import { GetComponent } from './components/get/get.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  ButtonsModule,
  InputsModule,
  InputUtilitiesModule,
  IconsModule,
  WavesModule,
} from 'angular-bootstrap-md';
import { DeleteComponent } from './components/delete/delete.component';

@NgModule({
  declarations: [UserComponent, AddComponent, UpdateComponent, ListComponent, GetComponent, DeleteComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    ButtonsModule,
    InputsModule.forRoot(),
    InputUtilitiesModule,
    IconsModule,
    WavesModule.forRoot(),
    MatTableModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class UserModule { }
