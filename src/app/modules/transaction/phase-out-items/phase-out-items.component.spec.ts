import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhaseOutItemsComponent } from './phase-out-items.component';

describe('PhaseOutItemsComponent', () => {
  let component: PhaseOutItemsComponent;
  let fixture: ComponentFixture<PhaseOutItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhaseOutItemsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhaseOutItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
