import {Directive} from '@angular/core';
import {AbstractControl, FormGroup, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn} from '@angular/forms';

/**
 * Validator to check if two form field values match.
 * @param control - Form group
 */
export const RepeatPasswordValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const password = control.get('registerPassword');
  const passwordRepeat = control.get('registerPasswordRepeat');
  return (password && passwordRepeat && password.value !== passwordRepeat.value) ? {NotMatching: true} : null;
};

/**
 * Directive to validate the register form 'repeat password' field.
 */
@Directive({
  selector: '[appRepeatPassword]',
  providers: [{provide: NG_VALIDATORS, useExisting: RepeatPasswordValidatorDirective, multi: true}]
})
export class RepeatPasswordValidatorDirective implements Validator {

  /**
   * Empty Constructor
   */
  constructor() {
  }

  /**
   * Wrapper function to call the directive validator
   * @param control - Form group
   */
  validate(control: AbstractControl): ValidationErrors | null {
    return RepeatPasswordValidator(control);
  }

}
