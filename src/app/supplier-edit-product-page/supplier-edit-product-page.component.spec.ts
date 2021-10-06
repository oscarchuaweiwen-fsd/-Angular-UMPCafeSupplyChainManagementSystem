import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierEditProductPageComponent } from './supplier-edit-product-page.component';

describe('SupplierEditProductPageComponent', () => {
  let component: SupplierEditProductPageComponent;
  let fixture: ComponentFixture<SupplierEditProductPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupplierEditProductPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierEditProductPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
