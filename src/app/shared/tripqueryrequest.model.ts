import { Coords } from './coords.model';

export interface TripQueryRequest {
  searchOriginCoords: Coords;
  searchDestinationCoords: Coords;
  searchDatetime: Date;
  searchTimeTarget: String
}
