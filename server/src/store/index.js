import { createStore } from "vuex";

export default createStore({
  state: {
    userInput: {},
  },
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
  modules: {},
});
