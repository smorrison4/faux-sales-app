import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EditRepComponent } from './edit-rep.component';

describe('EditRepComponent', () => {
  let component: EditRepComponent;
  let fixture: ComponentFixture<EditRepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditRepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
