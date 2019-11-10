import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { authService } from "../../services/auth.service";
import { ChatService } from "../../services/chat.service";
import { NotificationService } from './notification.service';
import { Observable } from 'rxjs';
import { AngularFireList } from 'angularfire2/database';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {
  private opened: boolean = false;
  private _modeNum: number = 0;
  private _positionNum: number = 0;
  private _dock: boolean = false;
  private _closeOnClickOutside: boolean = false;
  private _closeOnClickBackdrop: boolean = false;
  private _showBackdrop: boolean = false;
  private _animate: boolean = true;
  private _trapFocus: boolean = true;
  private _autoFocus: boolean = true;
  private _keyClose: boolean = false;
  private _autoCollapseHeight: number = null;
  private _autoCollapseWidth: number = null;

  sideNavItems = [
    {
      title: 'Notification Settings', settings: [{ id: 'Messages', text: 'Messages', type: 'switch', value: true },
      { id: 'Likes', text: 'Likes', type: 'text', value: 'AAA' },
      { id: 'Superlikes', text: 'Super likes', type: 'switch', value: false },
      { id: 'HideOccupation', text: 'Hide Occupation', type: 'switch', value: false }]
    },
    { title: 'Account Settings', settings: [{ id: 'Reset Password', text: 'Reset Password', type: 'switch', value: false }] },
    {
      title: 'Profile Settings', settings: [{ id: 'HideBio', text: 'Hide Bio', type: 'switch', value: false },
      { id: 'HideFullname', text: 'Hide Fullname', type: 'switch', value: false },
      { id: 'HideBirthday', text: 'Hide Birthday', type: 'switch', value: false },
      { id: 'HideAddress', text: 'Hide Address', type: 'switch', value: false },
      { id: 'HideMobile', text: 'HideMobile', type: 'switch', value: false },
      { id: 'HideEmail', text: 'Hide Email', type: 'switch', value: false },
      { id: 'HideOccupation', text: 'Hide Occupation', type: 'switch', value: false }]
    },
    { title: 'Preferences', settings: [] },
  ];

  private _MODES: Array<string> = ['over', 'push', 'slide'];
  private _POSITIONS: Array<string> = ['left', 'right', 'top', 'bottom'];
  username: string;
  notiList: Observable<any[]>;
  notiCount = 0;
  constructor(
    private authService: authService,
    private router: Router,
    private chatService: ChatService,
    private notiService: NotificationService,
    private el: ElementRef
  ) { }

  ngOnInit() {
    this.notiList = this.notiService.getNotifications();
    this.notiList.subscribe(val => {
      this.notiCount = val.filter(x => x.payload.val().isSeen === false).length;
    });
  }
  setSeen(oid){
    this.notiService.setSeenTrue(oid);
  }
  sidebarSave() {
    console.log(this.sideNavItems);
  }
  private _toggleOpened(): void {
    this.opened = !this.opened;
  }

  private _toggleMode(): void {
    this._modeNum++;

    if (this._modeNum === this._MODES.length) {
      this._modeNum = 0;
    }
  }

  private _toggleAutoCollapseHeight(): void {
    this._autoCollapseHeight = this._autoCollapseHeight ? null : 500;
  }

  private _toggleAutoCollapseWidth(): void {
    this._autoCollapseWidth = this._autoCollapseWidth ? null : 500;
  }

  private _togglePosition(): void {
    this._positionNum++;

    if (this._positionNum === this._POSITIONS.length) {
      this._positionNum = 0;
    }
  }

  private _toggleDock(): void {
    this._dock = !this._dock;
  }

  private _toggleCloseOnClickOutside(): void {
    this._closeOnClickOutside = !this._closeOnClickOutside;
  }

  private _toggleCloseOnClickBackdrop(): void {
    this._closeOnClickBackdrop = !this._closeOnClickBackdrop;
  }

  private _toggleShowBackdrop(): void {
    this._showBackdrop = !this._showBackdrop;
  }

  private _toggleAnimate(): void {
    this._animate = !this._animate;
  }

  private _toggleTrapFocus(): void {
    this._trapFocus = !this._trapFocus;
  }

  private _toggleAutoFocus(): void {
    this._autoFocus = !this._autoFocus;
  }

  private _toggleKeyClose(): void {
    this._keyClose = !this._keyClose;
  }

  private _onOpenStart(): void {
    console.info('Sidebar opening');
  }

  private _onOpened(): void {
    console.info('Sidebar opened');
  }

  private _onCloseStart(): void {
    console.info('Sidebar closing');
  }

  private _onClosed(): void {
    console.info('Sidebar closed');
  }

  private _onTransitionEnd(): void {
    console.info('Transition ended');
  }

  private _onBackdropClicked(): void {
    console.info('Backdrop clicked');
  }


  onLogoutClick(): boolean {
    this.authService.logout();
    this.chatService.disconnect();
    this.router.navigate(["/login"]);
    this.onNavigate();
    return false;
  }

  onNavigate(): void {
    this.collaspseNav();
  }

  collaspseNav(): void {
    let butt = this.el.nativeElement.querySelector(".navbar-toggle");
    let isCollapsed = this.hasClass(butt, "collapsed");
    if (isCollapsed == false) {
      butt.click();
    }
  }

  hasClass(element, cls) {
    return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
  }

}
