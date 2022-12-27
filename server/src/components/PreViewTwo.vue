<template>
  <div></div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  created() {
    this.userInput = this.getUserInput;
  },

  data() {
    return {
      userInput: {},
    };
  },

  computed: {
    ...mapGetters("AttendanceVersionTwoStore", ["getUserInput"]),
  },
};
</script>

<style></style>
