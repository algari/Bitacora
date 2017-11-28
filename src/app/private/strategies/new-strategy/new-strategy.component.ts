import { Component, OnInit } from '@angular/core';
import { StrategiesService } from '../../services/strategies.service';
import { AuthenticationService } from '../../../public/services/authentication.service';
import {Validators, FormBuilder} from "@angular/forms";
import { Strategies } from '../../../common/models/strategies.model';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-new-strategy',
  templateUrl: './new-strategy.component.html',
  styleUrls: ['./new-strategy.component.css']
})
export class NewStrategyComponent implements OnInit {

  edit:boolean = false;

  constructor(
    public _formBuilder: FormBuilder,
    public _strategyService: StrategiesService,
    public _authS: AuthenticationService,
    public _router: Router,
    public _activatedRoute: ActivatedRoute
  ) { }

  form = this._formBuilder.group( {
    strategy: this._formBuilder.group( {
      _id:[],
      strategy: [ ,Validators.required],
      description: [ , Validators.required ],
      username: [ this._authS.user.username]
    } )
  } );

  ngOnInit() {
    this._activatedRoute.params.subscribe(params => {
      const id: number = params['id'];
      if(id){
        this.loadEditStrategy(id);
        this.edit = true;
      }
    });
  }

  onSubmit() {
    if(this.edit){
      this.editStrategy();
    }else{
      this.createStrategy();
    }

  }

  isRequired( fieldName: string ): boolean {
    return this.form.get( `strategy.${fieldName}` ).hasError( 'required' )
      && this.form.get( `strategy.${fieldName}` ).touched;
  }

  private loadEditStrategy(id: number) {
    this._strategyService.getSingle(id).subscribe(
      (strategy: Strategies) => {
        this.form.get('strategy._id').setValue(strategy._id);
        this.form.get('strategy.strategy').setValue(strategy.strategy);
        this.form.get('strategy.description').setValue(strategy.description);
      },
      errorResponse => {
        const errorData = errorResponse.json();
        console.error(errorData.error);
      },
      () => {
        console.log('Finished loadEditStrategy');
      }
    );
  }

  private createStrategy() {
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
        console.log('Finished createStrategy');
      }
    );
  }

  private editStrategy() {
    this._strategyService.update(this.form.value.strategy).subscribe(
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
        console.log('Finished editStrategy');
      }
    );
  }
}
