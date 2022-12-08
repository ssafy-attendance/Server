<template>
  <div id="canvas-container">
    <h1>서명 그려보기</h1>
    <canvas
      id="signature"
      width="300"
      height="400"
      v-on="{
        mousemove: move,
        mouseup: up,
        mousedown: down,
        mouseout: out,
      }"
    ></canvas>
  </div>
</template>

<script>
export default {
  data() {
    return {
      canvas: null,
      context: null,
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
  },
};
</script>

<style scoped>
#canvas-container {
  background: tomato;
  width: 300px;
  height: 500px;
  border: 2px solid black;
  justify-content: center;
}

canvas {
  background: white;
}
</style>
