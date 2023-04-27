import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { NzRadioModule } from 'ng-zorro-antd/radio';


import {AuthRoutingModule} from './auth-routing.module';
import {FormsModule} from "@angular/forms";
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';


@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    NzRadioModule
  ]
})
export class AuthModule {
}
