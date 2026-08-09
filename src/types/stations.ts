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