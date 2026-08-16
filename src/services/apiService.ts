import type { Station, StationsApiResponse } from '../types/stations'
import type { DeparturesPayload, DeparturesApiResponse } from '../types/departures'
import type { ArrivalsPayload, ArrivalsApiResponse } from '@/types/arrivals'
import type { StationDetailsApiResponse, StationDetailsItem } from '@/types/stationDetails'

export const apiService = {
  async getRandomStationsForHomepage(): Promise<Station[]> {
    const response = await fetch('/api/stations', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`Error while fetching random stations: ${response.statusText}`)
    }

    const data: StationsApiResponse = await response.json()
    const stations = data.payload

    if (!stations || stations.length < 2) {
      throw new Error('Number of received stations was to small!')
    }

    const selectedStations: Station[] = []

    const index1 = Math.floor(Math.random() * stations.length)
    selectedStations.push(stations[index1]!)

    let index2 = Math.floor(Math.random() * stations.length)
    while (index2 === index1) {
      index2 = Math.floor(Math.random() * stations.length)
    }
    selectedStations.push(stations[index2]!)

    let index3 = Math.floor(Math.random() * stations.length)
    while (index3 === index2 || index3 === index1) {
      index3 = Math.floor(Math.random() * stations.length)
    }
    selectedStations.push(stations[index3]!)

    return selectedStations
  },

  async searchStations(searchQuery: string): Promise<Station[]> {
    const response = await fetch(
      `/api/stations?q=${encodeURIComponent(searchQuery)}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      },
    )

    if (!response.ok) {
      throw new Error(`Error while fetching stations: ${response.statusText}`)
    }

    const data: StationsApiResponse = await response.json()
    const stations: Station[] = data.payload

    if (!stations) {
      throw new Error('No stations received from API!')
    }

    return stations
  },

  async getDeparturesForStation(stationCode: string): Promise<DeparturesPayload> {
    const response = await fetch(`/api/departures?station=${stationCode}`, {
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

  async getArrivalsForStation(stationCode: string): Promise<ArrivalsPayload> {
    const response = await fetch(
      `/api/arrivals?station=${stationCode}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      },
    )

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

  // StationIdentifier can be the station code "gvc" or "rtd" or the name "Den Haag Centraal"
  async getDetailsForStation(stationIdentifier: string) {
    const cacheKey = `station_details_for_${stationIdentifier.toLowerCase()}`
    const cached = sessionStorage.getItem(cacheKey)

    if (cached) {
      const { cachedStationDetails } = JSON.parse(cached)
      return cachedStationDetails
    }

    const response = await fetch(
      `/api/station-details?q=${encodeURIComponent(stationIdentifier)}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      },
    )

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
