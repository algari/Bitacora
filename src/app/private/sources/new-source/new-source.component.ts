import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AuthenticationService} from "../../../public/services/authentication.service";
import {Router, ActivatedRoute} from "@angular/router";
import {SourcesService} from "../../services/sources.service";
import {Sources} from "../../../common/models/sources.model";

@Component({
  selector: 'app-new-source',
  templateUrl: './new-source.component.html',
  styleUrls: ['./new-source.component.css']
})
export class NewSourceComponent implements OnInit {

  edit:boolean = false;
  isLoading = true;

  constructor(
    public _formBuilder: FormBuilder,
    public _sourceService: SourcesService,
    public _authS: AuthenticationService,
    public _router: Router,
    public _activatedRoute: ActivatedRoute
  ) { }

  form = this._formBuilder.group( {
    source: this._formBuilder.group( {
      _id:[],
      source: [ ,Validators.required],
      username: [ this._authS.user.username]
    } )
  } );

  ngOnInit() {
    this._activatedRoute.params.subscribe(params => {
      const id: number = params['id'];
      if(id){
        this.loadEditSource(id);
        this.edit = true;
      }
    });
    this.isLoading = false;
  }

  onSubmit() {
    if(this.edit){
      this.editSource();
    }else{
      this.createSource();
    }

  }

  isRequired( fieldName: string ): boolean {
    return this.form.get( `source.${fieldName}` ).hasError( 'required' )
      && this.form.get( `source.${fieldName}` ).touched;
  }

  private loadEditSource(id: number) {

    this._sourceService.getSingle(id).subscribe(
      (source: Sources) => {
        this.form.get('source._id').setValue(source._id);
        this.form.get('source.source').setValue(source.source);
      },
      errorResponse => {
        const errorData = errorResponse.json();
        console.error(errorData.error);
      },
      () => {
        console.log('Finished loadEditSource');
      }
    );
  }

  private createSource() {
    this._sourceService.create(this.form.value.source).subscribe(
      (source: Sources) => {
        setTimeout(() => {
          this._router.navigate(['/private/sources']);
        }, 3000);
      },
      errorResponse => {
        const errorData = errorResponse.json();
        console.error(errorData.error);
      },
      () => {
        console.log('Finished createSource');
      }
    );
  }

  private editSource() {
    this._sourceService.update(this.form.value.source).subscribe(
      (source: Sources) => {
        setTimeout(() => {
          this._router.navigate(['/private/sources']);
        }, 3000);
      },
      errorResponse => {
        const errorData = errorResponse.json();
        console.error(errorData.error);
      },
      () => {
        console.log('Finished editSource');
      }
    );
  }

}
