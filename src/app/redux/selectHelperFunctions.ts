import { IAppState} from './store';

export const findSearchOriginLat = (s: IAppState): number => {
  return s.searchOrigin ? s.searchOrigin.coords.lat : undefined;
};

export const findSearchOriginLng = (s: IAppState): number => {
  return s.searchOrigin ? s.searchOrigin.coords.lng : undefined;
};

export const findSearchDestinationLat = (s: IAppState): number => {
  return s.searchDestination ? s.searchDestination.coords.lat : undefined;
};

export const findSearchDestinationLng = (s: IAppState): number => {
  return s.searchDestination ? s.searchDestination.coords.lng : undefined;
};

export const findSearchOriginName = (s: IAppState): String => {
  return s.searchOrigin ? s.searchOrigin.name : '';
};

export const findSearchDestinationName = (s: IAppState): String => {
  return s.searchDestination ? s.searchDestination.name : '';
};

export const findStation1Lat = (s: IAppState): number => {
  return s.searchResult ? s.searchResult.station1.station.lat : undefined;
};

export const findStation1Lng = (s: IAppState): number => {
  return s.searchResult ? s.searchResult.station1.station.lng : undefined;
};

export const findStation2Lat = (s: IAppState): number => {
  return s.searchResult ? s.searchResult.station2.station.lat : undefined;
};

export const findStation2Lng = (s: IAppState): number => {
  return s.searchResult ? s.searchResult.station2.station.lng : undefined;
};

export const findWalkingPoints1 = (s: IAppState): number => {
  return s.searchResult ? s.searchResult.walkingDirections1 : undefined;
};

export const findWalkingPoints2 = (s: IAppState): number => {
  return s.searchResult ? s.searchResult.walkingDirections2 : undefined;
};

export const findBicyclePoints = (s: IAppState): number => {
  return s.searchResult ? s.searchResult.bicyclingDirections : undefined;
};
