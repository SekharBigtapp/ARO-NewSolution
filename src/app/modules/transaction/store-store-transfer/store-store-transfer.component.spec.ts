import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreStoreTransferComponent } from './store-store-transfer.component';

describe('StoreStoreTransferComponent', () => {
  let component: StoreStoreTransferComponent;
  let fixture: ComponentFixture<StoreStoreTransferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreStoreTransferComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoreStoreTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
