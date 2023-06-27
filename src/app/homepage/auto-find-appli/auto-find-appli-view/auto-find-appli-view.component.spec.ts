import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoFindAppliViewComponent } from './auto-find-appli-view.component';

describe('AutoFindAppliViewComponent', () => {
  let component: AutoFindAppliViewComponent;
  let fixture: ComponentFixture<AutoFindAppliViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutoFindAppliViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutoFindAppliViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
