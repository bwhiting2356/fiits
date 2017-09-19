import { IAppState } from './IAppState';
import { TimeTarget } from '../shared/timeTarget';
import { ProgressSteps } from '../shared/progressSteps';

export const INITIAL_STATE: IAppState = {
  searchOriginAddress: '',
  searchOriginCoords: undefined,
  searchOriginXShowing: false,
  searchOriginAddressFetching: false,
  searchDestinationAddress: '',
  searchDestinationCoords: undefined,
  searchDestinationXShowing: false,
  searchDestinationAddressFetching: false,
  searchTimeTarget: TimeTarget.LEAVE_NOW,
  searchDatetime: new Date(),
  searchResult: undefined,
  searchProgress: ProgressSteps.NO_SEARCH,
  searchError: '',
  mapZoomLevel: 14,
  mapCenterLat: undefined,
  mapCenterLng: undefined,
  mapRendering: true,
};
