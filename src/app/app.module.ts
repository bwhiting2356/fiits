import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { JWTInterceptor } from './jwt.interceptor';

import { NgModule } from '@angular/core';
import { BsDropdownModule } from 'ngx-bootstrap';
import { AppComponent } from './app.component';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { reducers } from './store/reducer';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SearchEffects } from './home/store/search.effects';
import { AuthService } from './services/auth.service';
import { AuthEffects } from './services/auth/store/auth.effects';

import { SideNavComponent } from './navigation/side-nav/side-nav.component';
import { RouterModule } from '@angular/router';

import { HomeModule } from './home/home.module';
import { NavLayerComponent } from './navigation/nav-layer/nav-layer.component';
import { CurrentTripComponent } from './current-trip/current-trip.component';
import { AuthGuard } from './auth-guard.service';


import { environment } from '../environments/environment';
import { GMAP_KEY } from '../environments/constants';

import { routes } from './routes';

import { GeolocationService } from './services/geolocation.service';
import { ReverseGeocodeService } from './services/reverse-geocode.service';
import { SearchService } from './services/search.service';
import { MapService } from './services/map.service';
import { PolylineService } from './services/polyline.service';
import { FitboundsService } from './services/fitbounds.service';

import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';

import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { InputComponent } from './input/input.component';
import { CapitalizePipe } from './pipes/capitalize.pipe';



@NgModule({
  declarations: [
    AppComponent,
    SideNavComponent,
    NavLayerComponent,
    CurrentTripComponent,
    LoginComponent,
    SignupComponent,
    InputComponent,
    CapitalizePipe,
  ],
  imports: [
    NgbModule.forRoot(),
    BrowserModule,
    FormsModule,
    StoreModule.forRoot(reducers),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([SearchEffects, AuthEffects]),
    // StoreRouterConnectingModule,
    HttpClientModule,
    BsDropdownModule.forRoot(),
    BrowserAnimationsModule,
    HomeModule,
    RouterModule.forRoot(routes),
    AgmCoreModule.forRoot({
      apiKey: GMAP_KEY,
      libraries: ['places']
    }),
  ],
  providers: [
    GeolocationService,
    ReverseGeocodeService,
    SearchService,
    MapService,
    PolylineService,
    FitboundsService,
    GoogleMapsAPIWrapper,
    AuthService,
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: JWTInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
