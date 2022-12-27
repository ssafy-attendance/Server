<template>
  <div id="canvas">
    <canvas id="container" @click="findCoord" />
  </div>
  <div>
    <button @click="saveImg()">save</button>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
// import jsPDF from "jspdf";
// import html2canvas from "html2canvas";
export default {
  created() {
    this.userInput = this.getUserInput;
  },
  data() {
    return {
      userInput: {
        campus: "",
        class: "",
        name: "",
        birth: "",
        reason: "",
        attendanceYear: "",
        attendanceMonth: "",
        attendanceDay: "",
        chAttendanceYear: "",
        chAttendanceMonth: "",
        chAttendanceDay: "",
        attendanceHour: "",
        attendanceMinute: "",
        chAttendanceHour: "",
        chAttendanceMinute: "",
        currentDate: "",
        detailReason: "",
        signatureUrl: "",
      },
      fontStyleOne: "",
      fontStyleTow: "",
      fontStyleOneCoordinate: {
        birthday: [768, 437],
        absentYear: [0.352, 0.273],
        absentMonth: [0.45, 0.273],
        name: [402, 437],
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
  methods: {
    findCoord(event) {
      const x = event.offsetX;
      const y = event.offsetY;
      console.log(`X 좌표 : ${x}  Y좌표 : ${y}`);
    },
  },
  mounted() {
    // const finalInnerWidth = window.innerWidth;
    // const finalInnerHeight = (window.innerWidth * 4) / 3;
    const canvasFirst = document.querySelector("#container");
    const contextFirst = canvasFirst.getContext("2d");
    canvasFirst.width = 1654 * 0.7;
    canvasFirst.height = 2339 * 0.7;
    this.fontStyleOne = `${window.innerWidth / 46}px san-serif`;
    this.fontStyleTwo = `bold ${window.innerWidth / 32}px san-serif`;
    const img = new Image();
    const signatureImage = new Image();
    signatureImage.src = this.userInput.signatureUrl;
    img.src = require("@/assets/AttendVersion2_Image/출결변경요청서-1.png");
    img.onload = () => {
      //   const imageWidth = canvasFirst.width;
      //   const imageHeight = canvasFirst.height;
      contextFirst.drawImage(img, 0, 0, canvasFirst.width, canvasFirst.height);
      for (let key in this.fontStyleOneCoordinate) {
        contextFirst.fillText(
          this.userInput[key],
          this.fontStyleOneCoordinate[key][0] * canvasFirst.width,
          this.fontStyleOneCoordinate[key][1] * canvasFirst.height
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
</style>
