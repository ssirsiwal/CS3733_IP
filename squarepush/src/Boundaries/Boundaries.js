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

export function redrawCanvas(model, canvasObj, appObj) {
    const ctx = canvasObj.getContext('2d');
    if (ctx === null) { return; }
    
    // clear the canvas area before rendering the coordinates held in state
    ctx.clearRect( 0,0, canvasObj.width, canvasObj.height);  

    if(model.board){
      drawGrid(ctx, model);

      // draw ninja
      let image = document.getElementById('ninjase');
      image.onload = ctx.drawImage(image, 
      (model.NinjaSeColumn * BOXSIZE) + OFFSET,
      (model.NinjaSeRow*BOXSIZE) + OFFSET, 
      (BOXSIZE * 2) - 2 * OFFSET, 
      (BOXSIZE * 2) - 2 * OFFSET
    );
    }

    if(model.isVictorious()){
      ctx.font = '25px san-serif';
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 8;
      ctx.strokeText('Well done, you won!',40, 155);
      ctx.fillStyle = 'GREEN';
      ctx.fillText('Well done, you won!', 40, 155);
    }

}