<template>
    <div class="s-station-departures">
        <div class="s-departures-result" v-if="departures.length">
            <div class="s-departure-header">
                <p>Tijd / Type</p>
                <p>Route / Eindbestemming</p>
                <p>Perron / Platform</p>
            </div>
            <div class="s-departure-header-responsive">
                <p>Tijd / Eindbestemming</p>
                <p>Perron / Platform</p>
            </div>
            <div class="s-departure-result" :class="departure.messages.length > 0 ? 's-departure-result-with-message' : ''" v-for="(departure, index) in departures" :key="index">
                <DepartureElem :departure="departure" />
                <DepartureMessages :messages="departure.messages" v-if="departure.messages.length > 0" />
            </div>
        </div>
        <div class="s-no-departures" v-else>Er zijn momenteel geen vertrekkende treinen op dit station.</div>
    </div>
</template>

<script lang="ts">
import apiService from '@/services/apiService'
import DepartureElem from './DepartureElem.vue'
import DepartureMessages from './DepartureMessages.vue'
import type { Departure } from '@/types/departures'

export default {
    name: 'StationDepartures',
    props: {
        stationCode: {
            type: String,
            required: true,
        },
        stationName: {
            type: String,
            required: true,
        },
    },
    components: {
        DepartureElem,
        DepartureMessages,
    },
    data() {
        return {
            departures: [] as Departure[],
        }
    },
    async mounted() {
        try {
            const departures = await apiService.getDeparturesForStation(this.$props.stationCode);
            this.departures = departures.departures;
        } catch (error) {
            console.error('Error fetching departures for station:', error)
        }
    },
}
</script>
