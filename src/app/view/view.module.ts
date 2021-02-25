import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewComponent } from './view.component';
import { AuthModule } from './components/auth/auth.module';
import { UserModule } from './components/user/user.module';

@NgModule({
  declarations: [ ViewComponent ],
  imports: [
    CommonModule,
    AuthModule,
    UserModule
  ]
})
export class ViewModule { }
