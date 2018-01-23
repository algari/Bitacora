import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AuthenticationService} from "../../../public/services/authentication.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UsersService} from "../../services/users.service";

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
    public _router: Router,
    public _activatedRoute: ActivatedRoute
  ) { }

  form = this._formBuilder.group( {
    userx: this._formBuilder.group( {
      password: [ ,Validators.required],
      password1: [,[Validators.required, Validators.minLength(5)]],
      password2: [,[Validators.required, Validators.minLength(5)]],
    } )
  } );

  ngOnInit() {
    this.isLoading = false;
  }

  onSubmit() {


  }

  isRequired( fieldName: string ): boolean {
    return this.form.get( `userx.${fieldName}` ).hasError( 'required' )
      && this.form.get( `userx.${fieldName}` ).touched;
  }

}
