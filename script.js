const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Firework {
    constructor(x, y, color, shape) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.shape = shape;
        this.particles = [];
        for (let i = 0; i < 100; i++) {
            this.particles.push({
                x: x,
                y: y,
                vx: Math.cos((i / 50) * Math.PI) * (Math.random() * 5 + 2),
                vy: Math.sin((i / 50) * Math.PI) * (Math.random() * 5 + 2),
                alpha: 1,
                size: Math.random() * 4 + 2
            });
        }
    }
    update() {
        this.particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.alpha -= 0.015;
        });
        this.particles = this.particles.filter(p => p.alpha > 0);
    }
    draw() {
        this.particles.forEach(p => {
            ctx.globalAlpha = p.alpha;
            ctx.fillStyle = this.color;
            ctx.beginPath();
            if (this.shape === "heart") {
                ctx.moveTo(p.x, p.y);
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            } else if (this.shape === "star") {
                ctx.moveTo(p.x, p.y);
                for (let j = 0; j < 5; j++) {
                    let angle = (Math.PI * 2 * j) / 5;
                    ctx.lineTo(p.x + Math.cos(angle) * p.size, p.y + Math.sin(angle) * p.size);
                }
                ctx.closePath();
            } else {
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            }
            ctx.fill();
        });
    }
}

let fireworks = [];
function launchFirework() {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height / 2;
    const colors = ["#ffcc00", "#ff6699", "#ff3366", "#ff0000", "#ff3399", "#66ff66", "#3366ff"];
    const shapes = ["circle", "heart", "star"];
    fireworks.push(new Firework(x, y, colors[Math.floor(Math.random() * colors.length)], shapes[Math.floor(Math.random() * shapes.length)]));
}

function animate() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    fireworks.forEach(firework => {
        firework.update();
        firework.draw();
    });
    fireworks = fireworks.filter(firework => firework.particles.length > 0);
    requestAnimationFrame(animate);
}

setInterval(launchFirework, 1000);
animate();
