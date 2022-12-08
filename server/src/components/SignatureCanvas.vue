<template>
  <div id="canvas-container">
    <h3>서명 그려보기</h3>
    <canvas
      id="signature"
      width="166"
      height="90"
      v-on="{
        mousemove: move,
        mouseup: up,
        mousedown: down,
        mouseout: out,
      }"
    ></canvas>
    <button @click="makeImage">서명 완료</button>
    <button @click="reset">서명 다시그리기</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      canvas: null,
      context: null,
      baseURL: null,
      startX: 0,
      startY: 0,
      drawing: false, // 드로깅 여부를 판단하는 변수
    };
  },

  mounted() {
    const canvas = document.querySelector("#signature");
    this.canvas = canvas;
    this.context = this.canvas.getContext("2d");
    // 선 굵기를 2로 설정, 색깔은 검정색
    this.context.lineWidth = 2;
    this.context.strokeStyle = "black";
  },

  methods: {
    draw(curX, curY) {
      this.context.beginPath();
      this.context.moveTo(this.startX, this.startY);
      this.context.lineTo(curX, curY);
      this.context.stroke();
    },

    down: function (event) {
      console.log(event);
      this.startX = event.offsetX;
      this.startY = event.offsetY;
      this.drawing = true;
    },

    up() {
      this.drawing = false;
    },

    move: function (event) {
      if (!this.drawing) return; // 마우스가 눌러지지 않았으면 리턴
      const curX = event.offsetX;
      const curY = event.offsetY;
      this.draw(curX, curY);
      this.startX = curX;
      this.startY = curY;
    },

    out() {
      this.drawing = false;
    },

    makeImage() {
      this.baseURL = this.canvas.toDataURL();
    },

    reset() {
      this.context.clearRect(0, 0, 166, 90);
    },
  },
};
</script>

<style scoped>
#canvas-container {
  background: tomato;
  width: 200px;
  height: 300px;
  border: 2px solid black;
}

canvas {
  background: white;
  border: 3px solid black;
}
</style>
