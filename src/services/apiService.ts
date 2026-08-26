import type { Station, StationsApiResponse } from '../types/stations'
import type { DeparturesPayload, DeparturesApiResponse } from '../types/departures'
import type { ArrivalsPayload, ArrivalsApiResponse } from '@/types/arrivals'
import type { StationDetailsApiResponse, StationDetailsItem } from '@/types/stationDetails'

const STATION_CACHE_KEY = 'stationList'
const ONE_WEEK_IN_MS = 7 * 24 * 60 * 60 * 1000

export const apiService = {
  async getAllStations(): Promise<Station[]> {
    const cached = localStorage.getItem(STATION_CACHE_KEY)

    if (cached) {
      const stationsObj = JSON.parse(cached)
      const cacheAge = Date.now() - new Date(stationsObj.cacheDate).getTime()

      if (cacheAge < ONE_WEEK_IN_MS && stationsObj.stations) {
        return stationsObj.stations
      }
    }

    const response = await fetch('/api/stations', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`Error while fetching all stations: ${response.statusText}`)
    }

    const data: StationsApiResponse = await response.json()
    const stationsObj = {
      cacheDate: Date.now(),
      stations: data.payload,
    }
    localStorage.setItem(STATION_CACHE_KEY, JSON.stringify(stationsObj))
    return data.payload
  },

  async getDeparturesForStation(uicCode: number): Promise<DeparturesPayload> {
    const response = await fetch(`/api/departures?station=${uicCode}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`Error while fetching departures for station: ${response.statusText}`)
    }

    const data: DeparturesApiResponse = await response.json()
    const departures: DeparturesPayload = data.payload

    if (!departures) {
      throw new Error('No departures received from API!')
    }

    return departures
  },

  async getArrivalsForStation(uicCode: number): Promise<ArrivalsPayload> {
    const response = await fetch(`/api/arrivals?station=${uicCode}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`Error while fetching arrivals for station: ${response.statusText}`)
    }

    const data: ArrivalsApiResponse = await response.json()
    const arrivals: ArrivalsPayload = data.payload

    if (!arrivals) {
      throw new Error('No arrivals received from API!')
    }

    return arrivals
  },
  async getDetailsForStation(uicCode?: number, stationName?: string) {
    const params = new URLSearchParams()
    if (uicCode !== undefined) params.append('uicCode', String(uicCode))
    if (stationName) params.append('name', stationName)

    const cacheKey = `station_details_for_${params.toString() || 'unknown'}`
    const cached = sessionStorage.getItem(cacheKey)

    if (cached) {
      const { cachedStationDetails } = JSON.parse(cached)
      return cachedStationDetails
    }

    const response = await fetch(`/api/station-details?${params.toString()}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`Error while fetching details for station: ${response.statusText}`)
    }

    const data: StationDetailsApiResponse = await response.json()
    const stationDetailsItems: StationDetailsItem[] = data.payload

    if (!stationDetailsItems) {
      throw new Error('No station details received from API!')
    }

    sessionStorage.setItem(
      cacheKey,
      JSON.stringify({
        cachedStationDetails: stationDetailsItems,
      }),
    )

    return stationDetailsItems
  },
}

export default apiService
