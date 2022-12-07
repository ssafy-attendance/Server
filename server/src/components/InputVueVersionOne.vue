<template>
  <div class="input-container">
    <div class="user-input">
      <label for="name" class="user-input-label">성명</label>
      <input type="text" id="name" class="user-input-value" v-model="name" />
    </div>
    <div class="user-input">
      <label for="birthday" class="user-input-label">생년월일</label>
      <input
        type="text"
        id="birthday"
        class="user-input-value"
        v-model="birthday"
      />
    </div>
    <div class="user-input">
      <label for="absent-year" class="user-input-label">년</label>
      <input
        type="text"
        id="absent-year"
        class="user-input-value"
        v-model="absentYear"
      />
    </div>
    <div class="user-input">
      <label for="absent-month" class="user-input-label">월</label>
      <input
        type="text"
        id="absent-month"
        class="user-input-value"
        v-model="absentMonth"
      />
    </div>
    <div class="user-input">
      <label for="absent-day" class="user-input-label">일</label>
      <input
        type="text"
        id="absent-day"
        class="user-input-value"
        v-model="absentDay"
      />
    </div>
    <div class="user-input">
      <label for="absent-time" class="user-input-label">분류</label>
      <label
        ><input
          type="radio"
          name="absent-time"
          value="0"
          v-model="absentTime"
        />
        오전</label
      >
      <label
        ><input
          type="radio"
          name="absent-time"
          value="1"
          v-model="absentTime"
        />
        오후</label
      >
      <label
        ><input
          type="radio"
          name="absent-time"
          value="2"
          v-model="absentTime"
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
          v-model="absentCategory"
        />
        공가</label
      >
      <label
        ><input
          type="radio"
          name="absent-category"
          value="1"
          v-model="absentCategory"
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
        v-model="absentReason"
      />
    </div>
    <div class="user-input">
      <label for="absent-detail" class="user-input-label">세부내용</label>
      <input
        type="text"
        id="absent-detail"
        class="user-input-value"
        v-model="absentDetail"
      />
    </div>
    <div class="user-input">
      <label for="absent-place" class="user-input-label">장소</label>
      <input
        type="text"
        id="absent-place"
        class="user-input-value"
        v-model="absentPlace"
      />
    </div>
    <div class="user-input">
      <label for="current-year" class="user-input-label">년</label>
      <input
        type="text"
        id="current-year"
        class="user-input-value"
        v-model="currentYear"
      />
    </div>
    <div class="user-input">
      <label for="current-month" class="user-input-label">월</label>
      <input
        type="text"
        id="current-month"
        class="user-input-value"
        v-model="currentMonth"
      />
    </div>
    <div class="user-input">
      <label for="current-day" class="user-input-label">일</label>
      <input
        type="text"
        id="current-day"
        class="user-input-value"
        v-model="currentDay"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
  },
  methods: {
    verifyValidation() {
      if (
        this.name &&
        this.birthday &&
        this.absentYear &&
        this.absentMonth &&
        this.absentDay &&
        this.absentReason &&
        this.absentDetail &&
        this.absentPlace &&
        this.currentYear &&
        this.currentMonth &&
        this.currentDay
      ) {
        alert("모든 정보를 입력해주세요.");
      }
    },
  },
};
</script>

<style></style>
