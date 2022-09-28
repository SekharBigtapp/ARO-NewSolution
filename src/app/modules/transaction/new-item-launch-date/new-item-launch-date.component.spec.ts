import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewItemLaunchDateComponent } from './new-item-launch-date.component';

describe('NewItemLaunchDateComponent', () => {
  let component: NewItemLaunchDateComponent;
  let fixture: ComponentFixture<NewItemLaunchDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewItemLaunchDateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewItemLaunchDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
