import {Down, Up, Left, Right} from './Models/Model.js';
import { config_5x5, config_4x4, config_6x6 } from './Configs/PuzzleConfigs.js';

/**
 * function moveNinja moves Ninjase according to the user's request if possible
 * @param {Model} model 
 * @param {MoveType} direction 
 * @returns Model
 */
export function moveNinja(model, direction){
    let moved = false;

    if(model.isAvailable(direction) && moved === false){
        moved = true;
        if(direction === Up){ model.NinjaSeRow = model.NinjaSeRow - 1;}
        else if(direction === Down){ model.NinjaSeRow = model.NinjaSeRow + 1;}
        else if(direction === Left){ model.NinjaSeColumn = model.NinjaSeColumn - 1;}
        else if(direction === Right) { model.NinjaSeColumn = model.NinjaSeColumn + 1;}
        model.moves = model.moves + 1;
    }
    return model.copy();
}

export function pushColor(model, direction){
    let NinjaSe = model.board.grid[model.NinjaSeRow][model.NinjaSeColumn];
}