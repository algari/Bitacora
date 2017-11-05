/**
 * Created by agalvis on 05/11/2017.
 */
import { AbstractControl } from '@angular/forms';

export class PriceValidator {

  static checkPrice( control: AbstractControl ) {
    const regexPassword = /\d*(\.\d*$)/;
    const isValid = regexPassword.test( control.value );
    return isValid ? null : { invalidPrice: true };
  }
}
