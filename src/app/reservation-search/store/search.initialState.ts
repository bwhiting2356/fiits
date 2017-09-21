import { SearchState } from './search.state';
import { ProgressSteps } from '../../shared/progressSteps';
import { TimeTargets } from '../../shared/timeTarget';

export const searchInitialState: SearchState = {
  origin: {
    address: '',
    coords: undefined,
    fetching: false,
    focus: true
  },
  destination: {
    address: '',
    coords: undefined,
    fetching: false,
    focus: false
  },
  time: {
    time: new Date(),
    timeTarget: TimeTargets.LEAVE_NOW
  },
  progress: ProgressSteps.NO_SEARCH,
  result: {
    response: undefined,
    error: ''
  },
  map: {
    zoomLevel: 14,
    center: undefined,
    rendering: true,
  }
};
