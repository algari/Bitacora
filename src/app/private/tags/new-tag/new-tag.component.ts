import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {TagService} from "../../services/tag.service";
import {AuthenticationService} from "../../../public/services/authentication.service";
import {Router, ActivatedRoute} from "@angular/router";
import {Tag} from "../../../common/models/tag";

@Component({
  selector: 'app-new-tag',
  templateUrl: './new-tag.component.html',
  styleUrls: ['./new-tag.component.css']
})
export class NewTagComponent implements OnInit {

  edit:boolean = false;
  isLoading = true;

  constructor(
    public _formBuilder: FormBuilder,
    public _tagS: TagService,
    public _authS: AuthenticationService,
    public _router: Router,
    public _activatedRoute: ActivatedRoute
  ) { }

  form = this._formBuilder.group( {
    tag: this._formBuilder.group( {
      _id:[],
      tag: [ ,Validators.required],
      description: [],
      username: [ this._authS.user.username]
    } )
  } );

  ngOnInit() {
    this._activatedRoute.params.subscribe(params => {
      const id: number = params['id'];
      if(id){
        this.loadEditTag(id);
        this.edit = true;
      }
    });
    this.isLoading = false;
  }

  onSubmit() {
    if(this.edit){
      this.editTag();
    }else{
      this.createTag();
    }

  }

  isRequired( fieldName: string ): boolean {
    return this.form.get( `tag.${fieldName}` ).hasError( 'required' )
      && this.form.get( `tag.${fieldName}` ).touched;
  }

  private loadEditTag(id: number) {
    this._tagS.getSingle(id).subscribe(
      (tag: Tag) => {
        this.form.get('tag._id').setValue(tag._id);
        this.form.get('tag.tag').setValue(tag.tag);
        this.form.get('tag.description').setValue(tag.description);
      },
      errorResponse => {
        const errorData = errorResponse.json();
        console.error(errorData.error);
      },
      () => {
        console.log('Finished loadEditTag');
      }
    );
  }

  private createTag() {
    this._tagS.create(this.form.value.tag).subscribe(
      (tag: Tag) => {
        setTimeout(() => {
          this._router.navigate(['/private/tags']);
        }, 3000);
      },
      errorResponse => {
        const errorData = errorResponse.json();
        console.error(errorData.error);
      },
      () => {
        console.log('Finished createTag');
      }
    );
  }

  private editTag() {
    this._tagS.update(this.form.value.tag).subscribe(
      (tag: Tag) => {
        setTimeout(() => {
          this._router.navigate(['/private/tags']);
        }, 3000);
      },
      errorResponse => {
        const errorData = errorResponse.json();
        console.error(errorData.error);
      },
      () => {
        console.log('Finished editTag');
      }
    );
  }

}
