import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { SearchService } from '../../services/search.service';
import { Action } from '@ngrx/store';
import {
  QUERY_ERROR_RECEIVED, QUERY_RESULT_RECEIVED, QueryErrorReceived, QueryResultReceived, SUBMIT_QUERY,
  SubmitQuery
} from './search.actions';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import {parseTripQueryResponse} from '../../services/parseTripQueryResponse';

@Injectable()
export class SearchEffects {
  constructor(
    private http: HttpClient,
    private actions$: Actions,
    private searchService: SearchService,
  ) { }

  @Effect({ dispatch: false }) login$ = this.actions$
    .ofType(SUBMIT_QUERY)
    // .map((action: SubmitQuery) => JSON.stringify(action.payload))
    .switchMap(payload => this.http.post('http://localhost:3000/api/trip-query', payload)
        .map((res: HttpResponse<any>) => {
          if (res['error']) {
            this.searchService.queryErrorReceived(res);
          } else {
            this.searchService.queryResultReceived(res);
          }
        })
        .catch(err => {
          return Observable.of(new QueryErrorReceived(err))
        })
    );
}
