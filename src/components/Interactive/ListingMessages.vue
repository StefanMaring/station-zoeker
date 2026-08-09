<template>
    <div class="s-listing-messages">
        <div class="s-listing-message" v-for="(message, index) in messages" :key="index">
            <p :class="message.style === 'WARNING' ? 's-warning-message' : 's-info-message'">
                <i :class="message.style === 'WARNING' ? 'fas fa-warning' : 'fas fa-info-circle'"></i>{{ message.message }}
            </p>
        </div>
    </div>
</template>

<script lang="ts">
import type { DepartureMessage } from '@/types/departures'
import type { ArrivalMessage } from '@/types/arrivals';

export default {
    name: 'ListingMessages',
    props: {
        messages: {
            type: Array as () => DepartureMessage[] | ArrivalMessage[],
            required: true,
        },
    },
}
</script>
