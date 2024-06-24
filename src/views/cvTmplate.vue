<template>
  <div>
    <cvUser ref="cvUserComponent" />
    <SendButton :data="cvUserData" />
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue';
import cvUser from '../components/cvUser.vue';
import SendButton from '../components/SendButton.vue';

const cvUserComponent = ref(null);
const cvUserData = ref({});

onMounted(async () => {
  await nextTick(); // Ensure that cvUser component is mounted
  cvUserData.value = cvUserComponent.value.data;
});
</script>
