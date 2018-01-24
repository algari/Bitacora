import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AuthenticationService} from "../../../public/services/authentication.service";
import {UsersService} from "../../services/users.service";
import {MessageService} from "primeng/components/common/messageservice";
import {User} from "../../../common/models/user.model";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  edit:boolean = false;
  isLoading = true;

  constructor(
    public _formBuilder: FormBuilder,
    public _userS: UsersService,
    public _authS: AuthenticationService,
    public messageService: MessageService
  ) { }

  form = this._formBuilder.group( {
    userx: this._formBuilder.group( {
      password1: [,[Validators.required, Validators.minLength(5)]],
      password2: [,[Validators.required, Validators.minLength(5)]],
    } )
  } );

  ngOnInit() {
    this.isLoading = false;
  }

  onSubmit() {
    if(this.form.get('userx.password1').value == this.form.get('userx.password2').value){
      let user:User = new User();
      user._id = this._authS.user._id;
      user.password = this.form.get('userx.password1').value;
      this._userS.update(user).subscribe(
        (user: User) => {
          this.messageService.add({severity:'info', summary:'Cambio Contraseña', detail:'Cambio contraseñas exitoso'});
          this.form.reset();
        },
        errorResponse => {
          const errorData = errorResponse.json();
          console.error(errorData.error);
        },
        () => {
          console.log('Finished ChangePassword');
        }
      );
    }else{
      this.messageService.add({severity:'warn', summary:'Cambio Contraseña', detail:'Las contraseñas deben coincidir'});
    }

  }

  isRequired( fieldName: string ): boolean {
    return this.form.get( `userx.${fieldName}` ).hasError( 'required' )
      && this.form.get( `userx.${fieldName}` ).touched;
  }

}
