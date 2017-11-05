import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appCustomUsername]'
})
export class AppCustomUsernameDirective {

  constructor(private _element:ElementRef) {

  }

  @HostListener('input',['$event'])
  onkeydown(event:KeyboardEvent){
    const input = event.target as HTMLInputElement;
    const cleanText = input.value.trim();
    if(cleanText.length >0){
      input.value = cleanText.replace(/\s+/g,'');
    }
    console.log(input);
  }
}

