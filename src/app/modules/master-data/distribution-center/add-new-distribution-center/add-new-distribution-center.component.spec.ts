import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewDistributionCenterComponent } from './add-new-distribution-center.component';

describe('AddNewDistributionCenterComponent', () => {
  let component: AddNewDistributionCenterComponent;
  let fixture: ComponentFixture<AddNewDistributionCenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewDistributionCenterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNewDistributionCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
