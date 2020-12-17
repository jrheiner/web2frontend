import {ComponentFixture, TestBed} from '@angular/core/testing';

import {UserSavedComponent} from './user-saved.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('UserSavedComponent', () => {
  let component: UserSavedComponent;
  let fixture: ComponentFixture<UserSavedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [UserSavedComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSavedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
