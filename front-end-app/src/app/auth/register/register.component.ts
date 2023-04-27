import {Component, OnInit} from '@angular/core';
import {Internaute} from "../../models/Internaute.model";
import {InternauteService} from "../../shared/services/internaute.service";
import {finalize} from "rxjs";
import {NzMessageService} from "ng-zorro-antd/message";
import {Router} from "@angular/router";
import {AuthService} from "../../shared/services/auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  userType: string = 'customer';
  loading = false;
  internaute = new Internaute();

  constructor(
    private readonly authSrv: AuthService,
    private readonly messageSrv: NzMessageService,
    private readonly router: Router
  ) {
  }

  ngOnInit() {
  }

  register() {
    this.loading = true;
    this.internaute.type = this.userType;
    const self = this;
    this
      .authSrv
      .register(this.internaute)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next(_) {
          self.messageSrv.success('Votre compte a été créé avec succès. Vous pouvez desormais vous connecter.')
          self.router.navigate(['/auth', 'login'])
        }
      })
  }

}
