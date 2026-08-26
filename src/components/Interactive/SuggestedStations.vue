<template>
    <div class="s-suggested-stations" v-if="station1 && station2 && station3">
        <h4>
            Heb je al eens van <span><a :href="`/station?uicCode=${station1.UICCode}`">{{ station1.namen.lang }}</a></span> gehoord? Of wat dacht je van <span><a :href="`/station?uicCode=${station2.UICCode}`">{{ station2.namen.lang }}</a></span>? 
            En ben je al eens op <span><a :href="`/station?uicCode=${station3.UICCode}`">{{ station3.namen.lang }}</a></span> geweest?
        </h4>
    </div>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import type { Station } from '@/types/stations';

export default {
    name: 'SuggestedStations',
    props: {
        stations: {
            type: Array as PropType<Station[]>,
            required: true,
        }
    },
    data() {
        return {
            station1: null as Station | null,
            station2: null as Station | null,
            station3: null as Station | null,
        }
    },
    async mounted() {
        try {
            const shuffledStations = [...this.stations].sort(() => 0.5 - Math.random());
            const stationsToDisplay = shuffledStations.slice(0,3)

            this.station1 = stationsToDisplay[0] ?? null
            this.station2 = stationsToDisplay[1] ?? null
            this.station3 = stationsToDisplay[2] ?? null
        } catch (error) {
            console.error('Error fetching suggested stations:', error)
        }
    }
}
</script>