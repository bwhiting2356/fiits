import { Action } from '@ngrx/store';

export const SHOW_NAV = 'SHOW_NAV';
export const CLOSE_NAV = 'CLOSE_NAV';

export class ShowNav implements Action {
  readonly type = SHOW_NAV;
}

export class CloseNav implements Action {
  readonly type = CLOSE_NAV;
}

export type Actions
  = ShowNav
  | CloseNav;
