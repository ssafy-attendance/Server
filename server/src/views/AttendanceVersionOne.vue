<template>
  <div class="input-container">
    <InputVueVersionOne :userInput="userInput" />
    <button class="submit-button">만들기</button>
  </div>
</template>

<script>
import InputVueVersionOne from "@/components/InputVueVersionOne";
export default {
  components: {
    InputVueVersionOne,
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
