import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPurChaseHistoryPageComponent } from './admin-pur-chase-history-page.component';

describe('AdminPurChaseHistoryPageComponent', () => {
  let component: AdminPurChaseHistoryPageComponent;
  let fixture: ComponentFixture<AdminPurChaseHistoryPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPurChaseHistoryPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPurChaseHistoryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
