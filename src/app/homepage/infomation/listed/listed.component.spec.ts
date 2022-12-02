import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListedComponent } from './listed.component';

describe('ListedComponent', () => {
  let component: ListedComponent;
  let fixture: ComponentFixture<ListedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
