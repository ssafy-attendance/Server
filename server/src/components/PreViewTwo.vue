<template>
  <div class="button-container-preview">
    <button class="make-button" @click="saveImg()">만들기</button>
  </div>

  <div id="canvas">
    <canvas id="container" @click="findCoord" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
export default {
  created() {
    this.userInput = this.getUserInput;
    this.userInput.signature = this.userInput.name;
  },
  data() {
    return {
      img: '',
      userInput: {
        signature: '',
        detailReason2: ' ',
        detailReason3: '1'
      },
      fontStyleOne: '',
      fontStyleTow: '',
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
        detailReason2: [266, 1116],
        detailReason3: [266, 1161],
        signature: [821, 1116]
      },
      fontStyleTwoCoordinate: {
        currentYear: [436, 1453],
        currentMonth: [558, 1453],
        currentDay: [676, 1453]
      },
      canvas2: null,
      Reason: {
        0: [256, 674.2],
        1: [449, 674.2],
        2: [643, 674.2],
        3: [836, 674.2]
      }
    };
  },

  computed: {
    ...mapGetters('AttendanceVersionTwoStore', ['getUserInput'])
  },
  methods: {
    findCoord(event) {
      const x = event.offsetX;
      const y = event.offsetY;
      console.log(`X 좌표 : ${x}  Y좌표 : ${y}`);
    },
    saveImg() {
      html2canvas(document.querySelector('#container')).then((canvas) => {
        var imgData = canvas.toDataURL('image/png', 1.0);
        var imgWidth = 210;
        var imgHeight = (canvas.height * imgWidth) / canvas.width;
        console.log(imgData);
        var doc = new jsPDF('p', 'mm', 'a4');

        doc.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);

        doc.save(
          this.userInput.attendanceYear.substr(2, 2) +
            this.userInput.attendanceMonth +
            this.userInput.attendanceDay +
            '_출결변경서_' +
            this.userInput.name +
            '[' +
            this.userInput.campus +
            this.userInput.class +
            '반]' +
            '.pdf'
        );
      });
    },
    getLength() {
      const reasonList = this.userInput.detailReason.split("\n");
      console.log(reasonList);

      // 엔터 없이 세 줄 쓴 경우
      if (reasonList[0].length > 46 && reasonList.length == 1) {
        reasonList[2] = reasonList[0].slice(46);
        reasonList[1] = reasonList[0].slice(23, 46);
        reasonList[0] = reasonList[0].slice(0, 23);
      }
      // 첫 줄만 길게 쓴 경우
      else if (reasonList[0].length > 23) {
        // 첫 줄 길고 엔터 쓴 경우
        if (reasonList.length > 1) {
          reasonList[2] = reasonList[1];
          reasonList[1] = reasonList[0].slice(23);
          reasonList[0] = reasonList[0].slice(0, 23);
        }
        // 첫 줄 길고 엔터 안 쓴 경우
        else {
          reasonList[1] = reasonList[0].slice(23);
          reasonList[0] = reasonList[0].slice(0, 23);
        }
      }
      // 첫 줄 짧고 뒤에 길게
      else if (reasonList[1].length > 23) {
        reasonList[2] = reasonList[1].slice(23);
        reasonList[1] = reasonList[1].slice(0, 23);
        console.log("in");
      }
      console.log(reasonList);
      this.userInput.detailReason = reasonList[0];
      this.userInput.detailReason2 = reasonList[1];
      this.userInput.detailReason3 = reasonList[2];
    },
  },
  mounted() {
    // const finalInnerWidth = window.innerWidth;
    // const finalInnerHeight = (window.innerWidth * 4) / 3;
    this.getLength();
    const canvasFirst = document.querySelector('#container');
    const contextFirst = canvasFirst.getContext('2d');
    const imgCheck = new Image();
    imgCheck.src = require('@/assets/AttendVersion2_Image/체크.png');
    canvasFirst.width = 1654 * 0.7;
    canvasFirst.height = 2339 * 0.7;
    this.fontStyleOne = `25px san-serif`;
    this.fontStyleTwo = `bold 37px serif`;
    const img = new Image();

    const signatureImage = new Image();
    const checkSize = canvasFirst.width * 0.015;
    const reasonCoord = this.Reason[this.userInput.reason];
    var signature_x = 0;
    var signature_y = 0;
    const signature_width = 100;
    const signature_height = 80;
    signatureImage.src = this.userInput.signatureUrl;
    // 변경 사유 길어질 시 이미지 변경
    if (
      this.userInput.detailReason &&
      !(this.userInput.detailReason2 && this.userInput.detailReason3)
    ) {
      img.src = require("@/assets/AttendVersion2_Image/출결변경요청서-1.png");
      signature_x = 913;
      signature_y = 1067;
    } else if (
      this.userInput.detailReason &&
      this.userInput.detailReason2 &&
      !this.userInput.detailReason3
    ) {
      img.src = require("@/assets/AttendVersion2_Image/출결변경요청서-2.png");
      // 30자 넘으면 자르고 다음 줄로
      // this.userInput.detailReason2 = this.userInput.detailReason.slice(30);
      // this.userInput.detailReason = this.userInput.detailReason.slice(0, 30);
      // 서명 옆 이름 위치 변경
      this.fontStyleOneCoordinate.signature = [826, 1170];
      // 날짜 위치 변경
      this.fontStyleTwoCoordinate.currentYear = [436, 1458];
      this.fontStyleTwoCoordinate.currentMonth = [558, 1458];
      this.fontStyleTwoCoordinate.currentDay = [676, 1458];
      signature_x = 913;
      signature_y = 1120;
    } else if (
      this.userInput.detailReason &&
      this.userInput.detailReason2 &&
      this.userInput.detailReason3
    ) {
      img.src = require("@/assets/AttendVersion2_Image/출결변경요청서-3.png");
      // this.userInput.detailReason2 = this.userInput.detailReason.slice(30, 60);
      // this.userInput.detailReason3 = this.userInput.detailReason.slice(60);
      // this.userInput.detailReason = this.userInput.detailReason.slice(0, 30);
      this.fontStyleOneCoordinate.signature = [826, 1226];
      // 날짜 위치 변경
      this.fontStyleTwoCoordinate.currentYear = [436, 1435];
      this.fontStyleTwoCoordinate.currentMonth = [558, 1435];
      this.fontStyleTwoCoordinate.currentDay = [676, 1435];
      signature_x = 913;
      signature_y = 1180;
    } else {
      img.src = require('@/assets/AttendVersion2_Image/체크.png');
    }
    img.onload = () => {
      //   const imageWidth = canvasFirst.width;
      //   const imageHeight = canvasFirst.height;
      contextFirst.drawImage(img, 0, 0, canvasFirst.width, canvasFirst.height);
      contextFirst.drawImage(
        signatureImage,
        signature_x,
        signature_y,
        signature_width,
        signature_height
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
        if (this.userInput[key]) {
          contextFirst.fillText(
            this.userInput[key],
            this.fontStyleOneCoordinate[key][0],
            this.fontStyleOneCoordinate[key][1]
          );
        }
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
  }
};
</script>

<style>
@import '@/assets/css/preview.css';
</style>
