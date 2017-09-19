import {Place} from '../shared/place';
import {TripQueryResponse} from '../shared/tripQueryResponse';
import {Coords} from '../shared/coords';

export interface IAppState {
  searchOriginAddress: string;
  searchOriginCoords: Coords
  searchOriginAddressFetching: boolean;
  searchDestinationAddress: string;
  searchDestinationCoords: Coords
  searchDestinationAddressFetching: boolean;
  searchTimeTarget: string;
  searchDatetime: Date;
  searchResult: TripQueryResponse;
  searchProgress: string;
  searchError: string;
  mapZoomLevel: number,
  mapCenterLat: number,
  mapCenterLng: number,
  mapRendering: boolean
}
