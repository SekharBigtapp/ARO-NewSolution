import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonotonicConstraintsComponent } from './monotonic-constraints.component';

describe('MonotonicConstraintsComponent', () => {
  let component: MonotonicConstraintsComponent;
  let fixture: ComponentFixture<MonotonicConstraintsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonotonicConstraintsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonotonicConstraintsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
