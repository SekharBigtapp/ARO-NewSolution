import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulingConfigComponent } from './scheduling-config.component';

describe('SchedulingConfigComponent', () => {
  let component: SchedulingConfigComponent;
  let fixture: ComponentFixture<SchedulingConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchedulingConfigComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchedulingConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
