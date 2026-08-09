import type { Station, StationsApiResponse } from '../types/stations'
import type { DeparturesPayload, DeparturesApiResponse } from '../types/departures'

export const apiService = {
  async getRandomStationsForHomepage(): Promise<Station[]> {
    const response = await fetch(
      'https://gateway.apiportal.ns.nl/reisinformatie-api/api/v2/stations?countryCodes=NL',
      {
        method: 'GET',
        headers: {
          'Ocp-Apim-Subscription-Key': import.meta.env.VITE_PRIMARY_KEY,
          Accept: 'application/json',
        },
        mode: 'cors',
      },
    )

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
      `https://gateway.apiportal.ns.nl/reisinformatie-api/api/v2/stations?q=${searchQuery}&countryCodes=nl`,
      {
        method: 'GET',
        headers: {
          'Ocp-Apim-Subscription-Key': import.meta.env.VITE_PRIMARY_KEY,
          Accept: 'application/json',
        },
        mode: 'cors',
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
    const response = await fetch(
      `https://gateway.apiportal.ns.nl/reisinformatie-api/api/v2/departures?station=${stationCode}&maxJourneys=10`,
      {
        method: 'GET',
        headers: {
          'Ocp-Apim-Subscription-Key': import.meta.env.VITE_PRIMARY_KEY,
          Accept: 'application/json',
        },
        mode: 'cors',
      },
    )

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
}

export default apiService
