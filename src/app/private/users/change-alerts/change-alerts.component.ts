import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {UsersService} from "../../services/users.service";
import {AuthenticationService} from "../../../public/services/authentication.service";
import {MessageService} from "primeng/components/common/messageservice";
import {User} from "../../../common/models/user.model";

@Component({
  selector: 'app-change-alerts',
  templateUrl: './change-alerts.component.html',
  styleUrls: ['./change-alerts.component.css']
})
export class ChangeAlertsComponent implements OnInit {

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
      max_weekly_loss: [this._authS.user.max_weekly_loss,[Validators.required]],
      weekly_goal: [this._authS.user.weekly_goal,[Validators.required]]
    } )
  } );

  ngOnInit() {
    this.isLoading = false;
  }

  onSubmit() {
    let user:User = new User();
    user._id = this._authS.user._id;
    user.max_weekly_loss = this.form.get('userx.max_weekly_loss').value;
    user.weekly_goal = this.form.get('userx.weekly_goal').value;
    this._userS.update(user).subscribe(
      (user: User) => {
        this.messageService.add({severity:'info', summary:'Alerta', detail:'Alerta Creada con éxito, tendrá efecto el próximo inicio de sesión'});
        this.form.reset();
      },
      errorResponse => {
        const errorData = errorResponse.json();
        console.error(errorData.error);
        this.messageService.add({severity:'warn', summary:'Alerta', detail:'Error al crear la alerta'});
      },
      () => {
        console.log('Finished ChangeAlert');
      }
    );
  }

  isRequired( fieldName: string ): boolean {
    return this.form.get( `userx.${fieldName}` ).hasError( 'required' )
      && this.form.get( `userx.${fieldName}` ).touched;
  }

}
