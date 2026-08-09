<template>
    <div class="s-suggested-stations" v-if="station1 && station2 && station3">
        <h4>
            Heb je al eens van <span><a :href="`/station?code=${station1.code.toLowerCase()}&name=${station1.namen.lang.toLowerCase()}`">{{ station1.namen.lang }}</a></span> gehoord? Of wat dacht je van <span><a :href="`/station?code=${station2.code.toLowerCase()}&name=${station2.namen.lang.toLowerCase()}`">{{ station2.namen.lang }}</a></span>? 
            En ben je al eens op <span><a :href="`/station?code=${station3.code.toLowerCase()}&name=${station3.namen.lang.toLowerCase()}`">{{ station3.namen.lang }}</a></span> geweest?
        </h4>
    </div>
</template>

<script>
import apiService from '@/services/apiService'

export default {
    name: 'SuggestedStations',
    data() {
        return {
            station1: null,
            station2: null,
            station3: null,
        }
    },
    async mounted() {
        try {
            const stations = await apiService.getRandomStationsForHomepage();
            this.station1 = stations[0]
            this.station2 = stations[1]
            this.station3 = stations[2]
        } catch (error) {
            console.error('Error fetching suggested stations:', error)
        }
    }
}
</script>