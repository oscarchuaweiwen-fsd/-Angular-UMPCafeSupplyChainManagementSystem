import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPermissionPageComponent } from './admin-permission-page.component';

describe('AdminPermissionPageComponent', () => {
  let component: AdminPermissionPageComponent;
  let fixture: ComponentFixture<AdminPermissionPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPermissionPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPermissionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
