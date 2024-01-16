const canvasSketch = require('canvas-sketch');
const { range } = require('canvas-sketch-util/random');
const { degToRad } = require('canvas-sketch-util/math');

// npx canvas-sketch sketches/sketch-02.js
const settings = {
    dimensions: [1080, 1080],
};

const sketch = () => {
    return ({ context, width, height }) => {
        context.fillStyle = 'white';
        context.fillRect(0, 0, width, height);

        context.fillStyle = 'black';

        const cx = width * 0.5;
        const cy = height * 0.5;
        const w = width * 0.01;
        const h = height * 0.1;

        const num = 12;
        const radius = width * 0.3;

        for (let i = 0; i < num; i++) {
            const slice = degToRad(360 / num); // size of slice (30 degrees)
            const angle = slice * i; // angle of slice

            x = cx + radius * Math.sin(angle);
            y = cy + radius * Math.cos(angle);

            context.save();
            context.translate(x, y);
            context.rotate(-angle);
            context.scale(range(0, 2), range(0.2, 4));

            context.beginPath();
            context.rect(-w * 0.5, -h * 0.5, w, h);
            context.fill();
            context.restore();

            context.save();
            context.translate(cx, cy);
            context.rotate(-angle);

            context.lineWidth = range(1, 10);

            context.beginPath();
            context.arc(0, 0, radius * range(0.5, 1), slice * range(1, -5), slice * range(0, 5));
            context.stroke();
            context.restore();
        }
    };
};

canvasSketch(sketch, settings);
