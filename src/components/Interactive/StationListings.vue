<template>
    <div class="s-station-listings">
        <div class="s-listing-result" v-if="activeListings.length">
            <div class="s-listing-header">
                <p>Tijd / Type</p>
                <p>{{ isViewingDepartures ? 'Route / Eindbestemming' : 'Afkomstig uit' }}</p>
                <p>Perron / Platform</p>
            </div>
            <div class="s-listing-header-responsive">
                <p>{{ isViewingDepartures ? 'Tijd / Eindbestemming' : 'Tijd / Afkomstig uit' }}</p>
                <p>Perron / Platform</p>
            </div>
            <div class="s-listing-row" :class="listing.messages.length > 0 ? 's-listing-result-with-message' : ''" v-for="(listing, index) in activeListings" :key="index">
                <ListingElem :listing="listing" />
                <ListingMessages :messages="listing.messages" v-if="listing.messages.length > 0" />
            </div>
        </div>
        <div class="s-no-listings" v-else>Er zijn momenteel geen {{ isViewingDepartures ? 'vertrekkende' : 'binnenkomende' }} treinen op dit station.</div>
    </div>
</template>

<script lang="ts">
import apiService from '@/services/apiService'
import ListingElem from './ListingElem.vue'
import ListingMessages from './ListingMessages.vue'
import type { Departure } from '@/types/departures'
import type { Arrival } from '@/types/arrivals.ts';

export default {
    name: 'StationListings',
    props: {
        uicCode: {
            type: Number,
            required: true,
        },
        isViewingDepartures: {
            type: Boolean,
            required: true,
        }
    },
    components: {
        ListingElem,
        ListingMessages,
    },
    data() {
        return {
            departures: [] as Departure[],
            arrivals: [] as Arrival[],
        }
    },
    computed: {
        activeListings(): (Departure | Arrival)[] {
            return this.isViewingDepartures ? this.departures : this.arrivals;
        }
    },
    async mounted() {
        try {
            const departures = await apiService.getDeparturesForStation(this.$props.uicCode);
            this.departures = departures.departures;

            const arrivals = await apiService.getArrivalsForStation(this.$props.uicCode);
            this.arrivals = arrivals.arrivals;
        } catch (error) {
            console.error('Error fetching listings for station:', error)
        }
    },
}
</script>
