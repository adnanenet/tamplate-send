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
      <input type="file" @change="onFileChange" accept=".json" />
    <button class="custom-btn btn-9 mt-5" @click="readFile">send</button>
    <pre v-if="jsonData">{{ jsonData }}</pre>
    </div>
  </div>

</template>
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
  content: " ";
  z-index: -1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: all 0.3s ease;
}

.btn-9:hover {
  box-shadow: 4px 4px 6px 0 rgba(255, 255, 255, .5),
    -4px -4px 6px 0 rgba(116, 125, 136, .2),
    inset -4px -4px 6px 0 rgba(255, 255, 255, .5),
    inset 4px 4px 6px 0 rgba(116, 125, 136, .3);
  color: black;
}

.btn-9:hover:after {
  -webkit-transform: scale(2) rotate(180deg);
  transform: scale(2) rotate(180deg);
  background: white;
  box-shadow: 4px 4px 6px 0 rgba(255, 255, 255, .5),
    -4px -4px 6px 0 rgba(116, 125, 136, .2),
    inset -4px -4px 6px 0 rgba(255, 255, 255, .5),
    inset 4px 4px 6px 0 rgba(116, 125, 136, .3);
}
</style>