import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierAddProductPageComponent } from './supplier-add-product-page.component';

describe('SupplierAddProductPageComponent', () => {
  let component: SupplierAddProductPageComponent;
  let fixture: ComponentFixture<SupplierAddProductPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupplierAddProductPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierAddProductPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
