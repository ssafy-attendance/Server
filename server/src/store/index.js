import Vuex from "vuex";

import AttendanceVersionOneStore from "@/store/modules/AttendanceVersionOneStore";
import { createVuexPersistedState } from "vue-persistedstate";

export default new Vuex.Store({
  plugins: [
    createVuexPersistedState({
      storage: window.sessionStorage,
    }),
  ],

  modules: { AttendanceVersionOneStore },
});
