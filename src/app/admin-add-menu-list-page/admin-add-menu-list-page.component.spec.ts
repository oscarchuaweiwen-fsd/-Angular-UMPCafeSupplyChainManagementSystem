import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddMenuListPageComponent } from './admin-add-menu-list-page.component';

describe('AdminAddMenuListPageComponent', () => {
  let component: AdminAddMenuListPageComponent;
  let fixture: ComponentFixture<AdminAddMenuListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAddMenuListPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAddMenuListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
