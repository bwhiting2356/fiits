import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Actions, Effect } from '@ngrx/effects';
import { SearchService } from '../../services/search.service';
import {
  CONFIRM_BOOK, ConfirmBook,
  SUBMIT_QUERY, SubmitQuery,
} from './search.actions';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';

import { BASE_URL } from '../../../environments/constants';

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
      });
    //   .catch(err => {
    //     console.log(err);
    //     return err;
    //   })
    // );

  constructor(
    private http: HttpClient,
    private actions$: Actions,
    private searchService: SearchService,
  ) { }


}
