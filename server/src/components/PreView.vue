<template>
  <div id="preview">
    <div class="button-container-preview">
      <button class="make-button" @click="saveImg()">PDF로 저장</button>
    </div>
    <canvas id="container" @click="findCoord" />
    <canvas id="pictureContainer" @click="findCoord" />
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default {
  created() {
    this.userInput = this.getUserInput;
    console.log(this.userInput);
  },

  data() {
    return {
      userInput: {},
      fontStyleOne: '',
      fontStyleTwo: '',
      fontStyleTwoCoordinate: {
        currentYear: [0.38, 0.835],
        currentMonth: [0.485, 0.835],
        currentDay: [0.585, 0.835]
      },
      fontStyleOneCoordinate: {
        name: [0.32, 0.2293],
        birthday: [0.66, 0.229],
        absentYear: [0.352, 0.273],
        absentMonth: [0.45, 0.273],
        absentDay: [0.53, 0.273],
        // absentReason: [0.296, 0.415],
        // absentDetail: [0.329, 0.513],
        absentPlace: [0.295, 0.5665],
        signature: [0.295, 0.5975]
      },
      reasonCoordinate: {},
      canvas2: null,
      absentTime: {
        0: [0.6075, 0.26],
        1: [0.7, 0.26],
        2: [0.7915, 0.26]
      },
      absentCategory: {
        0: [0.205, 0.401],
        1: [0.205, 0.4335]
      },
      lineCnt: 1
    };
  },

  computed: {
    ...mapGetters('AttendanceVersionOneStore', ['getUserInput'])
  },

  mounted() {
    const finalInnerWidth = window.innerWidth;
    const finalInnerHeight = (window.innerWidth * 4) / 3;
    // document.querySelector('.preview-pages').style.width =
    // window.innerWdith * 0.9;

    const canvasFirst = document.querySelector('#container');
    const contextFirst = canvasFirst.getContext('2d');
    canvasFirst.width = finalInnerWidth;
    canvasFirst.height = finalInnerHeight;
    this.fontStyleOne = `${window.innerWidth / 46}px san-serif`;
    this.fontStyleTwo = `bold ${window.innerWidth / 32}px san-serif`;

    const imgCheck = new Image();
    imgCheck.src = require('@/assets/AttendVersion1_Image/체크.png');

    const img = new Image();
    const signatureImage = new Image();

    img.src = this.getSrc();
    signatureImage.src = this.userInput.signatureUrl;

    img.onload = () => {
      // const imageWidth = canvasFirst.width * 0.77;
      // const imageHeight = canvasFirst.height * 0.535;
      const checkSize = canvasFirst.width * 0.018;
      var signature_x = canvasFirst.width * 0.84;
      var signature_y = canvasFirst.height * 0.557;
      const signature_width = 0.07 * window.innerWidth;
      const signature_height = 0.035 * ((window.innerWidth * 4) / 3);

      const absentTimeCoord = this.absentTime[this.userInput.absentTime];
      const absentCategoryCoord =
        this.absentCategory[this.userInput.absentCategory];

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

      for (let key in this.reasonCoordinate) {
        contextFirst.fillText(
          this.reasonCoordinate[key][0],
          this.reasonCoordinate[key][1] * canvasFirst.width,
          this.reasonCoordinate[key][2] * canvasFirst.height
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
    const canvasSecond = document.querySelector('#pictureContainer');
    this.canvas2 = canvasSecond;
    const contextSecond = canvasSecond.getContext('2d');
    canvasSecond.width = finalInnerWidth;
    canvasSecond.height = finalInnerHeight;

    const canvasImg2 = new Image();
    canvasImg2.src = require('@/assets/AttendVersion1_Image/출결이미지-2.png');
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
  },

  methods: {
    // findCoord(event) {
    //   const x = event.offsetX;
    //   const y = event.offsetY;
    // },
    getSrc() {
      let category = this.userInput.absentCategory;
      let reason = this.userInput.absentReason.split('\n');
      let isReasonEnter = reason.length > 1 ? true : false;

      let sp = 23;

      let reasonX = 0.296;
      let reasonY = category == 0 ? 0.415 : 0.447;
      let addY = 0.031;
      let blankY = 0.002;

      if (isReasonEnter) {
        //공가/사유에 enter가 있으면
        this.reasonCoordinate.reason1 = [reason[0], reasonX, reasonY];
        this.reasonCoordinate.reason2 = [reason[1], reasonX, reasonY + addY];

        let detailLine = this.getDetailLine(addY);

        this.lineCnt = detailLine;
        this.fontStyleOneCoordinate.absentPlace[1] +=
          (addY + blankY) * detailLine;
        this.fontStyleOneCoordinate.signature[1] +=
          (addY + blankY) * detailLine;

        if (detailLine == 3) {
          this.fontStyleTwoCoordinate.currentYear[1] +=
            blankY * detailLine + addY;
          this.fontStyleTwoCoordinate.currentMonth[1] +=
            blankY * detailLine + addY;
          this.fontStyleTwoCoordinate.currentDay[1] +=
            blankY * detailLine + addY;
        } else {
          this.fontStyleTwoCoordinate.currentYear[1] += blankY * detailLine;
          this.fontStyleTwoCoordinate.currentMonth[1] += blankY * detailLine;
          this.fontStyleTwoCoordinate.currentDay[1] += blankY * detailLine;
        }

        if (category == 0) {
          return require(`@/assets/AttendVersion1_Image/공가-2-${detailLine}.png`);
        } else {
          return require(`@/assets/AttendVersion1_Image/사유-2-${detailLine}.png`);
        }
      } else {
        //공가/사유에 enter가 없으면
        if (reason[0].length > sp) {
          //2줄
          this.reasonCoordinate.reason1 = [
            reason[0].substring(0, sp),
            reasonX,
            reasonY
          ];
          this.reasonCoordinate.reason2 = [
            reason[0].substring(sp, reason[0].length),
            reasonX,
            reasonY + addY
          ];

          let detailLine = this.getDetailLine(addY);

          this.lineCnt = detailLine;
          this.fontStyleOneCoordinate.absentPlace[1] +=
            (addY + blankY) * detailLine;
          this.fontStyleOneCoordinate.signature[1] +=
            (addY + blankY) * detailLine;

          this.fontStyleTwoCoordinate.currentYear[1] +=
            blankY * (detailLine + 1);
          this.fontStyleTwoCoordinate.currentMonth[1] +=
            blankY * (detailLine + 1);
          this.fontStyleTwoCoordinate.currentDay[1] +=
            blankY * (detailLine + 1);

          if (category == 0) {
            return require(`@/assets/AttendVersion1_Image/공가-2-${detailLine}.png`);
          } else {
            return require(`@/assets/AttendVersion1_Image/사유-2-${detailLine}.png`);
          }
        } else {
          //1줄
          this.reasonCoordinate.reason1 = [reason[0], reasonX, reasonY];

          let detailLine = this.getDetailLine(0);

          this.lineCnt = detailLine - 1;
          this.fontStyleOneCoordinate.absentPlace[1] +=
            (addY + blankY) * (detailLine - 1);
          this.fontStyleOneCoordinate.signature[1] +=
            (addY + blankY) * (detailLine - 1);

          this.fontStyleTwoCoordinate.currentYear[1] +=
            blankY * (detailLine - 1);
          this.fontStyleTwoCoordinate.currentMonth[1] +=
            blankY * (detailLine - 1);
          this.fontStyleTwoCoordinate.currentDay[1] +=
            blankY * (detailLine - 1);

          return require(`@/assets/AttendVersion1_Image/세부-${detailLine}.png`);
        }
      }
    },
    getDetailLine(addLine) {
      let detail = this.userInput.absentDetail.split('\n');
      let detailEnterSize = detail.length;
      let isDetailEnter = detailEnterSize > 1 ? true : false;

      let sp = 23;

      let detailX = 0.329;
      let detailY = 0.535 + addLine;
      let addY = 0.031;

      if (isDetailEnter) {
        //세부내용에 enter가 있으면
        if (detail[0].length > sp) {
          //첫째줄에 enter가 없이 개행이 있으면
          this.reasonCoordinate.detail1 = [
            detail[0].substring(0, sp),
            detailX,
            detailY
          ];
          this.reasonCoordinate.detail2 = [
            detail[0].substring(sp, detail[0].length),
            detailX,
            detailY + addY
          ];
          this.reasonCoordinate.detail3 = [
            detail[1],
            detailX,
            detailY + 2 * addY
          ];

          return 3;
        } else if (detail[1].length > sp) {
          //둘째줄에 enter가 없이 개행이 있으면
          this.reasonCoordinate.detail1 = [detail[0], detailX, detailY];
          this.reasonCoordinate.detail2 = [
            detail[1].substring(0, sp),
            detailX,
            detailY + addY
          ];
          this.reasonCoordinate.detail3 = [
            detail[1].substring(sp, detail[1].length),
            detailX,
            detailY + 2 * addY
          ];

          return 2;
        } else {
          //글자 초과없이 enter만 있으면
          detail.forEach((value, index) => {
            this.reasonCoordinate[`detail${index + 1}`] = [
              value,
              detailX,
              detailY + addY * index
            ];
          });

          return detail.length;
        }
      } else {
        //세부내용에 enter가 없으면
        if (detail[0].length > 46) {
          //3줄
          this.reasonCoordinate.detail1 = [
            detail[0].substring(0, sp),
            detailX,
            detailY
          ];
          this.reasonCoordinate.detail2 = [
            detail[0].substring(sp, 46),
            detailX,
            detailY + addY
          ];
          this.reasonCoordinate.detail3 = [
            detail[0].substring(46, detail[0].length),
            detailX,
            detailY + 2 * addY
          ];

          return 3;
        } else if (detail[0].length > sp) {
          //2줄
          this.reasonCoordinate.detail1 = [
            detail[0].substring(0, sp),
            detailX,
            detailY
          ];
          this.reasonCoordinate.detail2 = [
            detail[0].substring(sp, detail[0].length),
            detailX,
            detailY + addY
          ];

          return 2;
        } else {
          //1줄
          this.reasonCoordinate.detail1 = [detail, detailX, detailY];

          return 1;
        }
      }
    },
    initCanvas() {
      const canvas = document.querySelector('#pictureContainer');
      this.canvas = canvas;
      const context = canvas.getContext('2d');
      this.context = context;
      // canvas.width = window.innerWidth;
      // canvas.height = (window.innerWidth * 4) / 3;
      this.canvasWidth = canvas.width;
      this.canvasHeight = canvas.height;

      const canvasImg2 = new Image();
      canvasImg2.src = require('@/assets/AttendVersion1_Image/출결이미지3.svg');

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
      console.log('saveImg');
      html2canvas(document.querySelector('#container')).then((canvas) => {
        var imgData = canvas.toDataURL('image/png', 1.0);
        var imgWidth = 210;
        var imgHeight = 297;
        var doc = new jsPDF('p', 'mm', 'a4');

        doc.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        doc.addPage();
        doc.addImage(
          this.canvas2.toDataURL("image/png", 1.0),
          "PNG",
          0,
          0,
          imgWidth,
          imgHeight
        );
        doc.save(
          this.userInput.absentYear +
            this.userInput.absentMonth +
            this.userInput.absentDay +
            '_출결확인서_' +
            this.userInput.name +
            '[' +
            this.userInput.campus +
            this.userInput.class +
            '반]' +
            '.pdf'
        );
      });
    },
    uploadImg() {
      this.initCanvas();

      const image = this.$refs['image'].files[0];
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

      this.$emit('uploadPicture', [this.image]);
    }
  }
};
</script>

<style scoped>
@import '@/assets/css/preview.css';
</style>
