import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorManagedInventoryComponent } from './vendor-managed-inventory.component';

describe('VendorManagedInventoryComponent', () => {
  let component: VendorManagedInventoryComponent;
  let fixture: ComponentFixture<VendorManagedInventoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorManagedInventoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendorManagedInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
