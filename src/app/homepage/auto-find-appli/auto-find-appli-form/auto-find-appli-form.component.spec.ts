import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoFindAppliFormComponent } from './auto-find-appli-form.component';

describe('AutoFindAppliFormComponent', () => {
  let component: AutoFindAppliFormComponent;
  let fixture: ComponentFixture<AutoFindAppliFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutoFindAppliFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutoFindAppliFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
