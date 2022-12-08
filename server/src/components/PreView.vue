<template>
  <canvas id="container" width="600" height="800" />
  <div>
    {{ userInput }}
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  created() {
    this.userInput = this.getUserInput;
  },

  data() {
    return {
      context: null,
      userInput: {},
    };
  },

  computed: {
    ...mapGetters(["getUserInput"]),
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
