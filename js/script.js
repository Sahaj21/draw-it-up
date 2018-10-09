var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var w = canvas.width;
var h = canvas.height;

//Store mouse position
var mouse = {
  x: 0,
  y: 0
};
var lastMouse = {
  x: 0,
  y: 0
};

//Image element
var outputCanvas = document.getElementById("canvasOut");

//Decides color and Width of Pen
var penColor = document.getElementById("pen-color");
var penWidth = document.getElementById("pen-width");

//Variable to check mouse hover
var drawup = false;

//Set pen values
var drawcolor = "black";
var drawwidth = penWidth.value;

//Check for change in pen color and width
penColor.addEventListener("change", fcolor);
penWidth.addEventListener("change", fwidth);

//Set color
function fcolor() {
  drawcolor = penColor.value;
}

//Set width
function fwidth() {
  drawwidth = penWidth.value;
}

//Save , Clear and Download buttons
document.getElementById("xsave").addEventListener("click", fsave);
document.getElementById("xclear").addEventListener("click", fclear);
document.getElementById("xdownload").addEventListener("click", fdown);

//Save
function fsave() {
  var dataURL = canvas.toDataURL(); //Take canvas data and change it to base64 image hex-code
  outputCanvas.src = dataURL; //Set canvas image element's source to the image code from canvas
  outputCanvas.style.display = "inline"; //Display the image by converting the code back to an image
}

//Clear after confirmation
function fclear() {
  var flag = confirm("Clear Everything?");
  if (flag) {
    ctx.clearRect(0, 0, w, h);
    outputCanvas.style.display = "none";
  }
}

//Download
function fdown() {
  var button = document.getElementById("xdownload");
  var dataURL = canvas.toDataURL("image/png");
  button.href = dataURL;
}

//Main Drawing Procedure

//Check for movement of mouse over the canvas
canvas.addEventListener(
  "mousemove",
  function(e) {
    console.log(mouse.x, mouse.y);
    lastMouse.x = mouse.x;
    lastMouse.y = mouse.y;
    mouse.x = e.pageX - this.offsetLeft;
    mouse.y = e.pageY - this.offsetTop;
    draw("move");
  },
  false
);

//Check for click to draw
canvas.addEventListener(
  "mousedown",
  function(e) {
    draw("down");
  },
  false
);

//Check for release of click to stop drawing
canvas.addEventListener(
  "mouseup",
  function(e) {
    draw("up");
  },
  false
);

//Check for mouse outside the canvas
canvas.addEventListener(
  "mouseout",
  function(e) {
    draw("up");
  },
  false
);

//Draw on Canvas if clicked
function draw(a) {
  if (a == "down") {
    drawup = true;
  }
  if (a == "up") {
    drawup = false;
  }
  if (drawup) {
    //Start
    ctx.beginPath();

    ///From previous point to current point
    ctx.moveTo(lastMouse.x, lastMouse.y);
    ctx.lineTo(mouse.x, mouse.y);

    //In selected color and width
    ctx.strokeStyle = drawcolor;
    ctx.lineWidth = drawwidth;

    //Draw it
    ctx.stroke();

    //Stop
    ctx.closePath();
  }
}
