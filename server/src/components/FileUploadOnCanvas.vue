<template>
  <div>
    <form method="post" enctype="multipart/form-data">
      <div>
        <label for="chooseFile"> Click </label>
      </div>
      <input
        ref="image"
        @change="uploadImg()"
        type="file"
        id="chooseFile"
        name="chooseFile"
        accept="image/*"
      />
    </form>
    <canvas id="container" width="600" height="800" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      context: null,
      image: "",
    };
  },
  mounted() {
    const canvas = document.querySelector("#container");
    const context = canvas.getContext("2d");
    this.context = context;

    const canvasImg2 = new Image();
    canvasImg2.src = require("@/assets/AttendVersion1_Image/출결이미지-2.png");
    console.log(canvasImg2.src);
    canvasImg2.onload = function () {
      context.drawImage(canvasImg2, 0, 0, 600, 800);
    };
  },

  props: {
    uploadPicture: Array,
  },
  methods: {
    uploadImg() {
      console.log("들어왔다");
      const image = this.$refs["image"].files[0];
      const url = URL.createObjectURL(image);
      this.image = url;
      console.log("url");
      console.log(url);

      // const material = new Image();
      // material.src = this.image;
      // console.log(this.image);
      // console.log(material);
      const material = new Image();
      // material.src = require("@/assets/AttendVersion1_Image/출결이미지-1.png");
      material.src = this.image;
      material.onload = () => {
        this.context.drawImage(material, 50, 100, 50 + 400, 100 + 500);
      };
      //   const imageContent = document.querySelector("#uploaded-image");
      //   imageContent.style.width = "100%";
      //   imageContent.style.height = "90%";
      console.log(this.context);
      console.log(material);
      console.log(material.src);
      this.$emit("uploadPicture", [this.image]);
    },
  },
};
</script>

<style></style>
