import { NgModule } from '@angular/core';
import {FormsModule} from "@angular/forms";
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';
import { AppCustomUsernameDirective } from '../../common/directives/app-custom-username.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    LoginRoutingModule
  ],
  declarations: [
    LoginComponent,
    AppCustomUsernameDirective
  ],
  providers:[
    
  ]
})
export class LoginModule { }
