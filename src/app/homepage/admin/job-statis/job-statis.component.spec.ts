import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobStatisComponent } from './job-statis.component';

describe('JobStatisComponent', () => {
  let component: JobStatisComponent;
  let fixture: ComponentFixture<JobStatisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobStatisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobStatisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
