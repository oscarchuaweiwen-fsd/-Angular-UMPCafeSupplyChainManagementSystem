import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentNavbarPageComponent } from './student-navbar-page.component';

describe('StudentNavbarPageComponent', () => {
  let component: StudentNavbarPageComponent;
  let fixture: ComponentFixture<StudentNavbarPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentNavbarPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentNavbarPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
