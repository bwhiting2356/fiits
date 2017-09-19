import { Coords } from './coords';
import { DistanceData } from './distanceData';

export interface TripQueryResponse {
  originAddress?: string;
  originCoords?: Coords
  departureTime?: Date;

  walking1Points?: Coords[];
  walking1Distance?: DistanceData;

  station1Coords?: Coords;
  station1Address?: string;
  reservation1Time?: Date;
  reservation1Price?: number

  bicyclingPoints?: Coords[];
  bicyclingDistance?: DistanceData;
  bicyclingPrice?: number;

  station2Coords?: Coords;
  station2Address?: string;
  reservation2Time?: Date;
  reservation2Price?: number;

  walking2Points?: Coords[];
  walking2Distance?: DistanceData;

  destinationAddress?: string;
  destinationCoords?: Coords;
  arrivalTime?: Date;
}
