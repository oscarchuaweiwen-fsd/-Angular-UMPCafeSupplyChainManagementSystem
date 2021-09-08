import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMenuListPageComponent } from './admin-menu-list-page.component';

describe('AdminMenuListPageComponent', () => {
  let component: AdminMenuListPageComponent;
  let fixture: ComponentFixture<AdminMenuListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminMenuListPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminMenuListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
