import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../shared/services/auth.service";
import {Internaute} from "../../models/Internaute.model";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  isOnline = false
  currentUser: Internaute = new Internaute();

  constructor(
    private readonly authSrv: AuthService
  ) {
  }

  ngOnInit() {
    this.isUserOnline()
  }

  private isUserOnline() {
    this
      .authSrv
      .user$
      .subscribe(user => {
        this.isOnline = user !== null
        this.currentUser = user;
      })
  }

  logout() {
    this
      .authSrv
      .logout();
  }
}
