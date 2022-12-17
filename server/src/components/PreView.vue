<template>
  <div>
    <button @click="saveImg()">save</button>
  </div>
  <canvas
    id="container"
    width="793.76001"
    height="1122.5601"
    @click="findCoord"
  />

  <canvas id="pictureContainer" width="793.76001" height="1122.5601" />
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
    //첫 번째 장
    const canvasFirst = document.querySelector("#container");
    const contextFirst = canvasFirst.getContext("2d");

    const img = new Image();
    img.src = require("@/assets/AttendVersion1_Image/출결이미지.svg");
    img.onload = () => {
      contextFirst.drawImage(img, 0, 0, 793.76001, 1122.5601);

      contextFirst.font = this.fontStyleOne;

      for (let key in this.fontStyleOneCoordinate) {
        contextFirst.fillText(
          this.userInput[key],
          ...this.fontStyleOneCoordinate[key]
        );
      }

      contextFirst.font = this.fontStyleTwo;

      for (let key in this.fontStyleTwoCoordinate) {
        contextFirst.fillText(
          this.userInput[key],
          ...this.fontStyleTwoCoordinate[key]
        );
      }

      // context.fillText("사유", 236, 490); // 사유
    };

    //두 번째 장
    const canvasSecond = document.querySelector("#pictureContainer");
    const contextSecond = canvasSecond.getContext("2d");

    const canvasImg2 = new Image();
    canvasImg2.src = require("@/assets/AttendVersion1_Image/출결이미지3.svg");
    canvasImg2.onload = function () {
      contextSecond.drawImage(canvasImg2, 0, 0, 793.76001, 1122.5601);
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
    uploadImg() {
      const image = this.userInput.pictureUrl[0];
      console.log(image);
      const material = new Image();

      material.src = this.image;
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
        this.context.drawImage(
          material,
          200,
          200,
          200 + nowWidth,
          200 + nowHeight
        );
      };
      this.$emit("uploadPicture", [this.image]);
    },
  },
};
</script>

<style></style>
