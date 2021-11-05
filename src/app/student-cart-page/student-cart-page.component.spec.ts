import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentCartPageComponent } from './student-cart-page.component';

describe('StudentCartPageComponent', () => {
  let component: StudentCartPageComponent;
  let fixture: ComponentFixture<StudentCartPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentCartPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentCartPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
