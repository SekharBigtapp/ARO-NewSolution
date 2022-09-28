import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceMarkdownComponent } from './price-markdown.component';

describe('PriceMarkdownComponent', () => {
  let component: PriceMarkdownComponent;
  let fixture: ComponentFixture<PriceMarkdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PriceMarkdownComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PriceMarkdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
