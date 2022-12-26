<template>
  <div>
    <!-- <form method="post" enctype="multipart/form-data">
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
    </form> -->
    <button @click="saveImg()">save</button>
    <canvas id="container" @click="findCoord" />

    <canvas id="pictureContainer" @click="findCoord" />
  </div>
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
      canvas2: null,
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
    this.canvas2 = canvasSecond;
    const contextSecond = canvasSecond.getContext("2d");
    canvasSecond.width = finalInnerWidth;
    canvasSecond.height = finalInnerHeight;

    const canvasImg2 = new Image();
    canvasImg2.src = require("@/assets/AttendVersion1_Image/출결이미지3.svg");
    canvasImg2.onload = () => {
      contextSecond.drawImage(
        canvasImg2,
        0,
        0,
        canvasSecond.width,
        canvasSecond.height
      );
    };
    // this.canvasSecond
    console.log("this.userInput.pictureUrl", this.userInput.pictureUrl);
    if (this.userInput.pictureUrl) {
      this.initCanvas();
      const image = this.userInput.pictureUrl[0];
      console.log(image);
      const material = new Image();

      material.src = image;
      material.onload = () => {
        console.log("material.onload!!");
        const maxWidth = this.canvas.width * 0.8;
        const maxHeight = this.canvas.height * 0.7;
        let nowWidth = material.width;
        let nowHeight = material.height;
        const minWidth = 500;
        const minHeight = 700;
        console.log(nowWidth);
        console.log(nowHeight);
        console.log(minWidth);
        console.log(minHeight);
        if (nowWidth < minWidth) {
          nowHeight = (nowHeight * minWidth) / nowWidth;
          nowWidth = minWidth;
        }
        if (nowHeight < minHeight) {
          nowWidth = (nowWidth * minHeight) / nowHeight;
          nowHeight = minHeight;
        }
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
          this.canvas.width * 0.075,
          this.canvas.height * 0.12,
          nowWidth,
          nowHeight
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
    initCanvas() {
      const canvas = document.querySelector("#pictureContainer");
      this.canvas = canvas;
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
    saveImg() {
      html2canvas(document.querySelector("#container")).then((canvas) => {
        var imgData = canvas.toDataURL("image/png", 1.0);
        var imgWidth = 210;
        var imgHeight = 297;
        var doc = new jsPDF("p", "mm", "a4");

        doc.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
        doc.addPage();
        doc.addImage(
          this.canvas2.toDataURL("image/png", 1.0),
          "PNG",
          0,
          0,
          imgWidth,
          imgHeight
        );
        doc.save("sample.pdf");
      });
    },
    uploadImg() {
      this.initCanvas();
      console.log("들어왔다");
      const image = this.$refs["image"].files[0];
      const url = URL.createObjectURL(image);
      // const canvas = document.querySelector("#container");
      this.image = url;
      console.log("url");
      console.log(url);

      const material = new Image();
      material.src = this.image;
      material.onload = () => {
        console.log("material.onload!!");
        const maxWidth = this.canvas.width * 0.8;
        const maxHeight = this.canvas.height * 0.7;
        let nowWidth = material.width;
        let nowHeight = material.height;
        const minWidth = 500;
        const minHeight = 700;
        console.log(nowWidth);
        console.log(nowHeight);
        console.log(minWidth);
        console.log(minHeight);
        if (nowWidth < minWidth) {
          nowHeight = (nowHeight * minWidth) / nowWidth;
          nowWidth = minWidth;
        }
        if (nowHeight < minHeight) {
          nowWidth = (nowWidth * minHeight) / nowHeight;
          nowHeight = minHeight;
        }
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
          this.canvas.width * 0.075,
          this.canvas.height * 0.12,
          nowWidth,
          nowHeight
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
* {
  margin: 0;
}
</style>
