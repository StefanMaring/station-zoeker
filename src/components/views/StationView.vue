<template>
    <main class="m-station-view">
        <section class="sv-content">
            <div class="sv-station-header">
                <h1>Stationsnaam</h1>
            </div>
            <div class="sv-station-departures">
                <StationDepartures :stationCode="this.stationCode" />
            </div>
        </section>
        <div class="sv-nav-menu">
            <a class="nav-button" href="/"><i class="fas fa-home"></i></a>
            <button title="Refresh de vertrektijden" class="nav-button" @click="reloadPage"><i class="fas fa-sync-alt"></i></button>
        </div>
    </main>
</template>

<script>
import StationDepartures from '@/components/Interactive/StationDepartures.vue';

export default {
    name: 'StationDeparturesView',
    components: {
        StationDepartures,
    },
    data() {
        return {
            stationCode: this.$route.params.stationCode,
        }
    },
    methods: {
        reloadPage() {
            window.location.reload();
        }
    },
}
</script>