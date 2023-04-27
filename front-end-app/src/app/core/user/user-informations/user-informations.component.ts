import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../shared/services/auth.service";
import {Internaute} from "../../../models/Internaute.model";

@Component({
  selector: 'app-user-informations',
  templateUrl: './user-informations.component.html',
  styleUrls: ['./user-informations.component.scss']
})
export class UserInformationsComponent implements OnInit {
  user: Internaute = new Internaute()

  constructor(
    private readonly authSrv: AuthService
  ) {
  }

  ngOnInit() {
    this.fetchCurrentUser();
  }

  private fetchCurrentUser() {
    this
      .authSrv
      .user$
      .subscribe({
        next: user => this.user = user
      })
  }
}
