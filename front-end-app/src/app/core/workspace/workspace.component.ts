import {Component, OnInit, ViewChild} from '@angular/core';
import {Internaute} from "../../models/Internaute.model";
import {AuthService} from "../../shared/services/auth.service";

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss']
})
export class WorkspaceComponent implements OnInit {
  selectedIndex = 0
  user: Internaute = new Internaute()

  constructor(
    private readonly authSrv: AuthService
  ) {
  }

  ngOnInit() {
    this.fetchCurrentUser()
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
