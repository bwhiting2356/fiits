import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/reducer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  disabled: Observable<boolean>;
  fetching: Observable<boolean>;
  email: Observable<string>;
  password: Observable<string>;

  constructor(
    private authService: AuthService,
    private store: Store<AppState>
  ) { }

  logIn(f: NgForm) {
    this.authService.logInTry(f.value);
  }

  ngOnInit() {
    this.fetching = this.store.select('auth', 'fetching');
    this.disabled = this.store.select('auth').map(auth => {
      return (auth.fetching || (auth.email.length === 0) || (auth.password.length === 0));
    });
    this.email = this.store.select('auth', 'email');
    this.password = this.store.select('auth', 'password');
  }

  emailChange($event) {
    this.authService.emailChange($event);
  }

  passwordChange($event) {
    this.authService.passwordChange($event);
  }
}
