import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AuthService} from "../../shared/services/auth.service";
import {finalize} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  credentials: { email: string, password: string } = {email: '', password: ''};
  loading = false

  constructor(
    private readonly authSrv: AuthService,
    private readonly router: Router
  ) {
  }


  ngOnInit() {
  }

  login() {
    this.loading = true
    this
      .authSrv
      .login(this.credentials)
      .pipe(finalize(() => this.loading = false))
      .subscribe(_ => this.router.navigate(['/home']))
  }

}
