import {TripQueryResponse} from '../shared/tripQueryResponse';

export const parseTripQueryResponse = (res): TripQueryResponse => {
  const tripQueryResponse: TripQueryResponse = {...res,
    departureTime: new Date(res.departureTime),
    reservation1Time: new Date(res.reservation1Time),
    reservation2Time: new Date(res.reservation2Time),
    arrivalTime: new Date(res.arrivalTime),
  };
  console.log("is a date?: ", tripQueryResponse.reservation1Time instanceof Date)
  return tripQueryResponse;
};
