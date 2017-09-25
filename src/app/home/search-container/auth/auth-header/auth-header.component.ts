import { Component } from '@angular/core';
import { AuthService } from '../../../../auth/auth.service';

@Component({
  selector: 'app-auth-header',
  templateUrl: './auth-header.component.html',
  styleUrls: ['./auth-header.component.css']
})
export class AuthHeaderComponent {
  hideAuth() {
    this.authService.hideAuth();
  }

  constructor(private authService: AuthService) { }
}
