import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminViewHistoryDetailPageComponent } from './admin-view-history-detail-page.component';

describe('AdminViewHistoryDetailPageComponent', () => {
  let component: AdminViewHistoryDetailPageComponent;
  let fixture: ComponentFixture<AdminViewHistoryDetailPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminViewHistoryDetailPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminViewHistoryDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
