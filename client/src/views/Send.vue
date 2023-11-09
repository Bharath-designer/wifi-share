<template>
  <div class="send-wrapper">
    <div class="container">
      <div class="drag-drop-container">
        <label
          ref="drop-area"
          for="file-input"
          :class="{ active: isFileDragOver }"
          @dragenter="handleDragEnter"
          @dragleave="handleDragLeave"
          @dragover="handleDragOver"
          @drop="handleDrop"
        >
          Drop Files Or Click to select files
        </label>
        <input
          @change="handleFile($event.target.files, $event)"
          hidden
          id="file-input"
          type="file"
          multiple
        />
      </div>
      <div class="row-2">
        <div class="file-name-container">
          <div class="file-name" v-for="(file, ind) in files">
            {{ file.name }}
            <v-icon @click="delFile(ind)" color="red">mdi-close</v-icon>
          </div>
        </div>
      </div>
      <div class="submit-container">
        <v-btn @click="submit" color="info">{{ isLoading ? "Uploading..." :"Send" }}</v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Home",
  data() {
    return {
      isFileDragOver: false,
      files: [],
      isFileSelected: false,
      isLoading: false,
    };
  },
  methods: {
    handleDragEnter(e) {
      this.isFileDragOver = true;
    },
    handleDragLeave(e) {
      this.isFileDragOver = false;
    },

    handleDragOver(e) {
      e.preventDefault();
    },

    handleDrop(e) {
      this.isFileDragOver = false;
      e.preventDefault();

      this.handleFile(e.dataTransfer.files);
    },
    handleFile(files, e) {
      let temp = new DataTransfer();

      Array.prototype.forEach.call(files, (file) => {
        temp.items.add(file);
      });

      this.files = [...this.files, ...temp.files];

      this.isFileSelected = true;
    },
    delFile(ind) {
      let temp = new DataTransfer();
      for (let i = 0; i < this.files.length; i++) {
        if (ind != i) temp.items.add(this.files[i]);
      }
      this.files = temp.files;
    },
    submit() {
      const formData = new FormData();
      this.isLoading = true;
      for (let i = 0; i < this.files.length; i++) {
        formData.append("files", this.files[i]);
      }

      axios
        .post(process.env.VUE_APP_BACKEND+"files", formData)
        .then((res) => {
          alert("Files Sent Successfully");
        })
        .catch((err) => {
          console.log(err.message);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },

  watch: {
    files() {
      if (this.files.length == 0) {
        this.isFileSelected = false;
      }
    },
  },
};
</script>

<style scoped>
.send-wrapper {
  width: 100%;
  height: 100vh;
  height: 100svh;
  padding: 20px;
  background-color: var(--body-bg);
  font-size: 15px;
}

.container {
  width: 100%;
  border-radius: 5px;
  background: white;
  padding: 40px 20px;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: auto;
}

/* Hide the default scrollbar */
::-webkit-scrollbar {
  width: 4px;
  /* Set the width of the scrollbar */
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
  /* Color of the track (gray by default) */
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #ababab;
  /* Color of the handle (gray by default) */
  border-radius: 5px;
  /* Rounded corners */
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
  /* Color on hover */
}

.drag-drop-container {
  margin: 0 auto;
  min-height: 200px;
  border-radius: 5px;
  width: min(700px, 95%);
}

.drag-drop-container label {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  outline: 2px dashed rgb(136, 136, 136);
  transition: 0.1s ease;
  color: rgb(71, 71, 71);
  cursor: pointer;
}

.drag-drop-container label.active {
  /* .drag-drop-container label:hover { */
  outline-offset: -2px;
  outline: 2px dashed rgb(255, 1, 1);
}

.row-2 {
  margin: 30px 0;
  overflow: auto;
  max-height: 100%;
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
.submit-container {
  display: flex;
  justify-content: center;
}

.response-loader {
  display: flex;
  justify-content: center;
}
</style>
