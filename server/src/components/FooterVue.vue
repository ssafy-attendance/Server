<template>
  <footer>
    <a href="https://github.com/ssafy-attendance/Server"
      ><h2>&copy; SSAFY 8기 대전캠퍼스 1학기 7반</h2></a
    >
    <br />
    <a href="https://github.com/ssafy-attendance/Server"
      ><img src="@/assets/github.png" alt="github"
    /></a>
    <img
      id="hits"
      src="https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fssafy-attendance.site&count_bg=%231BB0E7&title_bg=%231BB0E7&icon=&icon_color=%23E7E7E7&title=%EC%98%A4%EB%8A%98+%2F+%EC%A0%84%EC%B2%B4&edge_flat=false"
    />
  </footer>
</template>

<script>
export default {};
</script>

<style scoped>
footer {
  height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

a {
  text-decoration: none;
  color: black;
}

h2 {
  font-size: 1.2rem;
  font-weight: 800;
}

#hits {
  width: 150px;
  padding: 1.5rem;
}

img {
  width: 50px;
}
</style>
