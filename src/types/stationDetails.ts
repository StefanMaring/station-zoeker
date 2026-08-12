export interface StationDetailsId {
  uicCode: string;
  uicCdCode: string;
  evaCode: string;
  cdCode: number;
  code: string;
}

export interface StationDetailsNames {
  long: string;
  medium: string;
  short: string;
  synonyms: string[];
}

export interface StationDetailsLocation {
  lat: number;
  lng: number;
}

export interface StationDetailsNearbyMeLocationId {
  value: string;
  type: string;
}

export interface StationDetailsItem {
  id: StationDetailsId;
  stationType: string;
  names: StationDetailsNames;
  location: StationDetailsLocation;
  tracks: string[];
  hasKnownFacilities: boolean;
  availableForAccessibleTravel: boolean;
  hasTravelAssistance: boolean;
  areTracksIndependentlyAccessible: boolean;
  isBorderStop: boolean;
  country: string;
  radius: number;
  approachingRadius: number;
  startDate: string;
  nearbyMeLocationId: StationDetailsNearbyMeLocationId;
}

export interface StationDetailsApiResponse {
  payload: StationDetailsItem[];
}