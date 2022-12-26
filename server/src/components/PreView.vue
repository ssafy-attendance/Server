<template>
  <div>
    <button @click="saveImg()">save</button>
  </div>
  <canvas id="container" @click="findCoord" />

  <canvas id="pictureContainer" />
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
    ...mapGetters("AttendanceVersionOneStore", ["getUserInput"]),
  },

  mounted() {
    const finalInnerWidth = window.innerWidth;
    const finalInnerHeight = (window.innerWidth * 4) / 3;

    const canvasFirst = document.querySelector("#container");
    const contextFirst = canvasFirst.getContext("2d");
    canvasFirst.width = finalInnerWidth;
    canvasFirst.height = finalInnerHeight;

    this.fontStyleOne = `${window.innerWidth / 46}px san-serif`;
    this.fontStyleTwo = `bold ${window.innerWidth / 32}px san-serif`;

    const img = new Image();
    const signatureImage = new Image();
    img.src = require("@/assets/AttendVersion1_Image/출결이미지.svg");
    signatureImage.src = this.userInput.signatureUrl;
    img.onload = () => {
      const imageWidth = canvasFirst.width * 0.76;
      const imageHeight = canvasFirst.height * 0.526;
      contextFirst.drawImage(img, 0, 0, canvasFirst.width, canvasFirst.height);
      contextFirst.drawImage(signatureImage, imageWidth, imageHeight);
      contextFirst.font = this.fontStyleOne;

      for (let key in this.fontStyleOneCoordinate) {
        contextFirst.fillText(
          this.userInput[key],
          this.fontStyleOneCoordinate[key][0] * canvasFirst.width,
          this.fontStyleOneCoordinate[key][1] * canvasFirst.height
        );
      }

      contextFirst.font = this.fontStyleTwo;

      for (let key in this.fontStyleTwoCoordinate) {
        contextFirst.fillText(
          this.userInput[key],
          this.fontStyleTwoCoordinate[key][0] * canvasFirst.width,
          this.fontStyleTwoCoordinate[key][1] * canvasFirst.height
        );
      }
    };

    //두 번째 장
    const canvasSecond = document.querySelector("#pictureContainer");
    const contextSecond = canvasSecond.getContext("2d");
    canvasSecond.width = finalInnerWidth;
    canvasSecond.height = finalInnerHeight;

    const canvasImg2 = new Image();
    canvasImg2.src = require("@/assets/AttendVersion1_Image/출결이미지3.svg");
    canvasImg2.onload = function () {
      contextSecond.drawImage(
        canvasImg2,
        0,
        0,
        canvasSecond.width,
        canvasSecond.height
      );
    };

    if (this.userInput.pictureUrl) {
      const image = this.userInput.pictureUrl[0];
      const material = new Image();

      material.src = image;
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
        contextSecond.drawImage(
          material,
          200,
          200,
          200 + nowWidth,
          200 + nowHeight
        );
      };
    }
  },

  methods: {
    findCoord(event) {
      const x = event.offsetX;
      const y = event.offsetY;
      console.log(`X 좌표 : ${x}  Y좌표 : ${y}`);
    },
    saveImg() {
      html2canvas(document.querySelector("#container"), { scale: 2 }).then(
        function (canvas) {
          var imgData = canvas.toDataURL("image/png", 1.0);
          var imgWidth = 210;
          var imgHeight = (canvas.height * imgWidth) / canvas.width;

          var doc = new jsPDF("p", "mm", "a4");

          doc.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
          doc.save("sample.pdf");
        }
      );
    },
  },
};
</script>

<style>
* {
  margin: 0;
}
</style>
