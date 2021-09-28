import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppliernavbarpageComponent } from './suppliernavbarpage.component';

describe('SuppliernavbarpageComponent', () => {
  let component: SuppliernavbarpageComponent;
  let fixture: ComponentFixture<SuppliernavbarpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuppliernavbarpageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuppliernavbarpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
