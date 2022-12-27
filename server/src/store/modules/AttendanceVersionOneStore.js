const AttendanceVersionOneStore = {
  namespaced: true,
  state: () => ({
    userInput: {
      campus: "",
      class: "",
      name: "정도형",
      birth: "",
      reason: "",
      attendanceYear: "",
      attendanceMonth: "",
      attendanceDay: "",
      chAttendanceYear: "",
      chAttendanceMonth: "",
      chAttendanceDay: "",
      attendanceHour: "",
      attendanceMinute: "",
      chAttendanceHour: "",
      chAttendanceMinute: "",
      currentDate: "",
      detailReason: "",
      signatureUrl: "",
    },
  }),
  getters: {
    getUserInput: (state) => {
      return state.userInput;
    },
  },
  mutations: {
    SET_USER_INFO(state, userInput) {
      state.userInput = userInput;
    },
  },
  actions: {},
};

export default AttendanceVersionOneStore;
