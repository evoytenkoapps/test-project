import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierAndConsumerComponent } from './supplier-and-consumer.component';

describe('SupplierAndConsumerComponent', () => {
  let component: SupplierAndConsumerComponent;
  let fixture: ComponentFixture<SupplierAndConsumerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupplierAndConsumerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierAndConsumerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
