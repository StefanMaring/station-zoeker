<template>
    <div class="pop-up">
        <div class="pop-up-content">
            <p @click="emitConfirmation()">
                <span><i :class="popUpIcon"></i></span>
                {{ popUpText }}
            </p>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    name: 'PopUp',
    props: {
        popUpText: {
            type: String,
            required: true,
        },
        popUpIcon: {
            type: String,
            required: false,
        }
    },
    methods: {
        emitConfirmation() {
            this.$emit("popUpConfirmed");
        }
    }
}
</script>
