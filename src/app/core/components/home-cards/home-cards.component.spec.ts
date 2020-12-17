import {ComponentFixture, TestBed} from '@angular/core/testing';

import {HomeCardsComponent} from './home-cards.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('HomeCardsComponent', () => {
  let component: HomeCardsComponent;
  let fixture: ComponentFixture<HomeCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [HomeCardsComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
