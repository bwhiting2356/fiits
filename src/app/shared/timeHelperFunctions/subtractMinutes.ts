import { subtractSeconds } from './subtractSeconds';

export const subtractMinutes = (time: Date, minutes): Date => {
  return subtractSeconds(time, 60 * minutes)
};

// TODO: use the same code as the server side
