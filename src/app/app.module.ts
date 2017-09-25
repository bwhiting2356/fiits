import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
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
import { LoginComponent } from './home/search-container/login/login.component';
import { AuthService } from './auth/auth.service';
import { AuthEffects } from './auth/store/auth.effects';
import { authReducer } from './auth/store/auth.reducers';
import { SideNavComponent } from './navigation/side-nav/side-nav.component';
import { navReducer } from './navigation/store/nav.reducers';
import { FlashMessageComponent } from './home/search-container/flash-message/flash-message.component';


@NgModule({
  declarations: [
    AppComponent,
    // LoginComponent,
    SideNavComponent,
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
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {}
