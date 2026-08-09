<template>
    <main class="m-station-view">
        <section class="sv-content">
            <div class="sv-station-header">
                <h1>{{ stationNameFormatted(stationName) }}</h1>
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
                    </div>
                </div>
            </div>
            <div class="sv-station-board">
                <StationListings :stationCode="stationCode" :stationName="stationName" :isViewingDepartures="isViewingDepartures" />
            </div>
        </section>
    </main>
</template>

<script lang="ts">
import StationListings from '../Interactive/StationListings.vue';

export default {
    name: 'StationDeparturesView',
    components: {
        StationListings,
    },
    data() {
        return {
            stationCode: this.$route.query.code as string,
            stationName: this.$route.query.name as string,
            isViewingDepartures: true,
        }
    },
    methods: {
        reloadPage() {
            window.location.reload();
        },
        stationNameFormatted(name: string): string {
            const SPECIAL_CASES: Record<string, string> = {
                "a/d": "a/d",
                "v": "v",
                "hs": "HS",
                "rai": "RAI",
                "noi": "NOI",
                "arena": "ArenA",
            };

            return name.split(' ').map(word => {
                return word.split('-').map(subWord => {
                    if(subWord.startsWith("ij")) {
                        return "IJ" + subWord.slice(2);
                    }
                    if(SPECIAL_CASES[subWord.toLowerCase()]) {
                        return SPECIAL_CASES[subWord];
                    }

                    return subWord.charAt(0).toUpperCase() + subWord.slice(1);
                }).join('-');
            }).join(' ');
        },
    },
}
</script>