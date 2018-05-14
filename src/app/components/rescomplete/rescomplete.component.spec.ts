import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RescompleteComponent } from './rescomplete.component';

describe('RescompleteComponent', () => {
  let component: RescompleteComponent;
  let fixture: ComponentFixture<RescompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RescompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RescompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
