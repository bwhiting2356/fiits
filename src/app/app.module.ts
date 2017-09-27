import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { JWTInterceptor } from './jwt.interceptor';
import { NgModule } from '@angular/core';
import { BsDropdownModule } from 'ngx-bootstrap';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { ReservationSearchModule } from './home/reservation-search.module';
import { searchReducer } from './home/store/search.reducers';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SearchEffects } from './home/store/search.effects';
import { LoginComponent } from './home/search-container/auth/login/login.component';
import { AuthService } from './auth/auth.service';
import { AuthEffects } from './auth/store/auth.effects';
import { authReducer } from './auth/store/auth.reducers';
import { SideNavComponent } from './navigation/side-nav/side-nav.component';
import { navReducer } from './navigation/store/nav.reducers';
import { FlashMessageComponent } from './home/flash-message/flash-message.component';
import { SignupComponent } from './home/search-container/auth/signup/signup.component';
import { AuthHeaderComponent } from './home/search-container/auth/auth-header/auth-header.component';
import { AuthContainerComponent } from './home/search-container/auth/auth-container/auth-container.component';



@NgModule({
  declarations: [
    AppComponent,
    // LoginComponent,
    SideNavComponent,
    // AuthContainerComponent,
    // AuthHeaderComponent,
    // SignupComponent,
    // FlashMessageComponent,
    // MenuComponent,
  ],
  imports: [
    NgbModule.forRoot(),
    BrowserModule,
    FormsModule,
    StoreModule.forRoot({ search: searchReducer, auth: authReducer , nav: navReducer}),
    StoreDevtoolsModule.instrument(),
    EffectsModule.forRoot([SearchEffects, AuthEffects]),
    HttpClientModule,
    BsDropdownModule.forRoot(),
    BrowserAnimationsModule,
    ReservationSearchModule,
  ],
  providers: [
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: JWTInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
