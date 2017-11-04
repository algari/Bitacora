import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MomentPipePipe} from "./pipes/moment-pipe.pipe";
import {LoaderComponent} from "./loader/loader.component";

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    MomentPipePipe,
    LoaderComponent,
  ],
  exports:[
    MomentPipePipe,
    LoaderComponent
  ]
})
export class SharedModule { }
