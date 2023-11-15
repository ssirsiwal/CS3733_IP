import { Canvas } from 'canvas';
import {drawImage} from 'canvas';

const OFFSET = 8
const BOXSIZE = 100;

export function drawGrid(ctx, model) {
  //ctx.shadowColor = 'black';

  // draw board
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, model.board.numberOfRows*BOXSIZE, model.board.numberOfColumns*BOXSIZE);

  
  for (let r = 0; r < model.board.numberOfRows; r++) {
    for (let c = 0; c < model.board.numberOfColumns; c++) {
        let square = model.board.grid[r][c];
        ctx.fillStyle = square.color;
        ctx.fillRect(square.column * BOXSIZE + OFFSET, square.row * BOXSIZE + OFFSET, BOXSIZE - 2*OFFSET, BOXSIZE- 2*OFFSET);
      }
    }

}