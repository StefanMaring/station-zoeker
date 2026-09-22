<template>
    <div class="journey-details">
        <h3>Rit Details</h3>
        <div class="journey-details-info">
            <p>Alle stops:</p>
            <div class="journey-stops">
                <div v-for="(stop, index) in intermediateStops()" :key="index">
                    <router-link :to="`/station?uicCode=${stop.stop.uicCode}`">
                        {{ stop.stop.name }}
                    </router-link>
                    <span v-if="index < intermediateStops().length - 1"> - </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import type { JourneyPayload } from '@/types/journeyDetails';
import type { PropType } from 'vue';

export default {
    name: 'JourneyDetails',
    props: {
        journeyDetails: {
            type: Object as PropType<JourneyPayload>,
            required: true,
        },
    },
    methods: {
        intermediateStops() {
            let stops = this.journeyDetails.stops;
            return stops.filter(stop => stop.status === 'STOP')
        }
    }
}
</script>