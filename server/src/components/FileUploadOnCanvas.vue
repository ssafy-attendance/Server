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
    <button @click="saveImg()">save</button>
  </div>
</template>

<script>
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
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
    canvas.height = (window.innerWidth * 4) / 3;
    this.canvasWidth = canvas.width;
    this.canvasHeight = canvas.height;
    console.log(canvas.width);
    console.log(canvas.height);
    const canvasImg2 = new Image();
    canvasImg2.src = require("@/assets/AttendVersion1_Image/출결이미지3.svg");
    console.log(canvasImg2.src);
    canvasImg2.onload = function () {
      context.drawImage(canvasImg2, 0, 0, canvas.width, canvas.height);
    };
  },

  props: {
    uploadPicture: Array,
  },
  methods: {
    saveImg() {
      html2canvas(document.querySelector("#container")).then(function (canvas) {
        var imgData = canvas.toDataURL("image/png", 1.0);
        var imgWidth = 210;
        var imgHeight = (canvas.height * imgWidth) / canvas.width;

        var doc = new jsPDF("p", "mm", "a4");

        doc.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
        doc.save("sample.pdf");
      });
    },
    uploadImg() {
      const image = this.$refs["image"].files[0];
      const url = URL.createObjectURL(image);
      // const canvas = document.querySelector("#container");
      this.image = url;
      const material = new Image();

      material.src = this.image;
      material.onload = () => {
        let nowWidth = material.width;
        let nowHeight = material.height;
        const maxWidth = 1000;
        const maxHeight = 1200;
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
          200,
          200,
          200 + nowWidth,
          200 + nowHeight
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
