// import { fetch } from 'isomorphic-fetch';
//
// import {
//   SEARCH_FETCH_RESULT,
//   SEARCH_CANCEL_FETCH
// } from './actions';
// import { IAppState } from './store';
// import { TripQueryRequest } from '../shared/tripqueryrequest.model';
//
//
// export const searchParametersChanged = () => (dispatch, getState) => {
//   const state: IAppState = getState();
//
//   if (state.searchOrigin && state.searchDestination) {
//
//     const tripQuery: TripQueryRequest = {
//       searchOriginCoords: state.searchOrigin.coords,
//       searchDestinationCoords: state.searchDestination.coords,
//       searchDatetime: state.searchDatetime,
//       searchTimeTarget: state.searchTimeTarget
//     };
//
//     // TODO: check if new trip query is the same as the old trip query before sending
//     // TODO: throttle events when requests keep changing? Client side or server side?
//
//     console.log(tripQuery);
//
//     dispatch({
//       type: SEARCH_FETCH_RESULT
//     })
//
//   } else {
//     dispatch({
//       type: SEARCH_CANCEL_FETCH
//     })
//   }
// };
