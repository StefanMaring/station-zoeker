<template>
    <div class="s-station-departures">
        <div class="s-departures-result" v-if="departures.length">
            <div class="s-departure-header">
                <p>Tijd / Type</p>
                <p>Route / Eindbestemming</p>
                <p>Platform</p>
            </div>
            <div class="s-departure-result" v-for="(departure, index) in departures" :key="index">
                <div class="column-one">
                    <p class="product-name">{{ departure.product.operatorName }} {{ departure.product.longCategoryName }} <span v-if="departure.product.lineNumber">{{ departure.product.lineNumber }}</span></p>
                    <template v-if="getDelayInMinutes(departure) > 0">
                        <del class="original-time">{{ formatTime(departure.plannedDateTime) }}</del>
                        <span class="actual-time-delay">{{ formatTime(departure.actualDateTime) }}</span>
                        <span class="delay-badge">+{{ getDelayInMinutes(departure) }}</span>
                    </template>

                    <template v-else>
                        <span class="actual-time">{{ formatTime(departure.plannedDateTime) }}</span>
                    </template>
                </div>
                <div class="column-two">
                    <div class="route-stations">
                        <p v-if="departure.routeStations.length">via: </p>
                        <p v-if="departure.routeStations.length" v-for="(routeStation, index) in departure.routeStations" :key="index">
                            {{ routeStation.mediumName }} 
                            <span v-if="index < departure.routeStations.length - 1">-</span>
                        </p>
                    </div>
                    <p class="direction">{{ departure.direction }}</p>
                </div>
                <div class="column-three">
                    <template v-if="checkIfPlatformHasChanged(departure)">
                        <del class="original-platform">{{ departure.plannedTrack }}</del>
                        <span class="actual-platform-changed">{{ departure.actualTrack }}</span>
                    </template>
                    <template v-else>
                        <span class="actual-platform">{{ departure.plannedTrack }}</span>
                    </template>
                </div>
            </div>
        </div>
        <div v-else>Er zijn momenteel geen vertrekkende treinen</div>
    </div>
</template>

<script>
import apiService from '@/services/apiService'

export default {
    name: 'StationDepartures',
    props: {
        stationCode: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            departures: [],
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
    methods: {
        formatTime(dateTimeString) {
            if (!dateTimeString) return '';
            const date = new Date(dateTimeString);
            return date.toLocaleTimeString('nl-NL', { hour: '2-digit', minute: '2-digit' });
        },
        getDelayInMinutes(departure) {
            if (!departure.plannedDateTime || !departure.actualDateTime) return 0;

            const planned = new Date(departure.plannedDateTime).getTime();
            const actual = new Date(departure.actualDateTime).getTime();
            
            const diffInMinutes = Math.round((actual - planned) / 60000);
            return diffInMinutes > 0 ? diffInMinutes : 0;
        },
        checkIfPlatformHasChanged(departure) {
            return departure.plannedTrack !== departure.actualTrack;
        },
    }
}
</script>
