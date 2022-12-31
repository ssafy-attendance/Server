<template>
  <HeaderVue />
  <div class="button-box">
    <div id="btn"></div>
    <router-link to="/"
      ><button type="button" class="toggle-btn" @click="leftClick">
        소명확인서
      </button>
    </router-link>
    <router-link to="/attendanceChange"
      ><button type="button" class="toggle-btn" @click="rightClick">
        변경요청서
      </button>
    </router-link>
  </div>
  <router-view />
  <FooterVue />
</template>

<script>
import HeaderVue from "@/components/HeaderVue";
import FooterVue from "@/components/FooterVue";

export default {
  components: {
    HeaderVue,
    FooterVue,
  },

  methods: {
    leftClick() {
      const btn = document.getElementById("btn");
      btn.style.left = "0";
    },
    rightClick() {
      const btn = document.getElementById("btn");
      btn.style.left = "140px";
    },
  },
};
</script>

<style scoped>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

/* nav a {
  font-weight: bold;
  color: #2c3e50;
} */

router-link {
  background: #fff;
}
.button-box {
  width: 280px;
  margin: 35px auto;
  position: relative;
  border-radius: 30px;
  background: #fff;
}

.toggle-btn {
  padding: 10px 40px;
  cursor: pointer;
  background: transparent;
  border: 0;
  outline: none;
  position: relative;
  text-align: center;
}

#btn {
  left: 0;
  top: 0;
  position: absolute;
  width: 140px;
  height: 100%;
  background: #1ea1e1;
  border-radius: 30px;
  transition: 0.5s;
}

a {
  border-radius: 30px;
  background: #fff;
}
</style>
