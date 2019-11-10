import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccordianItemComponent } from './accordian-item.component';

describe('AccordianItemComponent', () => {
  let component: AccordianItemComponent;
  let fixture: ComponentFixture<AccordianItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccordianItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccordianItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
