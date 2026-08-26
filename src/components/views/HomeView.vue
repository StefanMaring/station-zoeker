<template>
    <main class="m-home-view">
        <section class="hv-content-main">
            <div class="hv-greeting">
                <h1>Station Zoeker</h1>
                <h2>Zoek je station en bekijk de actuele vertrek- en aankomsttijden.</h2>
            </div>
            <div class="hv-search-form">
                <SearchForm :stations="stations" />
            </div>
            <div class="hv-suggested-stations">
                <SuggestedStations v-if="stations.length >= 3" :stations="stations" />
            </div>
        </section>
        <section class="hv-content-sub">
            <div class="hv-favorited-stations">
                <FavoritedStations />
            </div>
        </section>
    </main>
    <div class="m-home-bg-overlay"></div>
</template>

<script lang="ts">
import SearchForm from '@/components/Forms/SearchForm.vue'
import SuggestedStations from '@/components/Interactive/SuggestedStations.vue'
import FavoritedStations from '../Interactive/FavoritedStations.vue';
import apiService from '@/services/apiService';
import type { Station } from '@/types/stations';

export default {
    name: 'HomeView',
    components: {
        SearchForm,
        SuggestedStations,
        FavoritedStations
    },
    data() {
        return {
            stations: [] as Station[]
        }
    },
    async mounted() {
        try {
            this.stations = await apiService.getAllStations();
        } catch (error) {
            console.error('Error fetching listings for station:', error)
        }
    },
}
</script>