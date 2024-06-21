<template>
  <div class="flex items-center justify-center flex-col min-h-screen dark:bg-gray-900">
    <div class="dark:bg-gray-900 p-4 rounded-lg">
      <div class="relative bg-inherit">
        <input type="text" id="username" name="username"
          class="peer bg-transparent h-10 w-72 rounded-lg text-teal-600 placeholder-transparent ring-2 px-2 ring-teal-600 focus:ring-white focus:outline-none focus:border-rose-600"
          placeholder="Type inside me" /><label for="username"
          class="absolute cursor-text left-0 -top-3 text-sm text-teal-600 bg-inherit mx-1 px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-teal-600 peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-white peer-focus:text-sm transition-all">Password</label>
      </div>
    </div>
    <div>
    <input type="file" webkitdirectory directory ref="fileInput" @change="handleFileChange" style="display: none" multiple />
    <button class="custom-btn btn-9 mt-5" @click="triggerFileInput">Upload Folder</button>
    <p v-if="folderName" class="text-white mt-3">Uploaded folder: {{ folderName }}</p>
    <button v-if="jsonObject.name" class="custom-btn btn-9 mt-3" @click="downloadJson">Download JSON</button>
  </div>
  </div>
</template>
<script setup>
import { ref } from 'vue';

// Create a reference for the file input element and reactive variables for the folder name and JSON object
const fileInput = ref(null);
const folderName = ref('');
const jsonObject = ref({ name: '', html: '', css: '' });

// Method to trigger the hidden file input
const triggerFileInput = () => {
  fileInput.value.click();
};

// Method to escape double quotes and handle line breaks
const escapeContent = (content) => {
  return content.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\r?\n/g, '\\n');
};

// Method to handle file change event
const handleFileChange = (event) => {
  const files = Array.from(event.target.files);
  folderName.value = files[0].webkitRelativePath.split('/')[0]; // Extract folder name
  jsonObject.value.name = folderName.value;

  files.forEach((file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      let content = e.target.result;

      // Escape content
      content = escapeContent(content);

      if (file.type === 'text/html') {
        jsonObject.value.html = content;
      } else if (file.type === 'text/css') {
        jsonObject.value.css = content;
      }

      // Check if both html and css are read before logging
      if (jsonObject.value.html && jsonObject.value.css) {
        console.log(JSON.stringify(jsonObject.value, null, 2));
      }
    };
    reader.readAsText(file);
  });
};

// Method to download the JSON object as a file
const downloadJson = () => {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(jsonObject.value, null, 2));
  const downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute("href", dataStr);
  downloadAnchorNode.setAttribute("download", `${jsonObject.value.name}.json`);
  document.body.appendChild(downloadAnchorNode); // Required for Firefox
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
};
</script>


<style>
.custom-btn {
  width: 130px;
  height: 40px;
  padding: 10px 25px;
  border: 2px solid #000;
  font-family: 'Lato', sans-serif;
  font-weight: 500;
  background: rgb(13 148 136);
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  display: inline-block;
}

/* 9 */
.btn-9 {
  color: white;
  z-index: 2;
  transition: all 0.3s ease;
  overflow: hidden;
}

.btn-9:after {
  position: absolute;
  content: ' ';
  z-index: -1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: all 0.3s ease;
}

.btn-9:hover {
  box-shadow:
    4px 4px 6px 0 rgba(255, 255, 255, 0.5),
    -4px -4px 6px 0 rgba(116, 125, 136, 0.2),
    inset -4px -4px 6px 0 rgba(255, 255, 255, 0.5),
    inset 4px 4px 6px 0 rgba(116, 125, 136, 0.3);
  color: black;
}

.btn-9:hover:after {
  -webkit-transform: scale(2) rotate(180deg);
  transform: scale(2) rotate(180deg);
  background: white;
  box-shadow:
    4px 4px 6px 0 rgba(255, 255, 255, 0.5),
    -4px -4px 6px 0 rgba(116, 125, 136, 0.2),
    inset -4px -4px 6px 0 rgba(255, 255, 255, 0.5),
    inset 4px 4px 6px 0 rgba(116, 125, 136, 0.3);
}
</style>
