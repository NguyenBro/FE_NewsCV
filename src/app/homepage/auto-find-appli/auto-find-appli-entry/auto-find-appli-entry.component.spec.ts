import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoFindAppliEntryComponent } from './auto-find-appli-entry.component';

describe('AutoFindAppliEntryComponent', () => {
  let component: AutoFindAppliEntryComponent;
  let fixture: ComponentFixture<AutoFindAppliEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutoFindAppliEntryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutoFindAppliEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
