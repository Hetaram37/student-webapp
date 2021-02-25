import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {
  ButtonsModule,
  InputsModule,
  InputUtilitiesModule,
  IconsModule,
  WavesModule
} from 'angular-bootstrap-md';
import { AuthService } from './auth.service';
import { HttpClientModule } from '@angular/common/http';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ButtonsModule,
    InputsModule.forRoot(),
    InputUtilitiesModule,
    IconsModule,
    WavesModule.forRoot(),
    HttpClientModule,
    AuthRoutingModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [ AuthService ]
})
export class AuthModule { }
