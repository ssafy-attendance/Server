<template>
  <div class="button-container-preview">
    <button class="make-button" @click="saveImg()">만들기</button>
  </div>

  <div id="canvas">
    <canvas id="container" @click="findCoord" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
export default {
  created() {
    this.userInput = this.getUserInput;
    this.userInput.signature = this.userInput.name;
  },
  data() {
    return {
      img: "",
      userInput: {
        signature: "",
      },
      fontStyleOne: "",
      fontStyleTow: "",
      fontStyleOneCoordinate: {
        campus: [400, 375],
        birth: [780, 446],
        class: [665, 375],
        attendanceYear: [440, 903],
        attendanceMonth: [593, 903],
        attendanceDay: [711, 903],
        attendanceHour: [846, 903],
        attendanceMinute: [979, 903],
        chAttendanceYear: [440, 957],
        chAttendanceMonth: [593, 957],
        chAttendanceDay: [711, 957],
        chAttendanceHour: [846, 957],
        chAttendanceMinute: [979, 957],
        name: [402, 446],
        detailReason: [266, 1061],
        signature: [821, 1116],
      },
      fontStyleTwoCoordinate: {
        currentYear: [436, 1453],
        currentMonth: [558, 1453],
        currentDay: [676, 1453],
      },
      canvas2: null,
      Reason: {
        0: [256, 674.2],
        1: [449, 674.2],
        2: [643, 674.2],
        3: [836, 674.2],
      },
    };
  },

  computed: {
    ...mapGetters("AttendanceVersionTwoStore", ["getUserInput"]),
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
        console.log(imgData);
        var doc = new jsPDF("p", "mm", "a4");

        doc.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);

        doc.save("sample.pdf");
      });
    },
  },
  mounted() {
    // const finalInnerWidth = window.innerWidth;
    // const finalInnerHeight = (window.innerWidth * 4) / 3;

    const canvasFirst = document.querySelector("#container");
    const contextFirst = canvasFirst.getContext("2d");
    const imgCheck = new Image();
    imgCheck.src = require("@/assets/AttendVersion2_Image/체크.png");
    canvasFirst.width = 1654 * 0.7;
    canvasFirst.height = 2339 * 0.7;
    this.fontStyleOne = `25px san-serif`;
    this.fontStyleTwo = `bold 37px serif`;
    const img = new Image();

    const signatureImage = new Image();
    const checkSize = canvasFirst.width * 0.015;
    const reasonCoord = this.Reason[this.userInput.reason];
    signatureImage.src = this.userInput.signatureUrl;
    // 변경 사유 길어질 시 이미지 변경
    // 이미지 별 좌표 설정 필요
    if (this.userInput.detailReason.length < 28) {
      img.src = require("@/assets/AttendVersion2_Image/출결변경요청서-1.png");
    } else if (this.userInput.detailReason.length < 56) {
      img.src = require("@/assets/AttendVersion2_Image/출결변경요청서-2.png");
    } else if (this.userInput.detailReason.length < 84) {
      img.src = require("@/assets/AttendVersion2_Image/출결변경요청서-3.png");
    } else {
      img.src = require("@/assets/AttendVersion2_Image/체크.png");
    }
    img.onload = () => {
      //   const imageWidth = canvasFirst.width;
      //   const imageHeight = canvasFirst.height;
      contextFirst.drawImage(img, 0, 0, canvasFirst.width, canvasFirst.height);
      contextFirst.drawImage(
        signatureImage,
        canvasFirst.width,
        canvasFirst.height
      );
      contextFirst.drawImage(
        imgCheck,
        reasonCoord[0],
        reasonCoord[1],
        checkSize,
        checkSize
      );

      contextFirst.font = this.fontStyleOne;
      for (let key in this.fontStyleOneCoordinate) {
        contextFirst.fillText(
          this.userInput[key],
          this.fontStyleOneCoordinate[key][0],
          this.fontStyleOneCoordinate[key][1]
        );
      }

      contextFirst.font = this.fontStyleTwo;
      for (let key in this.fontStyleTwoCoordinate) {
        contextFirst.fillText(
          this.userInput[key],
          this.fontStyleTwoCoordinate[key][0],
          this.fontStyleTwoCoordinate[key][1]
        );
      }
    };
  },
};
</script>

<style>
#canvas {
  display: flex;
  justify-content: center;
}

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
