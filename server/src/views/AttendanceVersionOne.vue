<template>
  <div class="input-container">
    <div class="user-input">
      <label for="name" class="user-input-label">성명</label>
      <input
        type="text"
        id="name"
        class="user-input-value"
        v-model="userInput.name"
        placeholder="예) 김OO"
      />
    </div>
    <div class="user-input">
      <label for="birthday" class="user-input-label">생년월일</label>
      <input
        type="text"
        id="birthday"
        class="user-input-value"
        v-model="userInput.birthday"
        placeholder="예) 90.02.09"
      />
    </div>
    <div class="user-input">
      <label for="absent-date" class="user-input-label">결석일시</label>
      <input
        type="date"
        id="absent-date"
        class="user-input-value"
        v-model="absentDate"
      />
    </div>
    <div class="user-input">
      <label for="absent-time" class="user-input-label">분류</label>
      <div class="user-input-radio">
        <label class="radio-label-button"
          ><input
            type="radio"
            name="absent-time"
            value="0"
            v-model="userInput.absentTime"
          />
          오전</label
        >
        <label class="radio-label-button"
          ><input
            type="radio"
            name="absent-time"
            value="1"
            v-model="userInput.absentTime"
          />
          오후</label
        >
        <label class="radio-label-button"
          ><input
            type="radio"
            name="absent-time"
            value="2"
            v-model="userInput.absentTime"
          />
          종일</label
        >
      </div>
    </div>
    <div class="user-input">
      <label for="absent-category" class="user-input-label">공가사유</label>
      <div class="user-input-radio">
        <label class="radio-label-button"
          ><input
            type="radio"
            name="absent-category"
            value="0"
            v-model="userInput.absentCategory"
          />
          공가</label
        >
        <label class="radio-label-button"
          ><input
            type="radio"
            name="absent-category"
            value="1"
            v-model="userInput.absentCategory"
          />
          사유</label
        >
      </div>
    </div>
    <div class="user-input">
      <label for="absent-reason" class="user-input-label">사유</label>
      <textarea
        id="absent-reason"
        class="user-input-textarea"
        v-model="userInput.absentReason"
        placeholder="예) SSAFY 면접으로 인한 결석"
        rows="3"
      />
    </div>
    <div class="user-input">
      <label for="absent-detail" class="user-input-label">세부내용</label>
      <textarea
        type="text"
        id="absent-detail"
        class="user-input-textarea"
        v-model="userInput.absentDetail"
        placeholder="예) 멀티캠퍼스 서울에서 진행된 SSAFY 면접으로 인하여 결석 소명 제출합니다."
        rows="5"
      />
    </div>
    <div class="user-input">
      <label for="absent-place" class="user-input-label">장소</label>
      <input
        type="text"
        id="absent-place"
        class="user-input-value"
        v-model="userInput.absentPlace"
        placeholder="예) 서울 멀티캠퍼스"
      />
    </div>
    <!-- Signature component -->
    <div class="user-input">
      <label for="signature" class="user-input-label">서명</label>
      <canvas
        id="signature"
        width="248"
        height="110"
        v-on="{
          mousemove: move,
          mouseup: up,
          mousedown: down,
          mouseout: out,
        }"
      ></canvas>
      <div class="reset-button-container">
        <button class="reset-button" @click="reset">다시 그리기</button>
      </div>
    </div>
    <div class="user-input">
      <label for="absent-category" class="user-input-label">증빙서류</label>
      <FileUpload :pictureUrl="pictureUrl" @uploadPicture="uploadPicture" />
    </div>
    <div class="button-container">
      <button class="submit-button" @click="verifyValidation">만들기</button>
      <button class="submit-button" @click="resetInput">리셋</button>
    </div>
  </div>
</template>

<script>
import FileUpload from "@/components/FileUploadOnCanvas";

import { mapMutations } from "vuex";

