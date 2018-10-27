import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowSellerComponent } from './show-seller.component';

describe('ShowSellerComponent', () => {
  let component: ShowSellerComponent;
  let fixture: ComponentFixture<ShowSellerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowSellerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowSellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
