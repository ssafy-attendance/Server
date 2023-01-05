const AttendanceVersionTwoStore = {
  namespaced: true,
  state: () => ({
    userInput: {
      campus: "",
      class: "",
      name: "",
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
    getAttendanceYear: (state) => {
      return state.userInput.attendanceYear;
    },
    getAttendanceMonth: (state) => {
      return state.userInput.attendanceMonth;
    },
    getAttendanceDay: (state) => {
      return state.userInput.attendanceDay;
    },
  },
  mutations: {
    SET_USER_INFO(state, userInput) {
      state.userInput = userInput;
    },
  },
  actions: {},
};

export default AttendanceVersionTwoStore;
