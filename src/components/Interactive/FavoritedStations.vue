<template>
    <div class="s-favorited-stations">
        <h3>Jouw favoriete stations</h3>
        <div class="favorited-station-items">
            <div class="favorited-station" v-if="favorits?.favoritedStations && favorits.favoritedStations.length > 0" v-for="(favoritedStation, index) in favorits.favoritedStations" :key="index">
                <i class="fa-solid fa-location-dot"></i>
                <a class="favorited-station-link" :href="favoritedStation.url">{{ favoritedStation.name }}</a>
            </div>
            <p v-else>Je hebt nog geen favorieten toegevoegd.</p>
        </div>
    </div>
</template>

<script lang="ts">
import type { FavoritedStations } from '@/types/favorites';

export default {
    name: 'FavoritedStations',
    data() {
        return {
            favorits: null as FavoritedStations | null,
        }
    },
    created() {
        this.favorits = this.getFavoritedStations();
    },
    methods: {
        getFavoritedStations(): FavoritedStations | null {
            const favoritesData = localStorage.getItem('favoritedStations');
            return favoritesData ? JSON.parse(favoritesData) : null;
        },
    },
}
</script>
