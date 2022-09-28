import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DCStoreMappingComponent } from './dc-store-mapping.component';

describe('DCStoreMappingComponent', () => {
  let component: DCStoreMappingComponent;
  let fixture: ComponentFixture<DCStoreMappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DCStoreMappingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DCStoreMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
