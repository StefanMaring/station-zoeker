<template>
    <div class="s-search-form">
        <form>
            <input v-model="searchQuery" @keyup="searchStations" type="text" placeholder="Zoek je station..." id="station-search-input"/>
        </form>
        <div class="sf-search-results" v-if="filteredStations.length">
            <div class="sf-result-item" v-for="(station, index) in filteredStations" :key="index">
                <a :href="`/station?code=${station.code.toLowerCase()}`">{{ station.namen.lang }}</a>
            </div>
        </div>
    </div>  
</template>

<script lang="ts">
import apiService from '@/services/apiService';
import type { Station } from '@/types/stations';

export default {
    name: 'SearchForm',
    data() {
        return {
            searchQuery: "",
            filteredStations: [] as Station[],
        }
    },
    methods: {
        async searchStations() {
            if(this.searchQuery === "") {
                this.filteredStations = [];
                return;
            }

            const stations = await apiService.searchStations(this.searchQuery);
            this.filteredStations = stations; 
        },
    },
}
</script>