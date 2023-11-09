<template>
  <div class="wrapper">
    <div class="container">
      <router-link to="send" class="actions send"> Send </router-link>
      <router-link to="receive" class="actions receive"> Receive </router-link>
    </div>
  </div>
</template>

<script>
export default {

    data() {
        return {
            // deviceName:""
        }
    },
  mounted() {
    //   const randomIdentifier = Math.random().toString(36).substring(2, 8); // Generate a random identifier
    //   this.deviceName = `Device-${randomIdentifier}`.toUpperCase();
      
      
  },
};
</script>

<style scoped>
.wrapper {
  width: 100%;
  height: 100vh;
  height: 100svh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.container {
  display: flex;
  gap: 1em;
  flex-wrap: wrap;
  justify-content: center;
}

.actions {
  width: min(300px, 90vw);
  height: max(100px, 20vh);
  background: blue;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #183d3d;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px,
    rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
  cursor: pointer;
  text-decoration: none;
  user-select: none;
}
.send {
  background: #053b50;
}
</style>
