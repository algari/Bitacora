import { Component, OnInit } from '@angular/core';
import { StrategiesService } from '../../services/strategies.service';
import { AuthenticationService } from '../../../public/services/authentication.service';
import {Validators, FormBuilder} from "@angular/forms";
import { Strategies } from '../../../common/models/strategies.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-strategy',
  templateUrl: './new-strategy.component.html',
  styleUrls: ['./new-strategy.component.css']
})
export class NewStrategyComponent implements OnInit {

  constructor(private _formBuilder: FormBuilder,
    private _strategyService: StrategiesService,
    private _authS: AuthenticationService,
    private _router: Router,) { }

  form = this._formBuilder.group( {
    strategy: this._formBuilder.group( {
      strategy: [ ,Validators.required],
      description: [ , Validators.required ],
      username: [ this._authS.user.username]
    } )
  } );

  ngOnInit() {
  }

  onSubmit() {
    this._strategyService.create(this.form.value.strategy).subscribe(
      (strategy: Strategies) => {
        setTimeout(() => {
          this._router.navigate(['/private/strategies']);
        }, 3000);
      },
      errorResponse => {
        const errorData = errorResponse.json();
        console.error(errorData.error);
      },
      () => {
        console.log('Finished creation request');
      }
    );
  }

  isRequired( fieldName: string ): boolean {
    return this.form.get( `strategy.${fieldName}` ).hasError( 'required' )
      && this.form.get( `strategy.${fieldName}` ).touched;
  }
}
