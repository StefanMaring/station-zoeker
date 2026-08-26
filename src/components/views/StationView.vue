<template>
    <main class="m-station-view">
        <section class="sv-content sv-content-loading" v-if="isLoading">
            <div>
                <p>Laden...</p>
            </div>
        </section>
        <section class="sv-content sv-content-404" v-else-if="!stationDetails">
            <div>
                <h1>Error 404: Dit station is niet gevonden, probeer een ander station.</h1>
                <i class="fas fa-home"></i>
                <a href="/">Terug naar home</a>
            </div>
        </section>
        <section class="sv-content" v-else>
            <div class="sv-station-header">
                <h1>{{ stationName }}</h1>
                <div class="sv-station-header-right">
                    <div class="sv-nav-menu">
                        <button class="nav-button" title="Terug naar home">
                            <a href="/"><i class="fas fa-home"></i></a>
                        </button>
                        <button class="nav-button" @click="reloadPage" title="Refresh de vertrektijden">
                            <i class="fas fa-sync-alt"></i>
                        </button>
                        <button class="nav-button" @click="isViewingDepartures = !isViewingDepartures" :title="isViewingDepartures ? 'Bekijk de aankomsttijden' : 'Bekijk de vertrektijden'">
                            <i :class="isViewingDepartures ? 'fa-solid fa-right-from-bracket' : 'fa-solid fa-right-to-bracket'"></i>
                        </button>
                        <button class="nav-button" @click="toggleFavorites()" :title="isStationFavorited() ? 'Verwijder dit station uit je favorieten' : 'Sla dit station op in je favorieten'">
                            <i :class="isStationFavorited() ? 'fa-solid fa-star' : 'fa-regular fa-star'"></i>
                        </button>
                    </div>
                </div>
            </div>
            <div class="sv-station-board">
                <StationListings :uicCode="uicCode" :isViewingDepartures="isViewingDepartures" />
            </div>
        </section>
    </main>
</template>

<script lang="ts">
import type { FavoritedStation, FavoritedStations } from '@/types/favorites.ts';
import type { StationDetailsItem } from '@/types/stationDetails.ts';
import StationListings from '../Interactive/StationListings.vue';
import apiService from '@/services/apiService'

export default {
    name: 'StationDeparturesView',
    components: {
        StationListings,
    },
    data() {
        return {
            uicCode: Number(this.$route.query.uicCode as string),
            stationDetails: null as StationDetailsItem | null,
            stationName: '' as string,
            isViewingDepartures: true,
            isLoading: true,
        }
    },
    async mounted() {
        this.stationDetails = await this.getDetailsForCurrentStation(this.uicCode);
        this.stationName = this.stationDetails?.names?.long ?? '';
        this.isLoading = false;
    },
    methods: {
        async getDetailsForCurrentStation(uicCode: number): Promise<StationDetailsItem | null> {
            try {
                return await apiService.getDetailsForStation(uicCode);
            } catch (error) {
                console.error(`Error fetching station details for ${uicCode}`, error);
                return null;
            }
        },
        reloadPage() {
            window.location.reload();
        },
        getFavoritedStations(): FavoritedStations | null {
            const favoritesData = localStorage.getItem('favoritedStations');
            return favoritesData ? JSON.parse(favoritesData) : null;
        },
        getFavoritedStationByName(name: string): FavoritedStation | null {
            const favorites = this.getFavoritedStations();

            if(!favorites) {
                return null;
            }

            const favoritedStation: FavoritedStation | undefined = favorites.favoritedStations.find(station => station.name === name);
            return favoritedStation !== undefined ? favoritedStation : null;
        },
        isStationFavorited(): boolean {
            return this.getFavoritedStationByName(this.stationName) !== null;
        },
        addStationToFavorites(): void {
            const currentUrl = window.location.href;

            let favorites = this.getFavoritedStations();

            if(!favorites) {
                favorites = { favoritedStations: [] };
            }

            const favoritedStationObj = {
                name: this.stationName,
                url: currentUrl
            }

            favorites.favoritedStations.push(favoritedStationObj);
            localStorage.setItem('favoritedStations', JSON.stringify(favorites))
        },
        removeStationFromFavorites(): void {
            let favorites = this.getFavoritedStations();

            if(favorites) {
                favorites.favoritedStations = favorites.favoritedStations.filter(station => station.name !== this.stationName);
                localStorage.setItem('favoritedStations', JSON.stringify(favorites))
            }
        },
        toggleFavorites(): void {
            if(this.isStationFavorited()) {
                this.removeStationFromFavorites();
            } else {
                this.addStationToFavorites();
            }

            this.$forceUpdate();
        },
    },
}
</script>