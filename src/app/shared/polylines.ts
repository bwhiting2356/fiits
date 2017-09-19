export interface PolylineID extends String {
  _polyLineTypeBrand: string;
}

const WALKING_1: PolylineID = 'WALKING_1' as any;
const WALKING_2: PolylineID = 'WALKING_2' as any;
const BICYCLING: PolylineID = 'BICYCLING' as any;

export const Polyline = {
  WALKING_1,
  WALKING_2,
  BICYCLING
};


