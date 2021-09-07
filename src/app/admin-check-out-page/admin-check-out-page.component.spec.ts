import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCheckOutPageComponent } from './admin-check-out-page.component';

describe('AdminCheckOutPageComponent', () => {
  let component: AdminCheckOutPageComponent;
  let fixture: ComponentFixture<AdminCheckOutPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCheckOutPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCheckOutPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
