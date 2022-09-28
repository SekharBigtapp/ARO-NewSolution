import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierProductCombinationComponent } from './supplier-product-combination.component';

describe('SupplierProductCombinationComponent', () => {
  let component: SupplierProductCombinationComponent;
  let fixture: ComponentFixture<SupplierProductCombinationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupplierProductCombinationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupplierProductCombinationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
