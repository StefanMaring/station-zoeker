<template>
    <main class="m-home-view">
        <section class="hv-content-main">
            <div class="hv-greeting">
                <h1>Station Zoeker</h1>
                <h2>Zoek je station en bekijk de actuele vertrek- en aankomsttijden.</h2>
            </div>
            <div class="hv-search-form">
                <SearchForm />
            </div>
            <div class="hv-suggested-stations">
                <SuggestedStations />
            </div>
        </section>
        <section class="hv-content-sub">
            <div class="hv-favorited-stations">
                <FavoritedStations />
            </div>
        </section>
    </main>
</template>

<script>
import SearchForm from '@/components/Forms/SearchForm.vue'
import SuggestedStations from '@/components/Interactive/SuggestedStations.vue'
import FavoritedStations from '../Interactive/FavoritedStations.vue';

export default {
    name: 'HomeView',
    components: {
        SearchForm,
        SuggestedStations,
        FavoritedStations
    },
}
</script>