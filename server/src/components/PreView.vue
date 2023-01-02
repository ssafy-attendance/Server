<template>
  <div>
    <div class="button-container-preview">
      <button class="make-button" @click="saveImg()">만들기</button>
    </div>

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
      absentTime: {
        0: [0.6075, 0.26],
        1: [0.7, 0.26],
        2: [0.7915, 0.26],
      },
      absentCategory: {
        0: [0.205, 0.401],
        1: [0.205, 0.423],
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

    const imgCheck = new Image();
    imgCheck.src = require("@/assets/AttendVersion1_Image/체크.png");

    const img = new Image();
    const signatureImage = new Image();
    img.src = require("@/assets/AttendVersion1_Image/출결이미지-1.png");
    signatureImage.src = this.userInput.signatureUrl;
    img.onload = () => {
      const imageWidth = canvasFirst.width * 0.77;
      const imageHeight = canvasFirst.height * 0.535;
      const checkSize = canvasFirst.width * 0.018;
      const absentTimeCoord = this.absentTime[this.userInput.absentTime];
      const absentCategoryCoord =
        this.absentCategory[this.userInput.absentCategory];

      contextFirst.drawImage(img, 0, 0, canvasFirst.width, canvasFirst.height);
      contextFirst.drawImage(signatureImage, imageWidth, imageHeight);
      contextFirst.drawImage(
        imgCheck,
        absentTimeCoord[0] * canvasFirst.width,
        absentTimeCoord[1] * canvasFirst.height,
        checkSize,
        checkSize
      );
      contextFirst.drawImage(
        imgCheck,
        absentCategoryCoord[0] * canvasFirst.width,
        absentCategoryCoord[1] * canvasFirst.height,
        checkSize,
        checkSize
      );
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
    canvasImg2.src = require("@/assets/AttendVersion1_Image/출결이미지-2.png");
    canvasImg2.onload = () => {
      contextSecond.drawImage(
        canvasImg2,
        0,
        0,
        canvasSecond.width,
        canvasSecond.height
      );
      this.drawMaterial();
    };

    // this.canvasSecond
    // if (this.userInput.pictureUrl) {
    //   this.initCanvas();
    //   const image = this.userInput.pictureUrl[0];
    //   const material = new Image();

    //   material.src = image;
    //   material.onload = () => {
    //     const maxWidth = this.canvas.width * 0.8;
    //     const maxHeight = this.canvas.height * 0.7;

    //     let nowWidth = material.width;
    //     let nowHeight = material.height;

    //     const minWidth = 500;
    //     const minHeight = 700;

    //     if (nowWidth < minWidth) {
    //       nowHeight = (nowHeight * minWidth) / nowWidth;
    //       nowWidth = minWidth;
    //     }
    //     if (nowHeight < minHeight) {
    //       nowWidth = (nowWidth * minHeight) / nowHeight;
    //       nowHeight = minHeight;
    //     }
    //     if (nowWidth > maxWidth) {
    //       nowHeight = (nowHeight * maxWidth) / nowWidth;
    //       nowWidth = maxWidth;
    //     }
    //     if (nowHeight > maxHeight) {
    //       nowWidth = (nowWidth * maxHeight) / nowHeight;
    //       nowHeight = maxHeight;
    //     }

    //     this.context.drawImage(
    //       material,
    //       this.canvas.width * 0.075,
    //       this.canvas.height * 0.12,
    //       nowWidth,
    //       nowHeight
    //     );
    //   };
    // }
  },

  methods: {
    // findCoord(event) {
    //   const x = event.offsetX;
    //   const y = event.offsetY;
    // },
    initCanvas() {
      const canvas = document.querySelector("#pictureContainer");
      this.canvas = canvas;
      const context = canvas.getContext("2d");
      this.context = context;
      canvas.width = window.innerWidth;
      canvas.height = (window.innerWidth * 4) / 3;
      this.canvasWidth = canvas.width;
      this.canvasHeight = canvas.height;

      const canvasImg2 = new Image();
      canvasImg2.src = require("@/assets/AttendVersion1_Image/출결이미지3.svg");

      canvasImg2.onload = function () {
        context.drawImage(canvasImg2, 0, 0, canvas.width, canvas.height);
      };
    },
    drawMaterial() {
      // if (this.userInput.pictureUrl) {
      this.initCanvas();
      const image = this.userInput.pictureUrl[0];
      const material = new Image();

      material.src = image;
      material.onload = () => {
        const maxWidth = this.canvas.width * 0.8;
        const maxHeight = this.canvas.height * 0.7;

        let nowWidth = material.width;
        let nowHeight = material.height;

        const minWidth = 500;
        const minHeight = 700;

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

      const image = this.$refs["image"].files[0];
      const url = URL.createObjectURL(image);

      this.image = url;

      const material = new Image();
      material.src = this.image;
      material.onload = () => {
        const maxWidth = this.canvas.width * 0.8;
        const maxHeight = this.canvas.height * 0.7;

        let nowWidth = material.width;
        let nowHeight = material.height;

        const minWidth = 500;
        const minHeight = 700;

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

      this.$emit("uploadPicture", [this.image]);
    },
  },
};
</script>

<style scoped>
.button-container-preview {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 0 1.5rem 0;
}

.make-button {
  background: var(--preview-button-background);
  width: var(--preview-button-width);
  height: var(--preview-button-height);
  color: var(--preview-button-color);
  border-radius: var(--preview-button-radius);
  border: 0;
}
</style>
