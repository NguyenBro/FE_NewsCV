import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransHisComComponent } from './trans-his-com.component';


describe('TransHisComComponent', () => {
  let component: TransHisComComponent;
  let fixture: ComponentFixture<TransHisComComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransHisComComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransHisComComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
