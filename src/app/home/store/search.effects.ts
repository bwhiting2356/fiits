import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Actions, Effect } from '@ngrx/effects';
import { SearchService } from '../../services/search.service';
import {
  CONFIRM_BOOK, ConfirmBook, DESTINATION_COORDS_CHANGE, DestinationCoordsChange, ORIGIN_COORDS_CHANGE,
  OriginCoordsChange,
  SUBMIT_QUERY, SubmitQuery,
} from './search.actions';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';

import { BASE_URL } from '../../../environments/constants';
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/of";

@Injectable()
export class SearchEffects {

  @Effect({ dispatch: false }) submitQuery$ = this.actions$
    .ofType(SUBMIT_QUERY)
    .switchMap((action: SubmitQuery) => this.http.post(BASE_URL + 'api/trip-query', action.payload)
      .map((res: HttpResponse<any>) => {
        if (res['error']) {
          this.searchService.queryErrorReceived(res);
        } else {
          this.searchService.queryResultReceived(res);
        }
      })
      .catch(err => {
        console.log(err);
        return err;
      })
    );

  @Effect({ dispatch: false }) originOrDestinationChange$ = this.actions$
    .ofType(ORIGIN_COORDS_CHANGE, DESTINATION_COORDS_CHANGE)
    .switchMap((action: OriginCoordsChange | DestinationCoordsChange) => this.http.post(BASE_URL + 'api/cache-coords', action.payload))
    .catch(err => {
      console.log(err)
      return Observable.of(undefined);
    });
  // TODO: should I handle the response somehow?
  // TODO: I think I'm sending empty addresses to the server when they delete it
  // TODO: debounce, remove duplicates

  @Effect({ dispatch: false }) confirmBook$ = this.actions$
    .ofType(CONFIRM_BOOK)
    .switchMap((action: ConfirmBook) => {
    console.log(action.payload);
    return this.http.post(BASE_URL + 'api/confirm-book', action.payload)
    })
    .map((res: HttpResponse<any>) => {
      if (res['error']) {
        this.searchService.bookingError(res['error']);
      } else {
        this.searchService.bookingSuccess();
      }
    })
    .catch(err => {
      this.searchService.bookingError(err);
      console.log(err);
      return err;
    });

  constructor(
    private http: HttpClient,
    private actions$: Actions,
    private searchService: SearchService,
  ) { }


}
