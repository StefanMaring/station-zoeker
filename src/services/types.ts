//Station related interfaces
export interface StationName {
  lang: string;
  middel: string;
  kort: string;
}

export interface Station {
  code: string;
  stationType: string;
  EVACode?: string;
  UICCode?: string;
  namen: StationName;
  land: string;
  lat: number;
  lng: number;
  radius?: number;
  middenOostenNamen?: string[];
  [key: string]: unknown;
}

export interface StationsApiResponse {
  payload: Station[];
}

//Departure related interfaces
export interface RouteStation {
  uicCode: string;
  mediumName: string;
}

export interface Product {
  number: string;
  categoryCode: string;
  shortCategoryName: string;
  longCategoryName: string;
  operatorName: string;
  operatorCode: string;
  type: string;
}

export interface DepartureMessage {
  message?: string;
  style?: string;
  [key: string]: unknown;
}

export interface Departure {
  direction: string;
  name: string;
  plannedDateTime: string;
  plannedTimeZoneOffset: number;
  actualDateTime: string;
  actualTimeZoneOffset: number;
  plannedTrack: string;
  actualTrack: string;
  product: Product;
  trainCategory: string;
  cancelled: boolean;
  routeStations: RouteStation[];
  messages: DepartureMessage[];
  departureStatus: 'ON_STATION' | 'INCOMING' | 'DEPARTED' | 'UNKNOWN' | string;
}

export interface DeparturesPayload {
  source: string;
  departures: Departure[];
}

export interface DeparturesApiResponse {
  payload: DeparturesPayload;
}