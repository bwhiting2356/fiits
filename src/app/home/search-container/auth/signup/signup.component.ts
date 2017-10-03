import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  constructor(private authService: AuthService) { }

  signUp(f: NgForm) {
    this.authService.signUpTry(f.value);
  }

}
