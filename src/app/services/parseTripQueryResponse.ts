import { TripQueryResponse } from '../shared/tripQueryResponse';

export const parseTripQueryResponse = (res): TripQueryResponse => {
  return {...res,
    tripData: { ...res.tripData,
      departureTime: new Date(res.tripData.departureTime),
      reservation1Time: new Date(res.tripData.reservation1Time),
      reservation2Time: new Date(res.tripData.reservation2Time),
      arrivalTime: new Date(res.tripData.arrivalTime)
    }
  };
};
