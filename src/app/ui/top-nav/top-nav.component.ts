import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Router } from '@angular/router';

import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss'],
  animations: [
    trigger('collapse', [
      state('open', style({
        opacity: '1',
        display: 'block',
        transform: 'translate3d(0, 0, 0)'
      })),
      state('closed', style({
        opacity: '0',
        display: 'none',
        transform: 'translate3d(0, -100%, 0)'
      })),
      transition('closed => open', animate('200ms ease-in')),
      transition('open => closed', animate('100ms ease-out'))
    ])
  ]
})
export class TopNavComponent implements OnInit {

  // collapse:string = "closed";
  show = false;
  isLoggedIn: boolean = false;

  constructor(private _router: Router,
              private _authSrv: AuthService) { }

  ngOnInit() {
    this._router.events.subscribe(event => {
      // console.log(this._router.url);
      // If on login, check logoutfromlogin boolean
      if(this._router.url == '/login'){
        // IF need to signout, just signout
        if(this._authSrv.logoutFromLogin) {
          this._authSrv.signOutHelper();
        } else {
          // ELSE setup auth change listener
          this.authChangeListener();
        }
      } else {
        this.authChangeListener();
      }
    })
  }

  authChangeListener() {
    this._authSrv.authChange.subscribe(res => {
      // console.log(res);
      if (res) {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
        this._router.navigate(['/login'])
      }
    })
  }

  logout() {
    this._authSrv.signOut();
  }

  toggleCollapse() {
    this.show = !this.show
    // this.collapse = this.collapse == "open" ? 'closed' : 'open';

  }

}
