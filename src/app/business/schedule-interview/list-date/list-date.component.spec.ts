import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDateComponent } from './list-date.component';

describe('ListDateComponent', () => {
  let component: ListDateComponent;
  let fixture: ComponentFixture<ListDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListDateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
