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

  // console.log('Data to log:', dataToLog.value); // Log the data as a formatted JSON string
};

const createPost = async () => {
  const postData = {
    name: cvUserData.value.name,
    html: cvUserData.value.html,
    css: cvUserData.value.css
  };

  console.log('Data being sent to API:', JSON.stringify(postData, null, 2)); // Log the formatted JSON data

  try {
    const response = await axios.post('http://104.248.87.162:5000/generate-pdf', postData, {
      headers: {
        'Content-Type': 'application/json',
      },
      responseType: 'arraybuffer'
    });
    console.log('Response from API:', response.data);
    if (response.status === 200) {
      const blob = new Blob([response.data], { type: response.headers['content-type'] });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'cv.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return 200;
    } else {
      console.error('Failed with status:', response.status);
      return 500;
    }
  } catch (error) {
    console.error('Failed to send data to API:', error);
    return 500;
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
