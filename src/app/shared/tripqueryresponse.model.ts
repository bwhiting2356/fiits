import { Coords } from './coords.model';

export interface TripQueryResponse {
  startAddress: String;
  startLocation: Coords;
  startTime: Date;

  walkingTime1: String;
  walkingDistance1: String;
  // walkingDirections1Points: Coords[]

  station1Address: String;
  station1Location: Coords;
  station1ReservationStartTime: Date;
  station1ReservationEndTime: Date;
  station1ReservationPrice: 0.50;

  bikeRentalPrice: 0.75;
  bikeTime: String;
  bikeDistance: String;
  // bicyclingDirectionsPoints: Coords[]

  station2Address: String;
  station2Location: Coords;
  station2ReservationStartTime: Date;
  station2ReservationEndTime: Date;
  station2ReservationPrice: number;

  walkingTime2: String;
  walkingDistance2: String;
  // walkingDirections2Points: Coords[]

  endAddress: String;
  endLocation: Coords;
  endTime: Date;
}
