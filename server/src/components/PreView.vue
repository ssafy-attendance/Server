<template>
  <canvas
    id="container"
    width="793.76001"
    height="1122.5601"
    @click="findCoord"
  />
</template>
<script>
import { mapGetters } from "vuex";

export default {
  created() {
    this.userInput = this.getUserInput;
  },

  data() {
    return {
      context: null,
      userInput: {},
      coordinate: {
        name: [262, 258],
        birthday: [530, 258],
        absentYear: [280, 306],
        absentMonth: [355, 306],
        absentDay: [418, 306],
        absentReason: [236, 466],
        absentDetail: [266, 575],
        absentPlace: [240, 612],
        siganture: [240, 648],
        currentYear: [303, 947],
        currentMonth: [386, 947],
        currentDay: [465, 947],
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
    img.onload = function () {
      context.drawImage(img, 0, 0, 793.76001, 1122.5601);
      context.font = "14pt sans-serif";
      // context.fillText("안녕", 262, 258);
      // context.fillText("97.10.17", 530, 258);
      // context.fillText("22", 280, 306);
      // context.fillText("12", 355, 306);
      // context.fillText("16", 418, 306);
      // context.fillText("공가", 236, 466); // 이유
      // context.fillText("사유", 236, 490); // 사유
      // context.fillText("세부내용", 266, 575); // 세부내용
      // context.fillText("장소", 240, 612); // 장소
      // context.fillText("서명", 240, 648); // 서명
      // context.font = "20pt sans-serif";
      // context.fillText("22", 303, 947); // curr년
      // context.fillText("12", 386, 947); // curr년
      // context.fillText("16", 465, 947); // curr년
    };
  },

  methods: {
    findCoord(event) {
      const x = event.offsetX;
      const y = event.offsetY;
      console.log(`X 좌표 : ${x}  Y좌표 : ${y}`);
    },
  },
};
</script>

<style></style>
