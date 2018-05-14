import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResformComponent } from './resform.component';

describe('ResformComponent', () => {
  let component: ResformComponent;
  let fixture: ComponentFixture<ResformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
