import { Coords } from './coords.model';
import { MapMarkerType } from './mapmarkertype.model';

export interface MapMarker {
  coords: Coords;
  type: MapMarkerType
};
