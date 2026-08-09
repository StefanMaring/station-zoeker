<template>
    <main class="m-station-view">
        <section class="sv-content">
            <div class="sv-station-header">
                <h1>{{ stationNameFormatted(stationName) }}</h1>
            </div>
            <div class="sv-station-departures">
                <StationDepartures :stationCode="stationCode" :stationName="stationName" />
            </div>
        </section>
        <div class="sv-nav-menu">
            <a class="nav-button" href="/"><i class="fas fa-home"></i></a>
            <button title="Refresh de vertrektijden" class="nav-button" @click="reloadPage"><i class="fas fa-sync-alt"></i></button>
        </div>
    </main>
</template>

<script lang="ts">
import StationDepartures from '@/components/Interactive/StationDepartures.vue';

export default {
    name: 'StationDeparturesView',
    components: {
        StationDepartures,
    },
    data() {
        return {
            stationCode: this.$route.query.code as string,
            stationName: this.$route.query.name as string,
        }
    },
    methods: {
        reloadPage() {
            window.location.reload();
        },
        stationNameFormatted(name: string): string {
            return name.split(' ').map(word => {
                return word.split('-').map(subWord => {
                    if(subWord.startsWith("ij")) {
                        return "IJ" + subWord.slice(2);
                    }

                    if(subWord === "a/d") {
                        return "a/d";
                    } else {
                        return subWord.charAt(0).toUpperCase() + subWord.slice(1);
                    }
                }).join('-');
            }).join(' ');
        },
    },
}
</script>