const AttendanceVersionOne = {
  namespaced: true,
  state: () => ({
    userInput: {
      name: "",
      class: "",
      campus: "",
      birthday: "",
      absentDate: "",
      absentMonth: "",
      absentDay: "",
      absentTime: 0,
      absentCategory: 0,
      absentReason: "",
      absentDetail: "",
      absentPlace: "",
      signature: "",
      currentYear: "",
      currentMonth: "",
      currentDay: "",
      signatureUrl: "",
      pictureUrl: "",
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

export default AttendanceVersionOne;
