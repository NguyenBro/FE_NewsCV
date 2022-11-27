import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruitStatisComponent } from './recruit-statis.component';

describe('RecruitStatisComponent', () => {
  let component: RecruitStatisComponent;
  let fixture: ComponentFixture<RecruitStatisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecruitStatisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecruitStatisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
