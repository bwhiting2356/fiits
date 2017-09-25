import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Actions, Effect } from '@ngrx/effects';
import { SearchService } from '../../services/search.service';
import {
  SUBMIT_QUERY, SubmitQuery,
} from './search.actions';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';

import { BASE_URL } from '../../../environments/constants';

@Injectable()
export class SearchEffects {
  constructor(
    private http: HttpClient,
    private actions$: Actions,
    private searchService: SearchService,
  ) { }

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
}
