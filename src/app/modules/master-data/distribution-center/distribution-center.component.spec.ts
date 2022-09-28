import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributionCenterComponent } from './distribution-center.component';

describe('DistributionCenterComponent', () => {
  let component: DistributionCenterComponent;
  let fixture: ComponentFixture<DistributionCenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DistributionCenterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DistributionCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
