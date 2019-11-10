import { Component, OnInit,ContentChildren, QueryList, AfterContentInit, } from '@angular/core';
import { animation, trigger, state, transition, animate, style, group, query, useAnimation, stagger } from '@angular/animations';
import { AccordianItemComponent } from '../accordian-item/accordian-item.component';

@Component({
  selector: 'app-accordian',
  templateUrl: './accordian.component.html',
  styleUrls: ['./accordian.component.scss'],
  animations: [
    trigger('testAnimation', [
      transition('* => *', [
        query('*', style({ opacity: 0 })),
        query('*', stagger('50ms', [animate('1s', style({ opacity: 1 }))]))
      ])
    ])
  ]
})
export class AccordianComponent implements OnInit, AfterContentInit {
  @ContentChildren(AccordianItemComponent) items: QueryList<AccordianItemComponent>;
  constructor() { }

  ngOnInit() {
  }

  ngAfterContentInit() {

    // this.items.toArray()[0].isOpen = true;  // If we need to open item in the start state

    this.items.toArray().forEach((item) => {
      item.onToggle.subscribe(() => {
        this.itemToggleHandler(item);
      });
    });
  }

  itemToggleHandler(item: AccordianItemComponent) {

    // this.items.toArray().forEach(item => item.isOpen = false);  // TODO: if we need close opened items

  }
}
