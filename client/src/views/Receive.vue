<template>
  <div class="receive-wrapper">
    <div class="title">Receive Files</div>
    <div class="content">
      <div class="header">
        <div>Total {{files.length}} files</div>
        <v-btn @click="download" color="success"> Download</v-btn>
      </div>
      <div class="files">
        <div class="file-name-container">
          <div class="file-name" v-for="(file, ind) in files">
            {{ file }}
            <v-icon @click="delFile(ind)" color="red">mdi-close</v-icon>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import io from "socket.io-client";

export default {
  data() {
    return {
      files: [],
      socket: null,
    };
  },
  methods: {
    delFile(index) {
      this.files.splice(index, 1);
    },
    download() {
      this.files.forEach((file) => {
        window.open(`${process.env.VUE_APP_BACKEND}file/${file}`,"_blank")
      });
    },
  },
  created() {
    this.socket = io(process.env.VUE_APP_BACKEND);

    this.socket.on("message", (data) => {
      this.files = data;
    });
  },
  beforeUnmount() {
    this.socket.disconnect();
  },
};
</script>

<style scoped>
.receive-wrapper {
  width: min(1500px, 90vw);
  margin: auto;
  padding: 40px 0;
}

.title {
  font-size: 20px;
  text-align: center;
}
.header {
  width: min(800px, 90vw);
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 50px;
}

.header button {
  text-transform: capitalize;
}

.files {
  margin-top: 2em;
}

.file-name-container {
  width: min(1200px, 95%);
  margin: auto;
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(250px, 500px));
  justify-content: center;
}

.file-name {
  padding: 15px 10px;
  display: flex;
  justify-content: space-between;
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px -3px;
  border: 1px solid rgb(190, 190, 190);
}
.file-name i {
  cursor: pointer;
}
</style>
