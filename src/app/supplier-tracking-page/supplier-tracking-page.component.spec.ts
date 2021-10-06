import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierTrackingPageComponent } from './supplier-tracking-page.component';

describe('SupplierTrackingPageComponent', () => {
  let component: SupplierTrackingPageComponent;
  let fixture: ComponentFixture<SupplierTrackingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupplierTrackingPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierTrackingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
