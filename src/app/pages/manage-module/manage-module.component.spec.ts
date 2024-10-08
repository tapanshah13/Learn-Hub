import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageModuleComponent } from './manage-module.component';

describe('ManageModuleComponent', () => {
  let component: ManageModuleComponent;
  let fixture: ComponentFixture<ManageModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageModuleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
