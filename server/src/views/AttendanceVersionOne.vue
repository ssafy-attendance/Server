<template>
  <div class="input-container">
    <div class="input-container">
      <div class="user-input">
        <label for="name" class="user-input-label">성명</label>
        <input
          type="text"
          id="name"
          class="user-input-value"
          v-model="userInput.name"
        />
      </div>
      <div class="user-input">
        <label for="birthday" class="user-input-label">생년월일</label>
        <input
          type="text"
          id="birthday"
          class="user-input-value"
          v-model="userInput.birthday"
        />
      </div>
      <div class="user-input">
        <label for="absent-year" class="user-input-label">년</label>
        <input
          type="text"
          id="absent-year"
          class="user-input-value"
          v-model="userInput.absentYear"
        />
      </div>
      <div class="user-input">
        <label for="absent-month" class="user-input-label">월</label>
        <input
          type="text"
          id="absent-month"
          class="user-input-value"
          v-model="userInput.absentMonth"
        />
      </div>
      <div class="user-input">
        <label for="absent-day" class="user-input-label">일</label>
        <input
          type="text"
          id="absent-day"
          class="user-input-value"
          v-model="userInput.absentDay"
        />
      </div>
      <div class="user-input">
        <label for="absent-time" class="user-input-label">분류</label>
        <label
          ><input
            type="radio"
            name="absent-time"
            value="0"
            v-model="userInput.absentTime"
          />
          오전</label
        >
        <label
          ><input
            type="radio"
            name="absent-time"
            value="1"
            v-model="userInput.absentTime"
          />
          오후</label
        >
        <label
          ><input
            type="radio"
            name="absent-time"
            value="2"
            v-model="userInput.absentTime"
          />
          종일</label
        >
      </div>
      <div class="user-input">
        <label for="absent-category" class="user-input-label">공가 사유</label>
        <label
          ><input
            type="radio"
            name="absent-category"
            value="0"
            v-model="userInput.absentCategory"
          />
          공가</label
        >
        <label
          ><input
            type="radio"
            name="absent-category"
            value="1"
            v-model="userInput.absentCategory"
          />
          사유</label
        >
      </div>
      <div class="user-input">
        <label for="absent-reason" class="user-input-label">사유</label>
        <input
          type="text"
          id="absent-reason"
          class="user-input-value"
          v-model="userInput.absentReason"
        />
      </div>
      <div class="user-input">
        <label for="absent-detail" class="user-input-label">세부내용</label>
        <input
          type="text"
          id="absent-detail"
          class="user-input-value"
          v-model="userInput.absentDetail"
        />
      </div>
      <div class="user-input">
        <label for="absent-place" class="user-input-label">장소</label>
        <input
          type="text"
          id="absent-place"
          class="user-input-value"
          v-model="userInput.absentPlace"
        />
      </div>
      <div class="user-input">
        <label for="current-year" class="user-input-label">년</label>
        <input
          type="text"
          id="current-year"
          class="user-input-value"
          v-model="userInput.currentYear"
        />
      </div>
      <div class="user-input">
        <label for="current-month" class="user-input-label">월</label>
        <input
          type="text"
          id="current-month"
          class="user-input-value"
          v-model="userInput.currentMonth"
        />
      </div>
      <div class="user-input">
        <label for="current-day" class="user-input-label">일</label>
        <input
          type="text"
          id="current-day"
          class="user-input-value"
          v-model="userInput.currentDay"
        />
      </div>
    </div>
    <!-- Signature component -->
    <div id="canvas-container">
      <h3>서명 그려보기</h3>
      <canvas
        id="signature"
        width="166"
        height="90"
        v-on="{
          mousemove: move,
          mouseup: up,
          mousedown: down,
          mouseout: out,
        }"
      ></canvas>
      <button @click="makeImage">서명 완료</button>
      <button @click="reset">서명 다시그리기</button>
    </div>
    <FileUpload :pictureUrl="pictureUrl" @uploadPicture="uploadPicture" />
    <button class="submit-button" @click="verifyValidation">만들기</button>
    <button class="submit-button" @click="resetInput">리셋</button>
  </div>
</template>

<script>
import FileUpload from "@/components/FileUpload";
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
      },
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
    ...mapMutations(["SET_USER_INFO"]),
    resetInput() {
      this.userInput = {
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
      };
      this.pictureUrl = [];
      this.signatureUrl = "";
    },
    uploadPicture(pictureUrls) {
      this.pictureUrl = pictureUrls;
    },
    verifyValidation() {
      if (
        !(
          this.userInput.name &&
          this.userInput.birthday &&
          this.userInput.absentYear &&
          this.userInput.absentMonth &&
          this.userInput.absentDay &&
          this.userInput.absentReason &&
          this.userInput.absentDetail &&
          this.userInput.absentPlace &&
          this.userInput.currentYear &&
          this.userInput.currentMonth &&
          this.userInput.currentDay
        )
      ) {
        alert("모든 정보를 입력해주세요.");
      } else {
        const userInput = {
          name: this.userInput.name,
          birthday: this.userInput.birthday,
          absentYear: this.userInput.absentYear,
          absentMonth: this.userInput.absentMonth,
          absentDay: this.userInput.absentDay,
          absentTime: this.userInput.absentTime,
          absentCategory: this.userInput.absentCategory,
          absentReason: this.userInput.absentReason,
          absentDetail: this.userInput.absentDetail,
          absentPlace: this.userInput.absentPlace,
          currentYear: this.userInput.currentYear,
          currentMonth: this.userInput.currentMonth,
          currentDay: this.userInput.currentDay,
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
#canvas-container {
  background: tomato;
  width: 200px;
  height: 300px;
  border: 2px solid black;
}

canvas {
  background: white;
  border: 3px solid black;
}
</style>
