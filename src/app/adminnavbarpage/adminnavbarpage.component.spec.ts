import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminnavbarpageComponent } from './adminnavbarpage.component';

describe('AdminnavbarpageComponent', () => {
  let component: AdminnavbarpageComponent;
  let fixture: ComponentFixture<AdminnavbarpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminnavbarpageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminnavbarpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
