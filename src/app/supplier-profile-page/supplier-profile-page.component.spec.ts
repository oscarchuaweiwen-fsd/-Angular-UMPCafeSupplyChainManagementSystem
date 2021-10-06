import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierProfilePageComponent } from './supplier-profile-page.component';

describe('SupplierProfilePageComponent', () => {
  let component: SupplierProfilePageComponent;
  let fixture: ComponentFixture<SupplierProfilePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupplierProfilePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierProfilePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
