import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddOrderPageComponent } from './admin-add-order-page.component';

describe('AdminAddOrderPageComponent', () => {
  let component: AdminAddOrderPageComponent;
  let fixture: ComponentFixture<AdminAddOrderPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAddOrderPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAddOrderPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
