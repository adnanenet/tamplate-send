<template>
    <button @click="sendToApi">Send to API</button>
  </template>
  
  <script setup>
  import { defineProps } from 'vue';
  
  const props = defineProps({
    data: {
      type: Object,
      required: true,
    },
  });
  
  const sendToApi = async () => {
    try {
      const response = await fetch('http://104.248.87.162:5000/generate-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(props.data),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const responseData = await response.json();
      console.log('Response from API:', responseData);
    } catch (error) {
      console.error('Failed to send data to API:', error);
    }
  };
  </script>
  