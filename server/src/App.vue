<template>
  <nav>
    <router-link to="/">출결소명확인서</router-link> |
    <router-link to="/preview">미리보기</router-link> |
    <br />
    <br />
    <router-link to="/attendanceChange">출결변경요청서</router-link> |
    <router-link to="/previewTwo">미리보기</router-link> |
    <router-link to="/preview2">미리보기2</router-link> 
  </nav>
  <router-view />
</template>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
