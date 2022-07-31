/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let prtclArr = [];
let adjstX = 10;
let adjstY = 10;

//hande mouse interaction
const mouse = {
  x: null,
  y: null,
  radius: 150,
};
window.addEventListener("mousemove", function (event) {
  mouse.x = event.x;
  mouse.y = event.y;
  //console.log(`M_X: ${mouse.x}, M_Y: ${mouse.y}`);
});

ctx.fillStyle = "white";
ctx.font = "bolder 30px Arial";
ctx.fillText("ALABAMA", 0, 30);
// ctx.strokeStyle = 'yellow';
// ctx.strokeRect(0,0,100,100);
const pxlData = ctx.getImageData(0, 0, 120, 200);

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 4;
    this.baseX = this.x;
    this.baseY = this.y;
    this.density = Math.random() * 50 + 10;
    this.color = "#73aed9";
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
  }
  update() {
    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;
    let dstnc = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
    let frcDirX = dx / dstnc;
    let frcDirY = dy / dstnc;
    let maxDistance = mouse.radius;
    let force = (maxDistance - dstnc) / maxDistance;
    let directionX = frcDirX * force * this.density;
    let directionY = frcDirY * force * this.density;
    if (dstnc < mouse.radius) {
      this.color = "#FF44FF";
      this.x -= directionX;
      this.y -= directionY;
      this.size = 6;
    } else {
      this.color = "#73aed9";
      this.size = 5;
      if (this.x != this.baseX) {
        let dbx = this.x - this.baseX;
        this.x -= dbx / 3;
      }
      if (this.y != this.baseY) {
        let dby = this.y - this.baseY;
        this.y -= dby / 3;
      }
    }
  }
}

function init() {
  prtclArr = [];
  //   for (let ix1 = 0; ix1 < 5000; ix1++) {
  //     const xCoord = Math.random() * canvas.width;
  //     const yCoord = Math.random() * canvas.height;
  //     prtclArr.push(new Particle(xCoord, yCoord));
  //   }
  for (let y = 0, y2 = pxlData.height; y < y2; y++) {
    for (let x = 0, x2 = pxlData.width; x < x2; x++) {
      if (pxlData.data[y * 4 * pxlData.width + x * 4 + 3] > 128) {
        let posX = x + adjstX;
        let posY = y + adjstY;
        prtclArr.push(new Particle(posX * 20, posY * 20));
      }
    }
  }
}
init();
//console.log(prtclArr);

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  prtclArr.forEach((p) => {
    p.update();
    p.draw();
  });
  connect();
  requestAnimationFrame(animate);
}
animate();

function connect() {
  let opacity = 1;
  let mxDstnc = 35;
  for (let ix1 = 0; ix1 < prtclArr.length; ix1++) {
    for (let ix2 = ix1; ix2 < prtclArr.length; ix2++) {
      let dx = prtclArr[ix1].x - prtclArr[ix2].x;
      let dy = prtclArr[ix1].y - prtclArr[ix2].y;
      let dstnc = Math.sqrt(dx * dx + dy * dy);
      if (dstnc < mxDstnc) {
        opacity = dstnc / mxDstnc;
        ctx.strokeStyle = "rgba(145,145,145," + opacity + ")";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(prtclArr[ix1].x, prtclArr[ix1].y);
        ctx.lineTo(prtclArr[ix2].x, prtclArr[ix2].y);
        ctx.stroke();
      }
    }
  }
}
