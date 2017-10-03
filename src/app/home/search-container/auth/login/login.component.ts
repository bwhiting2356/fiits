import { Component } from '@angular/core';
import { NgForm} from '@angular/forms';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private authService: AuthService) { }

  logIn(f: NgForm) {
    this.authService.logInTry(f.value);
  }
}
