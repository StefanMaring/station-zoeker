export interface RouteStation {
  uicCode: string;
  mediumName: string;
}

export interface Product {
  number: string;
  lineNumber?: string;
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