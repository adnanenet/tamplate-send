<template>
  <div>
    <cvUser ref="cvUserComponent" @data-loaded="handleDataLoaded" />
    <button @click="createPost">Send to API</button>
    <pre>{{ dataToLog }}</pre>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick, toRaw } from 'vue';
import cvUser from '../components/cvUser.vue';
import axios from 'axios';

const cvUserComponent = ref(null);
const cvUserData = ref({});
const dataToLog = ref(null); // Define dataToLog as a reactive property
let dataLoaded = false;

const handleDataLoaded = (data) => {
  if (!dataLoaded) {
    cvUserData.value = data;
    logDataToConsole();
    dataLoaded = true;
  }
};

const logDataToConsole = () => {
  dataToLog.value = {
    name: cvUserData.value.name,
    html: cvUserData.value.html,
    css: cvUserData.value.css,
  };

  console.log('Data to log:', JSON.stringify(dataToLog.value, null, 2)); // Log the data as a formatted JSON string
};

const createPost = async () => {
  const postData = JSON.stringify({
    name: cvUserData.value.name,
    html: cvUserData.value.html,
    css: cvUserData.value.css
  });

  console.log('Data being sent to API:', postData); // Log the formatted JSON data

  try {
    const response = await axios.post('http://104.248.87.162:5000/generate-pdf', postData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log('Response from API:', response.data);
  } catch (error) {
    console.error('Failed to send data to API:', error);
    if (error.response) {
      console.error('Error response data:', error.response.data);
      console.error('Error response status:', error.response.status);
      console.error('Error response headers:', error.response.headers);
    } else if (error.request) {
      console.error('Error request data:', error.request);
    } else {
      console.error('Error message:', error.message);
    }
    console.error('Error config:', error.config);
  }
};

onMounted(async () => {
  await nextTick(); // Ensure that cvUser component is mounted
  if (cvUserComponent.value && typeof cvUserComponent.value.loadData === 'function') {
    // Manually trigger data loading after the component is mounted
    cvUserComponent.value.loadData();
  }
});
</script>
