import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderPredictionComponent } from './order-prediction.component';

describe('OrderPredictionComponent', () => {
  let component: OrderPredictionComponent;
  let fixture: ComponentFixture<OrderPredictionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderPredictionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderPredictionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
