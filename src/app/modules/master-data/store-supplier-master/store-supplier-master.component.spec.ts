import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreSupplierMasterComponent } from './store-supplier-master.component';

describe('StoreSupplierMasterComponent', () => {
  let component: StoreSupplierMasterComponent;
  let fixture: ComponentFixture<StoreSupplierMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreSupplierMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoreSupplierMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
