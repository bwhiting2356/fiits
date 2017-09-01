import { IAppState} from './store';

export function findSearchOriginLat(s: IAppState): number {
  return s.searchOrigin ? s.searchOrigin.coords.lat : undefined;
}
export function findSearchOriginLng(s: IAppState): number {
  return s.searchOrigin ? s.searchOrigin.coords.lng : undefined;
}

export function findSearchDestinationLat(s: IAppState): number {
  return s.searchDestination ? s.searchDestination.coords.lat : undefined;
}

export function findSearchDestinationLng(s: IAppState): number {
  return s.searchDestination ? s.searchDestination.coords.lng : undefined;
}

export function findSearchOriginName(s: IAppState): String {
  return s.searchOrigin ? s.searchOrigin.name : '';
}

export function findSearchDestinationName(s: IAppState): String {
  return s.searchDestination ? s.searchDestination.name : '';
}
