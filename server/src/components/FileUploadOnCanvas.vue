<template>
  <div class="file-container">
    <input
      type="text"
      id="fileName"
      class="user-input-value"
      placeholder="파일을 선택해주세요."
      readonly="readonly"
    />
    <label for="chooseFile"
      >업로드
      <i class="fa-solid fa-arrow-up-from-bracket"></i>
    </label>
    <form method="post" enctype="multipart/form-data">
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
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
export default {
  data() {
    return {
      context: null,
      image: '',
      canvas: null
    };
  },
  mounted() {
    // this.initCanvas();
  },

  props: {
    uploadPicture: Array
  },
  methods: {
    initCanvas() {
      const canvas = document.querySelector('#container');
      this.canvas = canvas;
      const context = canvas.getContext('2d');
      this.context = context;
      canvas.width = window.innerWidth;
      canvas.height = (window.innerWidth * 4) / 3;
      this.canvasWidth = canvas.width;
      this.canvasHeight = canvas.height;
      console.log(canvas.width);
      console.log(canvas.height);
      const canvasImg2 = new Image();
      canvasImg2.src = require('@/assets/AttendVersion1_Image/출결이미지3.svg');
      console.log(canvasImg2.src);
      canvasImg2.onload = function () {
        context.drawImage(canvasImg2, 0, 0, canvas.width, canvas.height);
      };
    },
    saveImg() {
      html2canvas(document.querySelector('#container')).then(function (canvas) {
        var imgData = canvas.toDataURL('image/png', 1.0);
        var imgWidth = 210;
        var imgHeight = (canvas.height * imgWidth) / canvas.width;

        var doc = new jsPDF('p', 'mm', 'a4');

        doc.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);

        doc.save('sample.pdf');
      });
    },
    uploadImg() {
      // this.initCanvas();
      const image = this.$refs['image'].files[0];
      const url = URL.createObjectURL(image);
      // const canvas = document.querySelector("#container");
      this.image = url;
      console.log('url');
      console.log(url);

      const material = new Image();
      material.src = this.image;
      this.$emit('uploadPicture', [this.image]);
      document.getElementById('fileName').value = image.name;
    }
  }
};
</script>

<style scoped></style>