export default {
  components: {
    FileUpload,
  },
  data() {
    return {
      userInput: {
        name: "",
        birthday: "",
        absentYear: "",
        absentMonth: "",
        absentDay: "",
        absentTime: "0",
        absentCategory: "0",
        absentReason: "",
        absentDetail: "",
        absentPlace: "",
        currentYear: "",
        currentMonth: "",
        currentDay: "",
        signatureUrl: "",
      },
      absentDate: null,
      currentDate: null,
      pictureUrl: [],
      // signature
      canvas: null,
      context: null,
      baseURL: null,
      startX: 0,
      startY: 0,
      drawing: false, // 드로깅 여부를 판단하는 변수
    };
  },

  mounted() {
    const canvas = document.querySelector("#signature");
    this.canvas = canvas;
    this.context = this.canvas.getContext("2d");
    // 선 굵기를 2로 설정, 색깔은 검정색
    this.context.lineWidth = 2;
    this.context.strokeStyle = "black";
  },

  methods: {
    ...mapMutations("AttendanceVersionOneStore", ["SET_USER_INFO"]),
    resetInput() {
      this.userInput = {
        name: "",
        birthday: "",
        absentDate: "",
        absentMonth: "",
        absentDay: "",
        absentTime: "0",
        absentCategory: "0",
        absentReason: "",
        absentDetail: "",
        absentPlace: "",
        currentYear: "",
        currentMonth: "",
        currentDay: "",
        signatureUrl: "",
      };
      this.absentDate = null;
      this.currentDate = null;
      this.pictureUrl = [];
      this.reset();
    },
    uploadPicture(pictureUrls) {
      this.pictureUrl = pictureUrls;
    },
    verifyValidation() {
      this.userInput.signatureUrl = this.canvas.toDataURL();
      if (
        !(
          this.userInput.name &&
          this.userInput.birthday &&
          this.absentDate &&
          this.userInput.absentReason &&
          this.userInput.absentDetail &&
          this.userInput.absentPlace &&
          this.userInput.signatureUrl &&
          this.pictureUrl
        )
      ) {
        alert("모든 정보를 입력해주세요.");
      } else {
        let absentDate = this.absentDate.split("-");
        let currentDate = new Date();

        let currentYear = currentDate.getFullYear() + "";
        console.log(currentYear);
        let currentMonth = currentDate.getMonth() + 1;
        let currentDay = currentDate.getDate();

        const userInput = {
          name: this.userInput.name,
          birthday: this.userInput.birthday,
          absentYear: absentDate[0].slice(2),
          absentMonth: absentDate[1],
          absentDay: absentDate[2],
          absentTime: this.userInput.absentTime,
          absentCategory: this.userInput.absentCategory,
          absentReason: this.userInput.absentReason,
          absentDetail: this.userInput.absentDetail,
          absentPlace: this.userInput.absentPlace,
          signature: this.userInput.name,
          currentYear: currentYear.slice(2),
          currentMonth: currentMonth,
          currentDay: currentDay,
          signatureUrl: this.userInput.signatureUrl,
          pictureUrl: this.pictureUrl,
        };
        this.SET_USER_INFO(userInput);
        this.$router.push({
          name: "preview",
        });
      }
    },

    draw(curX, curY) {
      this.context.beginPath();
      this.context.moveTo(this.startX, this.startY);
      this.context.lineTo(curX, curY);
      this.context.stroke();
    },

    down: function (event) {
      console.log(event);
      this.startX = event.offsetX;
      this.startY = event.offsetY;
      this.drawing = true;
    },

    up() {
      this.drawing = false;
    },

    move: function (event) {
      if (!this.drawing) return; // 마우스가 눌러지지 않았으면 리턴
      const curX = event.offsetX;
      const curY = event.offsetY;
      this.draw(curX, curY);
      this.startX = curX;
      this.startY = curY;
    },

    out() {
      this.drawing = false;
    },

    makeImage() {
      this.baseURL = this.canvas.toDataURL();
    },

    reset() {
      this.context.clearRect(0, 0, 166, 90);
    },
  },
};
</script>

<style scoped>
canvas {
  margin-top: 10px;
  background: white;
  border: 1px solid #b4b4b4;
}
.reset-button-container {
  width: 15rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
.reset-button {
  margin-top: 10px;
  background: white;
  width: 120px;
  height: 30px;
  border: none;
  border-radius: 6px;
  font: 18px;
}
</style>
