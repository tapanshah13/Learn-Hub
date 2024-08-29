import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreRequisiteCoursesComponent } from './pre-requisite-courses.component';

describe('PreRequisiteCoursesComponent', () => {
  let component: PreRequisiteCoursesComponent;
  let fixture: ComponentFixture<PreRequisiteCoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreRequisiteCoursesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreRequisiteCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
