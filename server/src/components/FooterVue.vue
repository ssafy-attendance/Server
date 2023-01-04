<template>
  <footer>
    <a href="https://github.com/ssafy-attendance/Server"
      ><h2>&copy; SSAFY 8기 대전캠퍼스 1학기 7반</h2></a
    >
    <br />
    <a href="https://github.com/ssafy-attendance/Server"
      ><img src="@/assets/github.png" alt="github"
    /></a>
  </footer>
</template>

<script>
export default {};
</script>

<style scoped>
footer {
  height: 120px;
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

img {
  width: 50px;
}
</style>
