import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptimizeReorderComponent } from './optimize-reorder.component';

describe('OptimizeReorderComponent', () => {
  let component: OptimizeReorderComponent;
  let fixture: ComponentFixture<OptimizeReorderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OptimizeReorderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OptimizeReorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
