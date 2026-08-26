<template>
    <div class="s-search-form">
        <form autocomplete="off" @submit.prevent>
            <input v-model="searchQuery" @keyup="searchStations" @keyup.enter="goToSearchResults" type="text" placeholder="Zoek je station..." id="station-search-input"/>
        </form>
        <div class="sf-search-results" v-if="filteredStations.length">
            <div class="sf-result-item" v-for="(station, index) in filteredStations" :key="index">
                <a :href="`/station?uicCode=${station.UICCode}`">{{ station.namen.lang }}</a>
            </div>
        </div>
    </div>  
</template>

<script lang="ts">
import type { PropType } from 'vue';
import type { Station } from '@/types/stations';

export default {
    name: 'SearchForm',
    props: {
        stations: {
            type: Array as PropType<Station[]>,
            required: true,
        }
    },
    data() {
        return {
            searchQuery: "",
            filteredStations: [] as Station[],
        }
    },
    methods: {
        searchStations(): void {
            if(this.searchQuery === "") {
                this.filteredStations = [];
                return;
            }

            this.filteredStations = this.stations.filter(station => {
                return station.namen.lang.toLowerCase().includes(this.searchQuery.toLowerCase())
            })
        },
        goToSearchResults() {
            if(this.searchQuery.length < 3) {
                return;
            }

            this.$router.push(`/search?q=${this.searchQuery.toLowerCase()}`);
        },
    },
}
</script>