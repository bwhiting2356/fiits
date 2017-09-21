export interface TimeTarget extends String {
  _polyLineTypeBrand: string;
}

const LEAVE_NOW: TimeTarget = 'Leave now' as any;
const DEPART_AT: TimeTarget = 'Depart at' as any;
const ARRIVE_BY: TimeTarget = 'Arrive by' as any;

export const TimeTargets = {
  LEAVE_NOW,
  DEPART_AT,
  ARRIVE_BY
};


