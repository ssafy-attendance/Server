<template>
  <canvas id="container" width="600" height="800" />
</template>

<script>
export default {
  data() {
    return {
      context: null,
    };
  },
  mounted() {
    const canvas = document.querySelector("#container");
    const context = canvas.getContext("2d");
    this.context = context;

    const img = new Image();
    img.src = require("@/assets/AttendVersion1_Image/출결이미지-1.png");
    console.log(img.src);
    img.onload = function () {
      context.drawImage(img, 0, 0, 600, 800);
    };
  },
};
</script>

<style></style>
