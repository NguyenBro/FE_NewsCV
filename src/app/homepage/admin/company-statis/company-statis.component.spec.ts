import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyStatisComponent } from './company-statis.component';

describe('CompanyStatisComponent', () => {
  let component: CompanyStatisComponent;
  let fixture: ComponentFixture<CompanyStatisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyStatisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyStatisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
