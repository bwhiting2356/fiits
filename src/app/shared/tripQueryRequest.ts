import { Coords } from './coords';

export interface TripQueryRequest {
  origin: string;
  destination: string;
  time: Date;
  timeTarget: string
}
