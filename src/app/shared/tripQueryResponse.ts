import { Coords } from './coords';

export interface TripQueryResponse {
  origin: Coords;
  departureTime: Date;

  walkingDirections1: Coords[];

  station1: Coords;
  reservation1StartTime: Date;
  reservation1EndTime: Date;
  reservation1Price: number

  bicyclingPoints: Coords[];
  bicyclingDuration: number;
  bicyclingDistanceText: string;
  bicyclingPrice: number;

  station2: Coords;
  reservation2StartTime: Date;
  reservation2EndTime: Date;
  reservation2Price: Date;

  walkingDirections2: Coords[];
  destination: Coords;
  arrivalTime: Date;
}
