<template>
    <div class="s-departure-messages">
        <div class="s-departure-message" v-for="(message, index) in messages" :key="index">
            <p :class="message.style === 'WARNING' ? 's-warning-message' : 's-info-message'">
                <i :class="message.style === 'WARNING' ? 'fas fa-warning' : 'fas fa-info-circle'"></i>{{ message.message }}
            </p>
        </div>
    </div>
</template>

<script lang="ts">
import type { DepartureMessage } from '@/types/departures'

export default {
    name: 'DepartureMessages',
    props: {
        messages: {
            type: Array as () => DepartureMessage[],
            required: true,
        },
    },
}
</script>
