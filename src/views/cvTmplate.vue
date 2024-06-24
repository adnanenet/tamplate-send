<script setup>
import { ref, onMounted } from 'vue';
import cvUser from '@/components/cvUser.vue';

const cvComponentRef = ref(null);

onMounted(() => {
  // No additional logging here to avoid duplicates
});
</script>

<template>
  <cvUser ref="cvComponentRef" />
</template>
