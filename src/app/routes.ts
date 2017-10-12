import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth-guard.service';
import { CurrentTripComponent } from './current-trip/current-trip.component';
import { LoginComponent} from './auth/login/login.component';
import { SignupComponent} from './auth/signup/signup.component';

export const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'help', component: HomeComponent},
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'current-trip', canActivate: [AuthGuard], component: CurrentTripComponent},
  { path: 'reservations', canActivate: [AuthGuard], component: HomeComponent},
  { path: 'payments', canActivate: [AuthGuard], component: HomeComponent},
  { path: 'settings', canActivate: [AuthGuard], component: HomeComponent},

];
