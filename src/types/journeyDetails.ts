export interface Facility {
  type: string
}

export interface TrainPart {
  stockIdentifier?: string
  facilities?: string[]
  image?: {
    uri: string
  }
}

export interface StockInfo {
  trainType: string
  numberOfSeats?: number
  numberOfParts?: number
  trainParts?: TrainPart[]
  hasSignificantChange?: boolean
}

export interface JourneyStop {
  id: string
  stop: {
    name: string
    uicCode: string
    lat?: number
    lng?: number
    countryCode?: string
  }
  destination?: string
  status: 'ORIGIN' | 'STOP' | 'DESTINATION' | 'PASSING'
  actualStock?: StockInfo
  plannedStock?: StockInfo
}

export interface JourneyPayload {
  notes?: any[]
  productNumbers?: string[]
  stops: JourneyStop[]
  allowCrowdReporting?: boolean
  source?: string
}

export interface JourneyApiResponse {
  payload: JourneyPayload
}
