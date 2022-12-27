import jsPDF from "jspdf";
import html2canvas from "html2canvas";
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

const saveImg = () => {
  html2canvas(document.querySelector("#container")).then(function (canvas) {
    var imgData = canvas.toDataURL("image/png", 1.0);
    var imgWidth = 210;
    var imgHeight = (canvas.height * imgWidth) / canvas.width;

    var doc = new jsPDF("p", "mm", "a4");

    doc.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);

    doc.save("sample.pdf");
  });
};

const uploadImg = (image) => {
  const url = URL.createObjectURL(image);
  image = url;
  const material = new Image();
  material.src = image;
  return image;
};
const instance = {
  initCanvas,
  saveImg,
  uploadImg,
};

export default instance;
