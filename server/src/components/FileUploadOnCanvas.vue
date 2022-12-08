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
    <canvas id="container" />
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
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    console.log(canvas.width);
    console.log(canvas.height);
    const canvasImg2 = new Image();
    canvasImg2.src = require("@/assets/AttendVersion1_Image/출결이미지-2.png");
    console.log(canvasImg2.src);
    canvasImg2.onload = function () {
      context.drawImage(canvasImg2, 0, 0, canvas.width, canvas.height);
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

      const material = new Image();
      material.src = this.image;
      material.onload = () => {
        let nowWidth = material.width;
        let nowHeight = material.height;
        const maxWidth = 420;
        const maxHeight = 520;
        if (nowWidth > maxWidth) {
          nowHeight = (nowHeight * maxWidth) / nowWidth;
          nowWidth = maxWidth;
        }
        if (nowHeight > maxHeight) {
          nowWidth = (nowWidth * maxHeight) / nowHeight;
          nowHeight = maxHeight;
        }
        this.context.drawImage(
          material,
          50,
          100,
          50 + nowWidth,
          100 + nowHeight
        );
      };
      console.log(this.context);
      console.log(material);
      console.log(material.src);
      this.$emit("uploadPicture", [this.image]);
    },
  },
};
</script>

<style>
#container {
  width: 90%;
}
</style>
