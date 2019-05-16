const canvasSketch = require('canvas-sketch');
const palettes = require('../1000.json');

const settings = {
  dimensions: [ 1024, 1024 ]
};

const sketch = ({ width, height }) => {
  const margin = width * 0.05;
  const boxWidth = width - margin * 2;
  const boxHeight = height - margin * 2;
  const cols = 16;
  const rows = Math.ceil(palettes.length / cols);
  const tileSize = [ boxWidth / cols, boxHeight / rows ];
  const cells = [];
  for (let y = 0, c = 0; y < rows; y++) {
    for (let x = 0; x < cols && c < palettes.length; x++, c++) {
      const px = margin + x * tileSize[0];
      const py = margin + y * tileSize[1];
      cells.push({
        position: [ px, py ],
        colors: palettes[c]
      });
    }
  }
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    cells.forEach(({ position, colors }) => {
      const slicePadding = 5;
      const sliceWidth = (tileSize[0] - slicePadding * 2) / colors.length;
      const sliceHeight = Math.max(sliceWidth, tileSize[1] - slicePadding * 2);
      colors.forEach((color, i) => {
        context.fillStyle = colors[i];
        context.fillRect(
          position[0] + sliceWidth * i,
          position[1],
          sliceWidth,
          sliceHeight
        );
      });
    });
  };
};

canvasSketch(sketch, settings);
