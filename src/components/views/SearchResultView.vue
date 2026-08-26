<template>
    <main class="m-search-result-view">
        <section class="srv-content-main">
            <div class="srv-greeting">
                <h2>Zoekresultaten voor "{{ searchQuery }}"</h2>
                <div v-if="searchResults.length === 0">
                    <p>Er zijn geen zoekresultaten gevonden voor: "{{ searchQuery }}", probeer een andere zoekterm</p>
                    <a href="/">Terug naar home</a>
                </div>
                <div v-else class="srv-search-listings">
                    <div class="search-result" v-for="(result, index) in searchResults" :key="index">
                        <router-link :to="`/station?uicCode=${result.UICCode}`">
                            {{ result.namen.lang }}
                        </router-link>
                    </div>
                </div>
            </div>
        </section>
    </main>
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
