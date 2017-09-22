import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { SearchService } from '../../services/search.service';
import { Action } from '@ngrx/store';
import {
  SUBMIT_QUERY,
} from './search.actions';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import {parseTripQueryResponse} from '../../services/parseTripQueryResponse';
import { BASE_URL } from '../../../environments/constants';

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
    .switchMap(payload => this.http.post(BASE_URL + 'trip-query', payload)
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
