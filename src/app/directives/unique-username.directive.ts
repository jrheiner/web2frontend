import {Directive, forwardRef, Injectable} from '@angular/core';
import {AbstractControl, AsyncValidator, NG_ASYNC_VALIDATORS, ValidationErrors} from '@angular/forms';
import {ApiService} from '../core/services/api.service';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {TokenService} from '../core/services/token.service';


@Injectable({providedIn: 'root'})
export class UniqueUsernameValidator implements AsyncValidator {
  constructor(private apiService: ApiService, private session: TokenService) {
  }

  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    if (this.session.isLoggedIn() && control.value === this.session.getUsername()) {
      // Current username is always unique
      return of(null);
    }
    return this.apiService.checkUsername(control.value).pipe(
      map(isUnique => (!isUnique.unique ? {uniqueError: true} : null)),
      catchError(() => of(null))
    );
  }
}

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

  constructor(private validator: UniqueUsernameValidator) {
  }

  validate(control: AbstractControl): void {
    this.validator.validate(control);
  }

}
