import {Directive, forwardRef, Injectable} from '@angular/core';
import {AbstractControl, AsyncValidator, NG_ASYNC_VALIDATORS, ValidationErrors} from '@angular/forms';
import {ApiService} from '@core/services/api.service';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {TokenService} from '@core/services/token.service';

/**
 * Async validator to dynamically check if a username is unique while the form is filled out.
 */
@Injectable({providedIn: 'root'})
export class UniqueUsernameValidator implements AsyncValidator {
  /**
   * Constructor
   * @param apiService - ApiService to make API calls
   * @param session - TokenService to get access to session information
   */
  constructor(private apiService: ApiService, private session: TokenService) {
  }

  /**
   * Validate function checks uniqueness of a username.
   * @description As the current username is always unique but exists in the database, the special case is checked
   * @param control - Form field
   */
  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    if (this.session.isLoggedIn() && control.value.toLowerCase() === this.session.getUsername().toLowerCase()) {
      // Current username is always unique
      return of(null);
    }
    return this.apiService.checkUsername(control.value.toLowerCase()).pipe(
      map(isUnique => (!isUnique.unique ? {uniqueError: true} : null)),
      catchError(() => of(null))
    );
  }
}

/**
 * Directive to provide an async validator to check user name uniqueness while the user fills out the form.
 */
@Directive({
  selector: '[appUniqueUsername]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: forwardRef(() => UniqueUsernameValidator),
      multi: true
    }

  ]
})

export class UniqueUsernameDirective {
  /**
   * Directive constructor
   * @param validator - UniqueUsernameValidator
   */
  constructor(private validator: UniqueUsernameValidator) {
  }

  /**
   * Wrapper function to call validator validate
   * @param control - Form field
   */
  validate(control: AbstractControl): void {
    this.validator.validate(control);
  }

}
