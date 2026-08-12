<template>
    <div class="column-one">
        <p class="product-name">
            {{ listing.product.operatorName }} {{ listing.product.longCategoryName }} 
            <span v-if="'lineNumber' in listing.product && listing.product.lineNumber">
                {{ listing.product.lineNumber }}
            </span>
        </p>
        <template v-if="getDelayInMinutes(listing) > 0">
            <del class="original-time">{{ formatTime(listing.plannedDateTime) }}</del>
            <span class="actual-time-delay">{{ formatTime(listing.actualDateTime) }}</span>
            <span class="delay-badge">+{{ getDelayInMinutes(listing) }}</span>
        </template>

        <template v-else>
            <span class="actual-time">{{ formatTime(listing.plannedDateTime) }}</span>
        </template>
    </div>

    <div class="column-two">
        <div class="route-stations" v-if="routeStations.length">
            <p>via: </p>
            <p v-for="(routeStation, index) in routeStations" :key="index">
                {{ routeStation.mediumName }} 
                <span v-if="index < routeStations.length - 1">-</span>
            </p>
        </div>

        <p class="location">
            <router-link v-if="stationDetails[0]?.country === 'NL'" :to="`/station?code=${stationDetails[0]?.id.code.toLowerCase()}&name=${location.toLowerCase()}`">
                {{ location }}
            </router-link>
            <span v-else>{{ location }}</span>
        </p>

        <div class="responsive-location-view">
            <p class="location">
                <router-link v-if="stationDetails[0]?.country === 'NL'" :to="`/station?code=${stationDetails[0]?.id.code.toLowerCase()}&name=${location.toLowerCase()}`">
                    {{ location }}
                </router-link>
                <span v-else>{{ location }}</span>
            </p>
            <div>
                <template v-if="checkIfPlatformHasChanged(listing)">
                    <del class="original-platform">{{ listing.plannedTrack }}</del>
                    <span class="actual-platform-changed">{{ listing.actualTrack }}</span>
                </template>
                <template v-else>
                    <span class="actual-platform">{{ listing.plannedTrack }}</span>
                </template>
            </div>
        </div>
    </div>

    <div class="column-three">
        <template v-if="checkIfPlatformHasChanged(listing)">
            <del class="original-platform">{{ listing.plannedTrack }}</del>
            <span class="actual-platform-changed">{{ listing.actualTrack }}</span>
        </template>
        <template v-else>
            <span class="actual-platform">{{ listing.plannedTrack }}</span>
        </template>
    </div>
</template>

<script lang="ts">
import type { Arrival } from '@/types/arrivals';
import type { Departure } from '@/types/departures';
import type { StationDetailsItem } from '@/types/stationDetails';
import type { PropType } from 'vue';
import apiService from '@/services/apiService'

export default {
    name: 'ListingElem',
    props: {
        listing: {
            type: Object as PropType<Departure | Arrival>,
            required: true,
        },
    },
    data() {
        return {
            stationDetails: [] as StationDetailsItem[],
        }
    },
    computed: {
        isDeparture(): boolean {
            return 'direction' in this.listing;
        },
        location(): string {
            if (this.isDeparture) {
                return (this.listing as Departure).direction;
            }

            return (this.listing as Arrival).origin;
        },
        routeStations() {
            if ('routeStations' in this.listing && this.listing.routeStations) {
                return this.listing.routeStations;
            }

            return [];
        }
    },
    watch: {
        location: {
            immediate: true,
            async handler(newLocation) {
                if (!newLocation) return;
                try {
                    this.stationDetails = await apiService.getDetailsForStation(newLocation);
                } catch (error) {
                    console.error(`Error fetching station details for ${newLocation}`, error);
                }
            }
        }
    },
    methods: {
        formatTime(dateTimeString: string) {
            if (!dateTimeString) return '';
            const date = new Date(dateTimeString);
            return date.toLocaleTimeString('nl-NL', { hour: '2-digit', minute: '2-digit' });
        },
        getDelayInMinutes(listing: Departure | Arrival) {
            if (!listing.plannedDateTime || !listing.actualDateTime) return 0;

            const planned = new Date(listing.plannedDateTime).getTime();
            const actual = new Date(listing.actualDateTime).getTime();
            
            const diffInMinutes = Math.round((actual - planned) / 60000);
            return diffInMinutes > 0 ? diffInMinutes : 0;
        },
        checkIfPlatformHasChanged(listing: Departure | Arrival) {
            return listing.plannedTrack !== listing.actualTrack;
        },
    }
}
</script>