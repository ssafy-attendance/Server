const AttendanceVersionOneStore = {
  namespaced: true,
  state: () => ({
    userInput: {},
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
