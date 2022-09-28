import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhysicalStockCheckComponent } from './physical-stock-check.component';

describe('PhysicalStockCheckComponent', () => {
  let component: PhysicalStockCheckComponent;
  let fixture: ComponentFixture<PhysicalStockCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhysicalStockCheckComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhysicalStockCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
