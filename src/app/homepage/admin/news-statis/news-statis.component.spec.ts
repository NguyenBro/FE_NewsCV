import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsStatisComponent } from './news-statis.component';

describe('NewsStatisComponent', () => {
  let component: NewsStatisComponent;
  let fixture: ComponentFixture<NewsStatisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewsStatisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewsStatisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
