import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChapterTablingComponent } from './chapter-tabling.component';

describe('ChapterTablingComponent', () => {
  let component: ChapterTablingComponent;
  let fixture: ComponentFixture<ChapterTablingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChapterTablingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChapterTablingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
