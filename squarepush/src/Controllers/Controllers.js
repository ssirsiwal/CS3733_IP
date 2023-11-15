
import { Down, Up, Left, Right } from '../Models/Model.js';
import { config_4x4, config_5x5, config_6x6 } from '../Configs/puzzleConfigs.js';

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
    return model.clone();
}

export function shoveColor(model, direction){
    let NinjaSe = model.board.grid[model.NinjaSeRow][model.NinjaSeColumn];
    if(direction === Up){ 
            
        if(NinjaSe.color !== "white"){
            model.score += 1;

            let checkedTop = false;
            let firstTopRow = model.NinjaSeRow - 1;
            let secondTopRow = model.NinjaSeRow - 2;
            let thirdTopRow = secondTopRow - 1;

            while(!checkedTop){

                if(firstTopRow < 0){
                    firstTopRow = firstTopRow + model.board.numberOfRows;
                }
                if(secondTopRow < 0){
                    secondTopRow = secondTopRow + model.board.numberOfRows;
                }
                if(thirdTopRow < 0){
                    thirdTopRow = thirdTopRow + model.board.numberOfRows;
                }
                
                
                if(model.board.grid[firstTopRow][model.NinjaSeColumn].color !== "white"){
                    model.score += 1;
                    if(model.board.grid[secondTopRow][model.NinjaSeColumn].color !== "white"){
                        model.board.grid[thirdTopRow][model.NinjaSeColumn].color = model.board.grid[secondTopRow][model.NinjaSeColumn].color;
                        model.score += 1;
                        model.board.grid[secondTopRow][model.NinjaSeColumn].color = model.board.grid[firstTopRow][model.NinjaSeColumn].color;
                        model.board.grid[firstTopRow][model.NinjaSeColumn].color = model.board.grid[model.NinjaSeRow][model.NinjaSeColumn].color;
                        checkedTop = true;
                    }
                    else{
                        model.board.grid[secondTopRow][model.NinjaSeColumn].color = model.board.grid[firstTopRow][model.NinjaSeColumn].color;
                        model.board.grid[firstTopRow][model.NinjaSeColumn].color = model.board.grid[model.NinjaSeRow][model.NinjaSeColumn].color;
                        checkedTop = true;
                    }
                }
                else{
                    model.board.grid[firstTopRow][model.NinjaSeColumn].color = model.board.grid[model.NinjaSeRow][model.NinjaSeColumn].color;
                    checkedTop = true;
                }
                }


            }

        if(model.board.grid[model.NinjaSeRow][(model.NinjaSeColumn + 1)].color !== "white"){
            model.score += 1;

            let checkedTop = false;
            let firstTopRow = model.NinjaSeRow - 1;
            let secondTopRow = model.NinjaSeRow - 2;
            let thirdTopRow = secondTopRow - 1;

            while(!checkedTop){

                if(firstTopRow < 0){
                    firstTopRow = firstTopRow + model.board.numberOfRows;
                }
                if(secondTopRow < 0){
                    secondTopRow = secondTopRow + model.board.numberOfRows;
                }
                if(thirdTopRow < 0){
                    thirdTopRow = thirdTopRow + model.board.numberOfRows;
                }
                
                

                if(model.board.grid[firstTopRow][model.NinjaSeColumn + 1].color !== "white"){
                    model.score += 1;
                    if(model.board.grid[secondTopRow][model.NinjaSeColumn + 1].color !== "white"){
                        model.board.grid[thirdTopRow][model.NinjaSeColumn + 1].color = model.board.grid[secondTopRow][model.NinjaSeColumn + 1].color;
                        model.score += 1;
                        model.board.grid[secondTopRow][model.NinjaSeColumn].color = model.board.grid[firstTopRow][model.NinjaSeColumn + 1].color;
                        model.board.grid[firstTopRow][model.NinjaSeColumn + 1].color = model.board.grid[model.NinjaSeRow][model.NinjaSeColumn + 1].color;
                        checkedTop = true;
                    }
                    else{
                        model.board.grid[secondTopRow][model.NinjaSeColumn + 1].color = model.board.grid[firstTopRow][model.NinjaSeColumn + 1].color;
                        model.board.grid[firstTopRow][model.NinjaSeColumn + 1].color = model.board.grid[model.NinjaSeRow][model.NinjaSeColumn + 1].color;
                        checkedTop = true;
                    }
                }
                else{
                    model.board.grid[firstTopRow][model.NinjaSeColumn + 1].color = model.board.grid[model.NinjaSeRow][model.NinjaSeColumn + 1].color;
                    checkedTop = true;
                }
                }

            }

            model.board.grid[model.NinjaSeRow][model.NinjaSeColumn].color = "white";
            model.board.grid[model.NinjaSeRow][model.NinjaSeColumn + 1].color = "white";
        }

    else if(direction === Down){ 
        
            if(model.board.grid[model.NinjaSeRow + 1][model.NinjaSeColumn].color !== "white"){
                model.score += 1;

                let checkedBelow = false;
                let firstRowBelow = model.NinjaSeRow + 2;
                let secondRowBelow = model.NinjaSeRow + 3;
                let thirdRowBelow = secondRowBelow + 1;

                while(!checkedBelow){

                    if(firstRowBelow > (model.board.numberOfRows - 1)){
                        firstRowBelow = firstRowBelow - model.board.numberOfRows; 
                    }
                    if(secondRowBelow > (model.board.numberOfRows - 1)){
                        secondRowBelow = secondRowBelow - model.board.numberOfRows;
                    }
                    if(thirdRowBelow > (model.board.numberOfRows - 1)){
                        thirdRowBelow = thirdRowBelow - model.board.numberOfRows;
                    }

                    
                    
                    if(model.board.grid[firstRowBelow][model.NinjaSeColumn].color !=="white"){
                        model.score += 1;
                        if(model.board.grid[secondRowBelow][model.NinjaSeColumn].color !=="white"){
                            model.board.grid[thirdRowBelow][model.NinjaSeColumn].color = model.board.grid[secondRowBelow][model.NinjaSeColumn].color;
                            model.score += 1;
                            model.board.grid[secondRowBelow][model.NinjaSeColumn].color = model.board.grid[firstRowBelow][model.NinjaSeColumn].color;
                            model.board.grid[firstRowBelow][model.NinjaSeColumn].color = model.board.grid[model.NinjaSeRow+1][model.NinjaSeColumn].color;
                            checkedBelow = true;
            
                        }
                        else{
                            model.board.grid[secondRowBelow][model.NinjaSeColumn].color = model.board.grid[firstRowBelow][model.NinjaSeColumn].color;
                            model.board.grid[firstRowBelow][model.NinjaSeColumn].color = model.board.grid[model.NinjaSeRow+1][model.NinjaSeColumn].color;
                            checkedBelow = true;
                        }
                    }
                    else{
                        model.board.grid[firstRowBelow][model.NinjaSeColumn].color = model.board.grid[model.NinjaSeRow + 1][model.NinjaSeColumn].color;
                        checkedBelow = true;
                    }
                    }


                }

            if(model.board.grid[model.NinjaSeRow + 1][(model.NinjaSeColumn + 1)].color !== "white"){
                model.score += 1;

                let checkedBelow = false;
                let firstRowBelow = model.NinjaSeRow + 2;
                let secondRowBelow = model.NinjaSeRow + 3;
                let thirdRowBelow = secondRowBelow + 1;

                while(!checkedBelow){

                    if(firstRowBelow > (model.board.numberOfRows - 1)){
                        firstRowBelow = firstRowBelow - model.board.numberOfRows;
                        
                    }
                    if(secondRowBelow > (model.board.numberOfRows - 1)){
                        secondRowBelow = secondRowBelow - model.board.numberOfRows;
                    }
                    if(thirdRowBelow > (model.board.numberOfRows - 1)){
                        thirdRowBelow = thirdRowBelow - model.board.numberOfRows;
                    }
                    

                    if(model.board.grid[firstRowBelow][model.NinjaSeColumn + 1].color !=="white"){
                        model.score += 1;
                        if(model.board.grid[secondRowBelow][model.NinjaSeColumn + 1].color !=="white"){
                            model.board.grid[thirdRowBelow][model.NinjaSeColumn + 1].color = model.board.grid[secondRowBelow][model.NinjaSeColumn + 1].color;
                            model.score += 1;
                            model.board.grid[secondRowBelow][model.NinjaSeColumn + 1].color = model.board.grid[firstRowBelow][model.NinjaSeColumn + 1].color;
                            model.board.grid[firstRowBelow][model.NinjaSeColumn + 1].color = model.board.grid[model.NinjaSeRow + 1][model.NinjaSeColumn + 1].color;
                            checkedBelow = true;
                        
                        }
                        else{
                            model.board.grid[secondRowBelow][model.NinjaSeColumn + 1].color = model.board.grid[firstRowBelow][model.NinjaSeColumn + 1].color;
                            model.board.grid[firstRowBelow][model.NinjaSeColumn + 1].color = model.board.grid[model.NinjaSeRow + 1][model.NinjaSeColumn + 1].color;
                            checkedBelow = true;
                        }
                    }
                    else{
                        model.board.grid[firstRowBelow][model.NinjaSeColumn + 1].color = model.board.grid[model.NinjaSeRow + 1][model.NinjaSeColumn + 1].color;
                        checkedBelow = true;
                    }
                    }

                }

                model.board.grid[model.NinjaSeRow + 1][model.NinjaSeColumn].color = "white";
                model.board.grid[model.NinjaSeRow + 1][model.NinjaSeColumn + 1].color = "white";

    }

    else if(direction === Left){ 
        
                if(model.board.grid[model.NinjaSeRow][model.NinjaSeColumn].color !=="white"){
                    model.score += 1;
    
                    let checkedLeft = false;
                    let firstColLeft = model.NinjaSeColumn - 1;
                    let secondColLeft = model.NinjaSeColumn - 2;
                    let thirdColLeft = secondColLeft - 1;
    
                    while(!checkedLeft){
    
                        if(firstColLeft < 0){
                            firstColLeft = firstColLeft + model.board.numberOfColumns;
                            
                        }
                        if(secondColLeft < 0){
                            secondColLeft = secondColLeft + model.board.numberOfColumns;
                        }
                        if(thirdColLeft < 0){
                            thirdColLeft = thirdColLeft + model.board.numberOfColumns;
                        }
                        
                        
                        if(model.board.grid[model.NinjaSeRow][firstColLeft].color !=="white"){
                            model.score += 1;
                            if(model.board.grid[model.NinjaSeRow][secondColLeft].color !=="white"){
                                model.board.grid[model.NinjaSeRow][thirdColLeft].color = model.board.grid[model.NinjaSeRow][secondColLeft].color;
                                model.score += 1;
                                model.board.grid[model.NinjaSeRow][secondColLeft].color = model.board.grid[model.NinjaSeRow][firstColLeft].color;
                                model.board.grid[model.NinjaSeRow][firstColLeft].color = model.board.grid[model.NinjaSeRow][model.NinjaSeColumn].color;
                                checkedLeft = true;
                
                            }
                            else{
                                model.board.grid[model.NinjaSeRow][secondColLeft].color = model.board.grid[model.NinjaSeRow][firstColLeft].color;
                                model.board.grid[model.NinjaSeRow][firstColLeft].color = model.board.grid[model.NinjaSeRow][model.NinjaSeColumn].color;
                                checkedLeft = true;
                            }
                        }
                        else{
                            model.board.grid[model.NinjaSeRow][firstColLeft].color = model.board.grid[model.NinjaSeRow][model.NinjaSeColumn].color;
                            checkedLeft = true;
                        }
                        }
    
    
                    }
    
                if(model.board.grid[model.NinjaSeRow + 1][(model.NinjaSeColumn)].color !== "white"){
                    model.score += 1;
    
                    let checkedLeft = false;
                    let firstColLeft = model.NinjaSeColumn - 1;
                    let secondColLeft = model.NinjaSeColumn - 2;
                    let thirdColLeft = secondColLeft - 1;
    
                    while(!checkedLeft){
    
                        if(firstColLeft < 0){
                            firstColLeft = firstColLeft + model.board.numberOfColumns;
                            
                        }
                        if(secondColLeft < 0){
                            secondColLeft = secondColLeft + model.board.numberOfColumns;
                        }
                        if(thirdColLeft < 0){
                            thirdColLeft = thirdColLeft + model.board.numberOfColumns;
                        }
                        
                        
                        if(model.board.grid[model.NinjaSeRow + 1][firstColLeft].color !=="white"){
                            model.score += 1;
                            if(model.board.grid[model.NinjaSeRow + 1][secondColLeft].color !=="white"){

                                model.board.grid[model.NinjaSeRow + 1][thirdColLeft].color = model.board.grid[model.NinjaSeRow + 1][secondColLeft].color;
                                model.score += 1;
                                model.board.grid[model.NinjaSeRow + 1][secondColLeft].color = model.board.grid[model.NinjaSeRow + 1][firstColLeft].color;
                                model.board.grid[model.NinjaSeRow + 1][firstColLeft].color = model.board.grid[model.NinjaSeRow + 1][model.NinjaSeColumn].color;
                                checkedLeft = true;
                
                            }
                            else{
                                model.board.grid[model.NinjaSeRow + 1][secondColLeft].color = model.board.grid[model.NinjaSeRow + 1][firstColLeft].color;
                                model.board.grid[model.NinjaSeRow + 1][firstColLeft].color = model.board.grid[model.NinjaSeRow + 1][model.NinjaSeColumn].color;
                                checkedLeft = true;
                            }
                        }
                        else{
                            model.board.grid[model.NinjaSeRow + 1][firstColLeft].color = model.board.grid[model.NinjaSeRow + 1][model.NinjaSeColumn].color;
                            checkedLeft = true;
                        }
                    }
    
                    }

                    model.board.grid[model.NinjaSeRow][model.NinjaSeColumn].color = "white";
                    model.board.grid[model.NinjaSeRow + 1][model.NinjaSeColumn].color = "white";

    }

    else if(direction === Right){ 
        
                    if(model.board.grid[model.NinjaSeRow][model.NinjaSeColumn + 1].color !=="white"){
                        model.score += 1;
        
                        let checkedRight = false;
                        let firstColRight = model.NinjaSeColumn + 2;
                        let secondColRight = model.NinjaSeColumn + 3;
                        let thirdColRight = secondColRight + 1;
        
                        while(!checkedRight){
        
                            if(firstColRight > (model.board.numberOfColumns - 1)){
                                firstColRight = firstColRight - model.board.numberOfColumns;
                                
                            }
                            if(secondColRight > (model.board.numberOfColumns - 1)){
                                secondColRight = secondColRight - model.board.numberOfColumns;
                            }
                            if(thirdColRight > (model.board.numberOfColumns - 1)){
                                thirdColRight = thirdColRight - model.board.numberOfColumns;
                            }
                            
                            
                            if(model.board.grid[model.NinjaSeRow][firstColRight].color !=="white"){
                                model.score += 1;
                                if(model.board.grid[model.NinjaSeRow][secondColRight].color !=="white"){
                                    model.board.grid[model.NinjaSeRow][thirdColRight].color = model.board.grid[model.NinjaSeRow][secondColRight].color;
                                    model.score += 1;
                                    model.board.grid[model.NinjaSeRow][secondColRight].color = model.board.grid[model.NinjaSeRow][firstColRight].color;
                                    model.board.grid[model.NinjaSeRow][firstColRight].color = model.board.grid[model.NinjaSeRow][model.NinjaSeColumn + 1].color;
                                    checkedRight = true;
                    
                                }
                                else{
                                    model.board.grid[model.NinjaSeRow][secondColRight].color = model.board.grid[model.NinjaSeRow][firstColRight].color;
                                    model.board.grid[model.NinjaSeRow][firstColRight].color = model.board.grid[model.NinjaSeRow][model.NinjaSeColumn + 1].color;
                                    checkedRight = true;
                                }
                            }
                            else{
                                model.board.grid[model.NinjaSeRow][firstColRight].color = model.board.grid[model.NinjaSeRow][model.NinjaSeColumn + 1].color;
                                checkedRight = true;
                            }
                            }
        
        
                        }
        
                    if(model.board.grid[model.NinjaSeRow + 1][(model.NinjaSeColumn + 1)].color !== "white"){
                        model.score += 1;
        
                        let checkedRight = false;
                        let firstColRight = model.NinjaSeColumn + 2;
                        let secondColRight= model.NinjaSeColumn + 3;
                        let thirdColRight = secondColRight + 1;
        
                        while(!checkedRight){
        
                            if(firstColRight > (model.board.numberOfColumns - 1)){
                                firstColRight = firstColRight - model.board.numberOfColumns;
                                
                            }
                            if(secondColRight > (model.board.numberOfColumns - 1)){
                                secondColRight = secondColRight - model.board.numberOfColumns;
                            }
                            if(thirdColRight > (model.board.numberOfColumns - 1)){
                                thirdColRight = thirdColRight - model.board.numberOfColumns;
                            }
                            
                            
                            if(model.board.grid[model.NinjaSeRow + 1][firstColRight].color !=="white"){
                                model.score += 1;
                                if(model.board.grid[model.NinjaSeRow + 1][secondColRight].color !=="white"){

                                    model.board.grid[model.NinjaSeRow + 1][thirdColRight].color = model.board.grid[model.NinjaSeRow + 1][secondColRight].color;
                                    model.score += 1;
                                    model.board.grid[model.NinjaSeRow + 1][secondColRight].color = model.board.grid[model.NinjaSeRow + 1][firstColRight].color;
                                    model.board.grid[model.NinjaSeRow + 1][firstColRight].color = model.board.grid[model.NinjaSeRow + 1][model.NinjaSeColumn + 1].color;
                                    checkedRight = true;
                    
                                }
                                else{
                                    model.board.grid[model.NinjaSeRow + 1][secondColRight].color = model.board.grid[model.NinjaSeRow + 1][firstColRight].color;
                                    model.board.grid[model.NinjaSeRow + 1][firstColRight].color = model.board.grid[model.NinjaSeRow + 1][model.NinjaSeColumn + 1].color;
                                    checkedRight = true;
                                }
                            }
                            else{
                                model.board.grid[model.NinjaSeRow + 1][firstColRight].color = model.board.grid[model.NinjaSeRow + 1][model.NinjaSeColumn + 1].color;
                                checkedRight = true;
                            }
                        }
        
                        }
    
                        model.board.grid[model.NinjaSeRow][model.NinjaSeColumn + 1].color = "white";
                        model.board.grid[model.NinjaSeRow + 1][model.NinjaSeColumn + 1].color = "white";
    
    }
    return model.clone();
}

