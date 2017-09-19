import { IAppState } from '../redux/IAppState';
import { TripQueryRequest } from '../shared/tripQueryRequest';

export const buildTripQueryRequest = (state: IAppState): TripQueryRequest => {
  return {
    originAddress: state.searchOriginAddress,
    originCoords: state.searchOriginCoords,
    destinationAddress: state.searchDestinationAddress,
    destinationCoords: state.searchDestinationCoords,
    time: state.searchDatetime,
    timeTarget: state.searchTimeTarget
  };
};
