<template>
  <button @click="saveImg()">save</button>
  <canvas id="container" @click="findCoord" />
</template>
<script>
import { mapGetters } from "vuex";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default {
  created() {
    this.userInput = this.getUserInput;
  },

  data() {
    return {
      context: null,
      userInput: {},
      fontStyleOne: "",
      fontStyleTwo: "",
      fontStyleTwoCoordinate: {
        currentYear: [0.38, 0.844],
        currentMonth: [0.485, 0.844],
        currentDay: [0.585, 0.844],
      },
      fontStyleOneCoordinate: {
        name: [0.32, 0.2293],
        birthday: [0.66, 0.229],
        absentYear: [0.352, 0.273],
        absentMonth: [0.45, 0.273],
        absentDay: [0.53, 0.273],
        absentReason: [0.296, 0.415],
        absentDetail: [0.329, 0.513],
        absentPlace: [0.295, 0.545],
        signature: [0.295, 0.576],
      },
    };
  },

  computed: {
    ...mapGetters(["getUserInput"]),
  },

  mounted() {
    const canvas = document.querySelector("#container");
    const context = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = (window.innerWidth * 4) / 3;

    this.fontStyleOne = `${window.innerWidth / 46}px san-serif`;
    this.fontStyleTwo = `bold ${window.innerWidth / 32}px san-serif`;

    const img = new Image();
    const signatureImage = new Image();
    img.src = require("@/assets/AttendVersion1_Image/출결이미지.svg");
    signatureImage.src = this.userInput.signatureUrl;
    console.log(this.userInput.signatureUrl);
    img.onload = () => {
      const imageWidth = canvas.width * 0.76;
      const imageHeight = canvas.height * 0.526;
      context.drawImage(img, 0, 0, canvas.width, canvas.height);
      context.drawImage(signatureImage, imageWidth, imageHeight);

      context.font = this.fontStyleOne;
      for (let key in this.fontStyleOneCoordinate) {
        context.fillText(
          this.userInput[key],
          this.fontStyleOneCoordinate[key][0] * canvas.width,
          this.fontStyleOneCoordinate[key][1] * canvas.height
        );
        console.log(
          `${key} : ${this.fontStyleOneCoordinate[key][0] * canvas.width} : ${
            this.fontStyleOneCoordinate[key][1] * canvas.height
          }`
        );
      }

      context.font = this.fontStyleTwo;
      for (let key in this.fontStyleTwoCoordinate) {
        context.fillText(
          this.userInput[key],
          this.fontStyleTwoCoordinate[key][0] * canvas.width,
          this.fontStyleTwoCoordinate[key][1] * canvas.height
        );
      }
    };
  },

  methods: {
    findCoord(event) {
      const x = event.offsetX;
      const y = event.offsetY;
      console.log(`X 좌표 : ${x}  Y좌표 : ${y}`);
    },
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
  },
};
</script>

<style></style>
