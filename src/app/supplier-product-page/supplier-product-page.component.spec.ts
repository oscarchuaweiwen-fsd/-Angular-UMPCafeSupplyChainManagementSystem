import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierProductPageComponent } from './supplier-product-page.component';

describe('SupplierProductPageComponent', () => {
  let component: SupplierProductPageComponent;
  let fixture: ComponentFixture<SupplierProductPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupplierProductPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierProductPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
