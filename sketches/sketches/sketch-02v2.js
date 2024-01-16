const canvasSketch = require('canvas-sketch');
const { range } = require('canvas-sketch-util/random');
const { degToRad } = require('canvas-sketch-util/math');

const settings = {
    dimensions: [1080, 1080],
};

const sketch = () => {
    return ({ context, width, height }) => {
        context.fillStyle = '#ffffc7';
        context.fillRect(0, 0, width, height);

        context.fillStyle = '#548687';

        // Position the center at the top-left corner of the canvas
        const cx = 0;
        const cy = 0;
        const w = width * 0.01;
        const h = height * 0.1;

        const num = 12;
        // Increase the radius to fill the sketch
        const radius = Math.sqrt(width * width + height * height) / 2;

        for (let i = 0; i < num; i++) {
            const slice = degToRad(90 / num); // size of slice for a quarter circle
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
            context.strokeStyle = '#548687';

            context.beginPath();
            context.arc(0, 0, radius * range(0.5, 1), slice * range(1, -5), slice * range(0, 5));
            context.stroke();
            context.restore();
        }
    };
};

canvasSketch(sketch, settings);
