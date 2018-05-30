import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ListSkuComponent } from './list-sku.component';

describe('ListSkuComponent', () => {
  let component: ListSkuComponent;
  let fixture: ComponentFixture<ListSkuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListSkuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSkuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
