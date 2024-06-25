<template>
  <div>
    <cvUser ref="cvUserComponent" @data-loaded="handleDataLoaded" />
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick, toRaw } from 'vue';
import cvUser from '../components/cvUser.vue';

const cvUserComponent = ref(null);
const cvUserData = ref({});
let dataLoaded = false;

const handleDataLoaded = (data) => {
  if (!dataLoaded) { 
    cvUserData.value = toRaw(data); 
    logDataToConsole();
    dataLoaded = true; 
  }
};

const logDataToConsole = () => {
  const dataToLog = {
    name: cvUserData.value.name,
    html: cvUserData.value.html,
    css: cvUserData.value.css,
  };

  console.log('Data to log:', dataToLog); // Log the data to the console
};



onMounted(async () => {
  await nextTick(); // Ensure that cvUser component is mounted
  if (cvUserComponent.value && typeof cvUserComponent.value.loadData === 'function') {
    // Manually trigger data loading after the component is mounted
    cvUserComponent.value.loadData();
  }
});
</script>
