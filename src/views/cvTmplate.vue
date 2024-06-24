<script setup>
import { onMounted, ref } from 'vue';
import cvUser from '../components/cvUser.vue';

const cvComponentRef = ref(null);

const logHtmlContent = () => {
  if (cvComponentRef.value) {
    const htmlContent = cvComponentRef.value.getHtmlContent();
    console.log(htmlContent);
  }
};

onMounted(() => {
  setTimeout(() => {
    logHtmlContent();
  }, 0); // Ensure this runs after the next tick
});
</script>

<template>

    <cvUser ref="cvComponentRef" />
  
</template>