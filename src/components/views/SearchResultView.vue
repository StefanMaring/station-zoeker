<template>
    <main class="m-search-result-view">
        <section class="srv-content-main">
            <div class="srv-greeting">
                <h2>Zoekresultaten voor "{{ searchQuery }}"</h2>
            </div>
            <div v-if="searchResults.length === 0" class="srv-no-results">
                    <p>Er zijn geen zoekresultaten gevonden, probeer een andere zoekterm</p>
                    <i class="fas fa-home"></i>
                    <a href="/">Terug naar home</a>
                </div>
                <div v-else class="srv-search-listings">
                    <div class="search-result" v-for="(result, index) in searchResults" :key="index">
                        <i class="fas fa-arrow-right"></i>
                        <router-link :to="`/station?uicCode=${result.UICCode}`">
                            {{ result.namen.lang }}
                        </router-link>
                    </div>
                    <i class="fas fa-home"></i>
                    <a href="/" class="return-to-home">Terug naar home</a>
                </div>
        </section>
    </main>
    <div class="m-search-bg-overlay"></div>
</template>

<script lang="ts">
import apiService from '@/services/apiService';
import type { Station } from '@/types/stations';

export default {
    name: 'SearchResultView.vue',
    data() {
        return {
            searchResults: [] as Station[],
            searchQuery: '',
        }
    },
    async mounted() {
        try {
            const stations = await apiService.getAllStations();
            const searchQuery = String(this.$route.query.q);

            this.searchResults = stations.filter(station => {
                return station.namen.lang.toLowerCase().includes(searchQuery.toLowerCase())
            })

            this.searchQuery = searchQuery;
        } catch {
            
        }
    },
}
</script>
