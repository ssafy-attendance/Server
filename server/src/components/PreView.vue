<template>
  <canvas id="container" width="793.76001" height="1122.5601" />
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
    img.src = require("@/assets/AttendVersion1_Image/출결이미지.svg");
    console.log(img.src);
    img.onload = function () {
      context.drawImage(img, 0, 0, 793.76001, 1122.5601);
    };
  },
};
</script>

<style></style>
