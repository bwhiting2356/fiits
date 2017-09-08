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
  return s.searchResult ? s.searchResult.station1Location.lat : undefined;
};

export const findStation1Lng = (s: IAppState): number => {
  return s.searchResult ? s.searchResult.station1Location.lng : undefined;
};

export const findStation2Lat = (s: IAppState): number => {
  return s.searchResult ? s.searchResult.station2Location.lat : undefined;
};

export const findStation2Lng = (s: IAppState): number => {
  return s.searchResult ? s.searchResult.station2Location.lng : undefined;
};
