import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminManageInventoryComponent } from './admin-manage-inventory.component';

describe('AdminManageInventoryComponent', () => {
  let component: AdminManageInventoryComponent;
  let fixture: ComponentFixture<AdminManageInventoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminManageInventoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminManageInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
