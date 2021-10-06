import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierOrderPageComponent } from './supplier-order-page.component';

describe('SupplierOrderPageComponent', () => {
  let component: SupplierOrderPageComponent;
  let fixture: ComponentFixture<SupplierOrderPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupplierOrderPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierOrderPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
