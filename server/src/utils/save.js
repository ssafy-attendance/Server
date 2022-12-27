import jsPDF from "jspdf";
import html2canvas from "html2canvas";

// 캔버스 초기화
const initCanvas = (canvas, context) => {
    canvas = document.querySelector("#container");
    this.canvas = canvas;
    context = canvas.getContext("2d");
    this.context = context;
    canvas.width = window.innerWidth;
    canvas.height = (window.innerWidth * 4) / 3;
    const canvasImg2 = new Image();
    canvasImg2.src = require("@/assets/AttendVersion1_Image/출결이미지3.svg");
    canvasImg2.onload = function () {
      context.drawImage(canvasImg2, 0, 0, canvas.width, canvas.height);
    };
};
  

const instance = {
    initCanvas,
  };
  
  export default instance;