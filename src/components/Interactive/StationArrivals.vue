<template>
    <div class="s-station-listings">
        <div class="s-listing-result" v-if="arrivals.length">
            <div class="s-listing-header">
                <p>Tijd / Type</p>
                <p>Afkomstig uit</p>
                <p>Perron / Platform</p>
            </div>
            <div class="s-listing-header-responsive">
                <p>Tijd / Afkomstig uit</p>
                <p>Perron / Platform</p>
            </div>
            <div class="s-listing-row" :class="arrival.messages.length > 0 ? 's-listing-result-with-message' : ''" v-for="(arrival, index) in arrivals" :key="index">
                <ArrivalElem :arrival="arrival" />
                <ArrivalMessages :messages="arrival.messages" v-if="arrival.messages.length > 0" />
            </div>
        </div>
        <div class="s-no-listings" v-else>Er zijn momenteel geen binnenkomende treinen op dit station.</div>
    </div>
</template>

<script lang="ts">
import apiService from '@/services/apiService';
import type { Arrival } from '@/types/arrivals';
import ArrivalElem from './ArrivalElem.vue';
import ArrivalMessages from './ArrivalMessages.vue';

export default {
    name: 'StationArrivals',
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
        ArrivalElem,
        ArrivalMessages,
    },
    data() {
        return {
            arrivals: [] as Arrival[],
        }
    },
    async mounted() {
        try {
            const arrivals = await apiService.getArrivalsForStation(this.$props.stationCode);
            this.arrivals = arrivals.arrivals;
        } catch (error) {
            console.error('Error fetching arrivals for station:', error)
        }
    },
}
</script>