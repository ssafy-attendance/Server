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
    <FileUpload :pictureUrl="pictureUrl" />
    <SignatureCanvas :signatureUrl="signatureUrl" />
    <button class="submit-button" @click="verifyValidation">만들기</button>
    <button class="submit-button" @click="resetInput">리셋</button>
  </div>
</template>

<script>
import FileUpload from "@/components/FileUpload";
import SignatureCanvas from "@/components/SignatureCanvas";

export default {
  components: {
    FileUpload,
    SignatureCanvas,
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
      signatureUrl: "",
    };
  },
  methods: {
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
        console.log("good");
      }
    },
  },
};
</script>
