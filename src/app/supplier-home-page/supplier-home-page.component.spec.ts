import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierHomePageComponent } from './supplier-home-page.component';

describe('SupplierHomePageComponent', () => {
  let component: SupplierHomePageComponent;
  let fixture: ComponentFixture<SupplierHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupplierHomePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
