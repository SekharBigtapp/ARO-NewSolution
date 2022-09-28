import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreStoreTransferConfigComponent } from './store-store-transfer-config.component';

describe('StoreStoreTransferConfigComponent', () => {
  let component: StoreStoreTransferConfigComponent;
  let fixture: ComponentFixture<StoreStoreTransferConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreStoreTransferConfigComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoreStoreTransferConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
