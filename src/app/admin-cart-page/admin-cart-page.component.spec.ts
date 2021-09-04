import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCartPageComponent } from './admin-cart-page.component';

describe('AdminCartPageComponent', () => {
  let component: AdminCartPageComponent;
  let fixture: ComponentFixture<AdminCartPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCartPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCartPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
