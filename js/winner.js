
const h1=document.getElementById("winner-text")
h1.innerHTML="well-done!!!!"
const canvas = document.getElementById("fireworksCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.onload=function sound(){
const music=document.getElementById('audio');
// console.log(audio);
music.play();

}
window.addEventListener("resize", resizeCanvas, false);

class Firework {
    constructor() {
    this.x = Math.random() * canvas.width;
    this.y = canvas.height;
    this.sx = Math.random() * 3 - 1.5;
    this.sy = Math.random() * -3 - 3;
    this.size = Math.random() * 6 + 1;
    this.shouldExplode = false;

    const colorVal = Math.round(0xffffff * Math.random());
    const r = colorVal >> 16;
    const g = (colorVal >> 8) & 255;
    const b = colorVal & 255;
    this.r = r;
    this.g = g;
    this.b = b;

  }

  update() {
    if (
      this.sy >= -2 ||
      this.y <= 100 ||
      this.x <= 0 ||
      this.x >= canvas.width 
    ) {
      this.shouldExplode = true;
    } else {
      this.sy += 0.01;
    }
    this.x += this.sx;
    this.y += this.sy;
  }

  draw() {
    ctx.fillStyle = `rgb(${this.r},${this.g},${this.b})`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

class Particle {
  constructor(x, y, r, g, b) {
    this.x = x;
    this.y = y;
    this.sx = Math.random() * 10 - 1.5;
    this.sy = Math.random() * 10 - 1.5;
    this.size = Math.random() * 7+ 1;
    this.life = 100;
    this.r = r;
    this.g = g;
    this.b = b;
  }

  update() {
    this.x += this.sx;
    this.y += this.sy;
    this.life -= 1;
  }

  draw() {
    ctx.fillStyle = `rgba(${this.r}, ${this.g}, ${this.b}, ${this.life / 100})`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

const fireworks = [new Firework()];
const particles = [];
// function homePage(){
  
//   window.location.href="../html/levels.html";
// }
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (Math.random() < 0.05) {
        fireworks.push(new Firework());
    }

    for (let i = fireworks.length - 1; i >= 0; i--) {
        fireworks[i].update();
        fireworks[i].draw();

        if (fireworks[i].shouldExplode) {
            for (let j = 0; j < 50; j++) {
                particles.push(
                    new Particle(
                        fireworks[i].x,
                        fireworks[i].y,
                        fireworks[i].r,
                        fireworks[i].g,
                        fireworks[i].b
                    )
                );
            }
            fireworks.splice(i, 1);
        }
    }
    for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].draw();

        if (particles[i].life <= 0) {
            particles.splice(i, 1);
        }
    }
    ctx.fillStyle = "#000";
    ctx.font = "48px Arial";
    requestAnimationFrame(animate);
}
animate();