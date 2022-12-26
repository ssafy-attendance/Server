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
  </div>
</template>

<script>
import savePdf from "@/utils/savePdf";
export default {
  data() {
    return {
      context: null,
      image: "",
      canvas: null,
    };
  },
  props: {
    uploadPicture: Array,
  },
  methods: {
    initCanvas() {
      savePdf.initCanvas(this.canvas, this.context);
    },
    saveImg() {
      savePdf.saveImg();
    },
    uploadImg() {
      console.log("hi");
      console.log(this.$refs.image.files[0]);
      this.image = this.$refs.image.files[0];
      this.image = savePdf.uploadImg(this.image);
      this.$emit("uploadPicture", [this.image]);
    },
    // initCanvas() {
    //   const canvas = document.querySelector("#container");
    //   this.canvas = canvas;
    //   const context = canvas.getContext("2d");
    //   this.context = context;
    //   canvas.width = window.innerWidth;
    //   canvas.height = (window.innerWidth * 4) / 3;
    //   this.canvasWidth = canvas.width;
    //   this.canvasHeight = canvas.height;

    //   const canvasImg2 = new Image();
    //   canvasImg2.src = require("@/assets/AttendVersion1_Image/출결이미지3.svg");
    //   canvasImg2.onload = function () {
    //     context.drawImage(canvasImg2, 0, 0, canvas.width, canvas.height);
    //   };
    // },
    // saveImg() {
    //   html2canvas(document.querySelector("#container")).then(function (canvas) {
    //     var imgData = canvas.toDataURL("image/png", 1.0);
    //     var imgWidth = 210;
    //     var imgHeight = (canvas.height * imgWidth) / canvas.width;

    //     var doc = new jsPDF("p", "mm", "a4");

    //     doc.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);

    //     doc.save("sample.pdf");
    //   });
    // },
    // uploadImg() {
    //   const image = this.$refs["image"].files[0];
    //   const url = URL.createObjectURL(image);
    //   this.image = url;

    //   const material = new Image();
    //   material.src = this.image;
    //   this.$emit("uploadPicture", [this.image]);
    // },
  },
};
</script>

<style>
#container {
  width: 90%;
}
</style>
