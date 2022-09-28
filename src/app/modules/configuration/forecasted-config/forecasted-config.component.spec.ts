import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForecastedConfigComponent } from './forecasted-config.component';

describe('ForecastedConfigComponent', () => {
  let component: ForecastedConfigComponent;
  let fixture: ComponentFixture<ForecastedConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForecastedConfigComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForecastedConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
