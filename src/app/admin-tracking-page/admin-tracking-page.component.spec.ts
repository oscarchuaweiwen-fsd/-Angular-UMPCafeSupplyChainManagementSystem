import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTrackingPageComponent } from './admin-tracking-page.component';

describe('AdminTrackingPageComponent', () => {
  let component: AdminTrackingPageComponent;
  let fixture: ComponentFixture<AdminTrackingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminTrackingPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTrackingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
