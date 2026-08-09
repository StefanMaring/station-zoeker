<template>
    <div class="column-one">
        <p class="product-name">{{ arrival.product.operatorName }} {{ arrival.product.longCategoryName }} <span v-if="arrival.product.lineNumber">{{ arrival.product.lineNumber }}</span></p>
        <template v-if="getDelayInMinutes(arrival) > 0">
            <del class="original-time">{{ formatTime(arrival.plannedDateTime) }}</del>
            <span class="actual-time-delay">{{ formatTime(arrival.actualDateTime) }}</span>
            <span class="delay-badge">+{{ getDelayInMinutes(arrival) }}</span>
        </template>

        <template v-else>
            <span class="actual-time">{{ formatTime(arrival.plannedDateTime) }}</span>
        </template>
    </div>
    <div class="column-two">
        <p class="origin">{{ arrival.origin }}</p>
        <div class="responsive-direction-view">
            <p class="origin">{{ arrival.origin }}</p>
            <div>
                <template v-if="checkIfPlatformHasChanged(arrival)">
                    <del class="original-platform">{{ arrival.plannedTrack }}</del>
                    <span class="actual-platform-changed">{{ arrival.actualTrack }}</span>
                </template>
                <template v-else>
                    <span class="actual-platform">{{ arrival.plannedTrack }}</span>
                </template>
            </div>
        </div>
    </div>
    <div class="column-three">
        <template v-if="checkIfPlatformHasChanged(arrival)">
            <del class="original-platform">{{ arrival.plannedTrack }}</del>
            <span class="actual-platform-changed">{{ arrival.actualTrack }}</span>
        </template>
        <template v-else>
            <span class="actual-platform">{{ arrival.plannedTrack }}</span>
        </template>
    </div>
</template>

<script lang="ts">
import type { Arrival } from '@/types/arrivals';
import type { PropType } from 'vue'

export default {
    name: 'ArrivalElem',
    props: {
        arrival: {
            type: Object as PropType<Arrival>,
            required: true,
        },
    },
    methods: {
        formatTime(dateTimeString: string) {
            if (!dateTimeString) return '';
            const date = new Date(dateTimeString);
            return date.toLocaleTimeString('nl-NL', { hour: '2-digit', minute: '2-digit' });
        },
        getDelayInMinutes(arrival: Arrival) {
            if (!arrival.plannedDateTime || !arrival.actualDateTime) return 0;

            const planned = new Date(arrival.plannedDateTime).getTime();
            const actual = new Date(arrival.actualDateTime).getTime();
            
            const diffInMinutes = Math.round((actual - planned) / 60000);
            return diffInMinutes > 0 ? diffInMinutes : 0;
        },
        checkIfPlatformHasChanged(arrival: Arrival) {
            return arrival.plannedTrack !== arrival.actualTrack;
        },
    }
}
</script>
