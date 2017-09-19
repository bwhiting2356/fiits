import { Coords } from '../shared/coords';
import { IAppState } from './IAppState';

export const findSearchOriginLat = (s: IAppState): number => {
  return s.searchOriginCoords ? s.searchOriginCoords.lat : undefined;
};

export const findSearchOriginLng = (s: IAppState): number => {
  return s.searchOriginCoords ? s.searchOriginCoords.lng : undefined;
};

export const findSearchDestinationLat = (s: IAppState): number => {
  return s.searchDestinationCoords ? s.searchDestinationCoords.lat : undefined;
};

export const findSearchDestinationLng = (s: IAppState): number => {
  return s.searchDestinationCoords ? s.searchDestinationCoords.lng : undefined;
};

export const findStation1Lat = (s: IAppState): number => {
  return s.searchResult ? s.searchResult.station1.lat : undefined;
};

export const findStation1Lng = (s: IAppState): number => {
  return s.searchResult ? s.searchResult.station1.lng : undefined;
};

export const findStation2Lat = (s: IAppState): number => {
  return s.searchResult ? s.searchResult.station2.lat : undefined;
};

export const findStation2Lng = (s: IAppState): number => {
  return s.searchResult ? s.searchResult.station2.lng : undefined;
};

export const findWalkingPoints1 = (s: IAppState): Coords[] => {
  return s.searchResult ? s.searchResult.walkingDirections1 : undefined;
};

export const findWalkingPoints2 = (s: IAppState): Coords[] => {
  return s.searchResult ? s.searchResult.walkingDirections2 : undefined;
};

export const findBicyclePoints = (s: IAppState): Coords[] => {
  return s.searchResult ? s.searchResult.bicyclingPoints : undefined;
};
