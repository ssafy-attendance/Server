<template>
  <button @click="saveImg()">save</button>

  <canvas
    id="container"
    width="793.76001"
    height="1122.5601"
    @click="findCoord"
  />
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
      fontStyleOne: "14pt sans-serif",
      fontStyleTwo: "20pt sans-serif",
      fontStyleTwoCoordinate: {
        currentYear: [303, 947],
        currentMonth: [386, 947],
        currentDay: [465, 947],
      },
      fontStyleOneCoordinate: {
        name: [262, 258],
        birthday: [530, 258],
        absentYear: [280, 306],
        absentMonth: [355, 306],
        absentDay: [418, 306],
        absentReason: [236, 466],
        absentDetail: [266, 575],
        absentPlace: [240, 612],
        signature: [240, 648],
      },
    };
  },

  computed: {
    ...mapGetters(["getUserInput"]),
  },

  mounted() {
    const canvas = document.querySelector("#container");
    const context = canvas.getContext("2d");
    this.context = context;

    const img = new Image();
    img.src = require("@/assets/AttendVersion1_Image/출결이미지.svg");
    img.onload = () => {
      context.drawImage(img, 0, 0, 793.76001, 1122.5601);

      context.font = this.fontStyleOne;

      for (let key in this.fontStyleOneCoordinate) {
        context.fillText(
          this.userInput[key],
          ...this.fontStyleOneCoordinate[key]
        );
      }

      context.font = this.fontStyleTwo;

      for (let key in this.fontStyleTwoCoordinate) {
        context.fillText(
          this.userInput[key],
          ...this.fontStyleTwoCoordinate[key]
        );
      }

      // context.fillText("사유", 236, 490); // 사유
    };
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

<style></style>
