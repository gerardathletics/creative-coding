// Sketch agents

const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');

const settings = {
    dimensions: [1080, 1080],
    animate: true,
};

const sketch = ({ context, width, height }) => {
    const agents = [];
    const agents2 = [];

    const agentsCount = 40;

    for (let i = 0; i < agentsCount; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        agents.push(new Agent(x, y, '#F3D7CA'));
        agents2.push(new Agent(x, y, '#E6A4B4'));
    }

    return ({ context, width, height }) => {
        context.fillStyle = '#F5EEE6';
        context.fillRect(0, 0, width, height);

        agents.forEach((agent) => {
            agent.update();
            agent.draw(context);
            agent.bounce(width, height);
        });

        agents2.forEach((agent) => {
            agent.update();
            agent.draw(context);
            agent.bounce(width, height);
        });
    };
};

canvasSketch(sketch, settings);

class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class Agent {
    constructor(x, y, color) {
        this.pos = new Vector(x, y);
        this.vel = new Vector(random.range(-1, 1), random.range(-1, 1));
        this.radius = random.range(4, 20);
        this.color = color;
    }

    bounce(width, height) {
        if (this.pos.x <= 0 || this.pos.x >= width) {
            this.vel.x *= -1;
        }

        if (this.pos.y <= 0 || this.pos.y >= height) {
            this.vel.y *= -1;
        }
    }

    update() {
        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;
    }

    draw(context) {
        context.fillStyle = this.color;
        context.save();
        context.translate(this.pos.x, this.pos.y);

        context.lineWidth = 2;
        context.strokeStyle = this.color;
        context.beginPath();
        context.arc(0, 0, this.radius, 0, Math.PI * 2, false);

        context.fill();
        context.stroke();

        context.restore();
    }
}
