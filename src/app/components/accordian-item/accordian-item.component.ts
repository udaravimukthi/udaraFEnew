import { Component, Input, Output, HostBinding, EventEmitter, OnInit } from '@angular/core';
import { animation, trigger, state, transition, animate, style, group, query, useAnimation, stagger } from '@angular/animations';

@Component({
  selector: 'app-accordian-item',
  templateUrl: './accordian-item.component.html',
  styleUrls: ['./accordian-item.component.scss'],
  animations: [
    trigger('accordionItemContentAnimation',[
      state('isOpen', style({height: '*'})),
      state('isClose', style({height: 0})),
      transition('isOpen <=> isClose', group([animate('500ms')])),
    ])
  ]
})
export class AccordianItemComponent implements OnInit {
  public state: string = 'isClose';
  private _isOpen: boolean = false;

  @Input('isOpen')
  set isOpen(value: boolean) {
    this._isOpen = value;
    this.state = this._isOpen ? 'isOpen' : 'isClose';
  }
  get isOpen(): boolean {
    return this._isOpen;
  }
  @Input() title: string;
  @Input() settings: object;
  @Output() onToggle: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }


  ngOnInit() {
  }


  public onClickHeader() {
    this.isOpen = this.isOpen? false : true;
    this.onToggle.emit(this.isOpen);
  }
  onChange($event){
    console.log(this.settings);
    console.log($event);
  }
}
