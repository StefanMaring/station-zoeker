export type TrainCategoryCode = 'SPR' | 'IC' | 'ICD' | 'ECD' | 'ECC' | 'EST' | string;
export type ArrivalStatus = 'INCOMING' | 'ARRIVED' | 'CANCELLED' | string;
export type MessageStyle = 'INFO' | 'WARNING' | 'CRITICAL' | string;

export interface ProductInfo {
  number: string;
  lineNumber?: string
  categoryCode: TrainCategoryCode;
  shortCategoryName: string;
  longCategoryName: string;
  operatorName: string;
  operatorCode: string;
  type: 'TRAIN' | string;
}

export interface ArrivalMessage {
  message: string;
  style: MessageStyle;
}

export interface Arrival {
  origin: string;
  name: string;
  plannedDateTime: string;
  plannedTimeZoneOffset: number;
  actualDateTime: string;
  actualTimeZoneOffset: number;
  plannedTrack: string;
  actualTrack: string;
  product: ProductInfo;
  trainCategory: TrainCategoryCode;
  cancelled: boolean;
  messages: ArrivalMessage[];
  arrivalStatus: ArrivalStatus;
  delayInSeconds?: number;
  trackChanged?: boolean;
}

export interface DisruptionsLink {
  uri: string;
}

export interface ApiLinks {
  disruptions?: DisruptionsLink;
}

export interface ApiMeta {
  numberOfDisruptions: number;
}

export interface ArrivalsPayload {
  source: string;
  arrivals: Arrival[];
}

export interface ArrivalsApiResponse {
  payload: ArrivalsPayload;
  links?: ApiLinks;
  meta?: ApiMeta;
}