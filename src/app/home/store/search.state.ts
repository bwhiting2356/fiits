import { Coords } from '../../shared/coords';
import { TripQueryResponse } from '../../shared/tripQueryResponse';
import { TimeTarget } from '../../shared/timeTarget';

export interface SearchState {
  origin: {
    address: string;
    coords: Coords;
    fetching: boolean;
    focus: boolean;
  },
  destination: {
    address: string,
    coords: Coords;
    fetching: boolean;
    focus: boolean;
  },
  time: {
    timeTarget: TimeTarget;
    time: Date;
  },
  progress: string;
  flash: {
    message: string;
    clazz: string;
  }
  result: {
    response: TripQueryResponse;
    error: string;
  };
  map: {
    zoomLevel: number;
    center: Coords;
    rendering: boolean;
  }
}
