<template>
    <div class="s-suggested-stations" v-if="station1 && station2">
        <h4>
            Heb je al eens van <span>{{ station1.namen.lang }}</span> gehoord? Of wat dacht je van <span>{{ station2.namen.lang }}</span>? 
            En ben je al eens op <span>{{ station3.namen.lang }}</span> geweest?
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
    async created() {
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