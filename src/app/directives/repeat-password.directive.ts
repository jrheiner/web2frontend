import {Directive} from '@angular/core';
import {AbstractControl, FormGroup, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn} from '@angular/forms';


export const RepeatPasswordValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const password = control.get('registerPassword');
  const passwordRepeat = control.get('registerPasswordRepeat');
  return (password && passwordRepeat && password.value !== passwordRepeat.value) ? {NotMatching: true} : null;
};


@Directive({
  selector: '[appRepeatPassword]',
  providers: [{provide: NG_VALIDATORS, useExisting: RepeatPasswordValidatorDirective, multi: true}]
})
export class RepeatPasswordValidatorDirective implements Validator {

  constructor() {
  }

  validate(control: AbstractControl): ValidationErrors | null {
    return RepeatPasswordValidator(control);
  }

}
