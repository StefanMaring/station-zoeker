<template>
    <div class="journey-details">
        <div class="journey-detail journey-stops" v-if="intermediateStopsFromCurrentStation.length > 0">
            via:
            <div v-for="(stop, index) in intermediateStopsFromCurrentStation" :key="index">
                <router-link v-if="stop.stop.countryCode === 'NL'" :to="`/station?uicCode=${stop.stop.uicCode}`">
                    {{ stop.stop.name }}
                </router-link>
                <span v-else>{{ stop.stop.name }}</span>
                <span v-if="index < intermediateStopsFromCurrentStation.length - 1"> - </span>
            </div>
        </div>
        <div class="journey-detail journey-stock-info">
            <p v-if="stockInfo?.trainType !== undefined">Materieel type: {{ stockInfo?.trainType }}</p>
            <p v-if="stockInfo?.trainParts?.[0]?.stockIdentifier && stockInfo.trainParts[0].stockIdentifier !== '0'">
                Treinstellen:
                    <span v-for="(trainPart, index) in stockInfo?.trainParts" :key="index">
                    {{ trainPart.stockIdentifier }}<span v-if="index < (stockInfo?.trainParts?.length ?? 0) - 1">, </span>
                </span>
            </p>
            <p>Ritnummer: {{ trainNumber }}</p>
            <p>Aantal delen: {{ stockInfo?.numberOfParts }}</p>
        </div>
    </div>
</template>

<script lang="ts">
import type { JourneyPayload, JourneyStop, StockInfo } from '@/types/journeyDetails';
import type { PropType } from 'vue';

export default {
    name: 'JourneyDetails',
    props: {
        journeyDetails: {
            type: Object as PropType<JourneyPayload>,
            required: true,
        },
        currentStationUicCode: {
            type: Number,
            required: true,
        },
        trainNumber: {
            type: String,
            required: false,
        },
    },
    computed: {
        intermediateStopsFromCurrentStation(): JourneyStop[] {
            if (!this.journeyDetails?.stops) return [];

            const stops = this.journeyDetails.stops;
            const currentStationIndex = stops.findIndex(
                stop => stop.stop.uicCode === String(this.currentStationUicCode)
            );

            const startIndex = currentStationIndex !== -1 ? currentStationIndex + 1 : 0;
            return stops.slice(startIndex).filter(stop => stop.status === 'STOP');
        },
        stockInfo(): StockInfo | null {
            if (!this.journeyDetails?.stops?.length) return null;
            const firstStopWithStock = this.journeyDetails.stops.find(s => s.actualStock || s.plannedStock);
            return firstStopWithStock?.actualStock || firstStopWithStock?.plannedStock || null;
        }
    }
}
</script>