export function removeBlockController(model){
    for(let r = 0; r < model.board.numberOfRows; r++){
        for(let c = 0; c < model.board.numberOfColumns; c = c + 2){
           if(model.board.grid[r][c].color !== "white"){
            let color = model.board.grid[r][c].color;

            if(r === 0){
                if(c === 0){
                    if((model.board.grid[r][c].color === color) &&
                        (model.board.grid[r + 1][c].color === color) &&
                        (model.board.grid[r][c + 1].color === color) &&
                        (model.board.grid[r + 1][c + 1].color === color)){
                            model.board.grid[r][c].color = "white";
                            model.board.grid[r + 1][c].color = "white";
                            model.board.grid[r][c + 1].color = "white";
                            model.board.grid[r + 1][c + 1].color = "white";
                            model.moves += 1; 
                            model.score += 4;
                    }
                }
                else if(c === (model.board.numberOfColumns - 1)){
                    if((model.board.grid[r][c].color === color) &&
                    (model.board.grid[r][c - 1].color === color) &&
                    (model.board.grid[r + 1][c].color === color) &&
                    (model.board.grid[r + 1][c - 1].color === color)){
                        model.board.grid[r][c].color = "white";
                        model.board.grid[r][c - 1].color = "white";
                        model.board.grid[r + 1][c].color = "white";
                        model.board.grid[r + 1][c - 1].color = "white";
                        model.moves += 1; 
                        model.score += 4;
                    }
                }
                else{
                    if((model.board.grid[r][c].color === color) &&
                    (model.board.grid[r + 1][c].color === color) &&
                    (model.board.grid[r][c + 1].color === color) &&
                    (model.board.grid[r + 1][c + 1].color === color)){
                        model.board.grid[r][c].color = "white";
                        model.board.grid[r + 1][c].color = "white";
                        model.board.grid[r][c + 1].color = "white";
                        model.board.grid[r + 1][c + 1].color = "white";
                        model.moves += 1; 
                        model.score += 4;
                    }
                }
            }
            else if(r === (model.board.numberOfRows - 1)){
                if(c === 0){
                    if((model.board.grid[r][c].color === color) &&
                    (model.board.grid[r - 1][c].color === color) &&
                    (model.board.grid[r][c + 1].color === color) &&
                    (model.board.grid[r - 1][c + 1].color === color)){
                        model.board.grid[r][c].color = "white";
                        model.board.grid[r - 1][c].color = "white";
                        model.board.grid[r][c + 1].color = "white";
                        model.board.grid[r - 1][c + 1].color = "white";
                        model.moves += 1; 
                        model.score += 4;
                    }
                }
                else if(c === (model.board.numberOfColumns - 1)){
                    if((model.board.grid[r][c].color === color) &&
                    (model.board.grid[r - 1][c].color === color) &&
                    (model.board.grid[r - 1][c - 1].color === color) &&
                    (model.board.grid[r][c - 1].color === color)){
                        model.board.grid[r][c].color = "white";
                        model.board.grid[r - 1][c].color = "white";
                        model.board.grid[r - 1][c - 1].color = "white";
                        model.board.grid[r][c - 1].color = "white";
                        model.moves += 1; 
                        model.score += 4;
                    }
                }
                else{
                    if((model.board.grid[r][c].color === color) &&
                    (model.board.grid[r - 1][c].color === color) &&
                    (model.board.grid[r][c + 1].color === color) &&
                    (model.board.grid[r - 1][c + 1].color === color)){
                        model.board.grid[r][c].color = "white";
                        model.board.grid[r - 1][c].color = "white";
                        model.board.grid[r][c + 1].color = "white";
                        model.board.grid[r - 1][c + 1].color = "white";
                        model.moves += 1; 
                        model.score += 4;
                    }
                }

            }
            else{
                if(c === 0){
                    if((model.board.grid[r][c].color === color) &&
                    (model.board.grid[r][c + 1].color === color) &&
                    (model.board.grid[r + 1][c].color === color) &&
                    (model.board.grid[r + 1][c + 1].color === color)){
                        model.board.grid[r][c].color = "white";
                        model.board.grid[r][c + 1].color = "white";
                        model.board.grid[r + 1][c].color = "white";
                        model.board.grid[r + 1][c + 1].color = "white";
                        model.moves += 1; 
                        model.score += 4;
                    }
                }
                else if(c === (model.board.numberOfColumns - 1)){
                    if((model.board.grid[r][c].color === color) &&
                    (model.board.grid[r][c - 1].color === color) &&
                    (model.board.grid[r - 1][c].color === color) &&
                    (model.board.grid[r - 1][c - 1].color === color)){
                        model.board.grid[r][c].color = "white";
                        model.board.grid[r][c - 1].color = "white";
                        model.board.grid[r - 1][c].color = "white";
                        model.board.grid[r - 1][c - 1].color = "white";
                        model.moves += 1; 
                        model.score += 4;
                    }
                }
            }
        }
    }
}
    return model.clone();
} 


export function resetButton(model){
    model.resetModel();
    return model.clone();
}

export function selectConfig(model, config){
    model.selectConfig(config);
    return model.clone();
}


