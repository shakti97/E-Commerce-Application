import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPalletsComponent } from './admin-pallets.component';

describe('AdminPalletsComponent', () => {
  let component: AdminPalletsComponent;
  let fixture: ComponentFixture<AdminPalletsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPalletsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPalletsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
