import {Component, Input, OnInit} from '@angular/core';
import {Internaute} from "../../../models/Internaute.model";
import {AuthService} from "../../../shared/services/auth.service";
import {InternauteService} from "../../../shared/services/internaute.service";
import {finalize, first} from "rxjs";
import {NzMessageService} from "ng-zorro-antd/message";

@Component({
  selector: 'app-user-update-informations',
  templateUrl: './user-update-informations.component.html',
  styleUrls: ['./user-update-informations.component.scss']
})
export class UserUpdateInformationsComponent implements OnInit {
  user: Internaute = new Internaute()
  userForUpdate: Internaute = new Internaute()

  loading = false

  constructor(
    private readonly authSrv: AuthService,
    private readonly internauteSrv: InternauteService,
    private readonly messageSrv: NzMessageService,
  ) {
  }

  ngOnInit() {
    this.userForUpdate.currentPassword = '';
    this.userForUpdate.plainPassword = '';
    this.userForUpdate.passwordConfirm = '';
    this.fetchCurrentUser();
  }

  private fetchCurrentUser() {
    this
      .authSrv
      .user$
      .subscribe(user => {
        this.user = user
        this.userForUpdate = {...user};
      })
  }

  update() {
    this.loading = true;
    this
      .internauteSrv
      .update(this.userForUpdate)
      .pipe(
        first(),
        finalize(() => this.loading = false)
      ).subscribe(user => {
      this.authSrv.onUserUpdate(user);
      this.messageSrv.success("Vos informations ont été mise à jour.");
      this.userForUpdate.currentPassword = '';
      this.userForUpdate.plainPassword = '';
      this.userForUpdate.passwordConfirm = '';
    })
  }

  updatePassword() {
    if (this.userForUpdate.plainPassword !== this.userForUpdate.passwordConfirm) {
      this.messageSrv.error('Les mots de passe ne concordent pas.');
      return;
    }

    this.update();
  }
}
