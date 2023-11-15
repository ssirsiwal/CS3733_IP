import { config_4x4, config_5x5, config_6x6 } from "../Configs/puzzleConfigs.js";

const configs = [ config_5x5, config_4x4, config_6x6 ]

// class MoveType constructs MoveType objs which hold the row/column change information for all moves
export class MoveType {
    constructor(deltaRow, deltaCol) {
        this.deltar = deltaRow;
        this.deltac = deltaCol;
    }

    /** 
    * function parse takes user input and interprets which move type is being called
    * @param {string} s 
    * @returns MoveType
    */
    static parse(s) {
        if(s === "down") {
            return Down;
        }
        else if(s === "up"){
            return Up;
        }
        else if(s === "left"){
            return Left;
        }
        else if(s === "right"){
            return Right;
        }

        return NoMove;
    }
}

// construct all five MoveType objs used in the game
export const Down = new MoveType(1, 0, "down");
export const Up = new MoveType(-1, 0, "up");
export const Left = new MoveType(0, -1, "left");
export const Right = new MoveType(0, 1, "right");
export const NoMove = new MoveType(0, 0, "*");

// class Coordinate constructs Coordinate objs that hold some element's row/column information 
export class Coordinate {
    constructor(row, col) {
        this.row = row;
        this.column = col;
    }
}

// class Piece constructs Piece objs that contain the row, column, and color information of a square
export class Piece {
    constructor(row, col, color) {
        this.row = row;
        this.column = col;
        this.color = color;
    }

    /**
     * function location returns the current board coordinates of the piece
     * @returns Coordinate
     */
    location() {
        return new Coordinate(this.row, this.column);
    }

    /**
     * function copy creates an exact copy of the piece in it's board coordinate position
     * @returns Piece
     */
    copy(){
        let s = new Piece(this.row, this.column, this.color);
        return s;
    }
}

// class PlayBoard creates PlayBoard objs that contain the number of rows and columns in the game board
export class PlayBoard {
    constructor (numRows, numColumns) {
        this.numRows = numRows;
        this.numCol = numColumns;
        this.grid = Array.from(Array(this.numRows), () => new Array(this.numRows));
    }

    /**
     * function clone creates a copy of the current PlayBoard obj
     * @returns PlayBoard
     */
    clone(){
        let r = this.numRows;
        let c = this.numCol;
        let b = new PlayBoard(r, c);

        for(let row = 0; row < this.numRows; row++){
            for(let col = 0; col < this.numCol; col++){
                b.grid[row][col] = this.grid[row][col].copy();
            }
        }
        return b;
    }


}

// class Model creates Model objs that contain the information about the construction of the game board and the config of the pieces
export default class Model {

    /**
     * function parseColumns converts the string column markers to intergers to make the value easier to interpret and manipulate
     * @param {string} s 
     * @returns {int} column value
     */
    parseColumn(s){
        if(s === "A"){ return 0;}
        else if(s === "B"){ return 1;}
        else if(s === "C"){ return 2;}
        else if(s === "D"){ return 3;}
        else if (s === "E"){ return 4;}
        else if( s === "F"){ return 5;}    
        else if( s === "G"){ return 6;} 
    }

    /**
     * function parseColor converts the string color value to the color value it represents for use by the code
     * @param {string} s 
     * @returns color
     */
    parseColor(s){
        if(s === "red"){ return 'red';}
        else if(s === "orange"){return 'orange';}
        else if(s === "blue"){ return 'blue';}
        else if(s === "yellow"){ return 'yellow';}
        else if (s === "brown"){ return 'brown';}
        else if (s === "green"){ return 'green';}
        else if (s === "gray"){ return 'gray';}
        else if (s === "purple"){ return 'purple';}

    }

    constructor(currentConfig) { 
        this.config = null;
        this.currentConfig = currentConfig;
        this.initialize(currentConfig);
    }
    
    /**
     * initialize takes a puzzle configuration and initializes gameplay using it's parameters
     * @param {puzzleConfig} currentConfig 
     */
    initialize(currentConfig){
        this.config = configs[currentConfig];
        this.score = 0;
        this.moves = 0;
        this.victory = false;
        console.log(this.config);

        this.NinjaSeRow = parseInt(this.config.ninjaRow) - 1;
        this.NinjaSeColumn = this.parseColumn(this.config.ninjaColumn);

        let numRows = parseInt(this.config.numRows);
        let numCol = parseInt(this.config.numColumns);

        this.playboard = new PlayBoard(numRows, numCol);
        
        for (let r = 0; r < numRows; r++) {
            for (let c = 0; c < numCol; c++) {
                this.board.grid[r][c] = new Piece(r,c, "white") //this is not working
            }
        }

        for(let i = 0; i < this.config.initial.length; i++){
            let c = Math.abs(this.config.initial[i].column.charCodeAt(0) - 65);
            let r = parseInt(this.config.initial[i].row) - 1;
            let color = this.parseColor(this.config.initial[i].color);
            this.board.grid[r][c].color = color;
        }
    }

    /**
     * function resetModel resets the model to the inital config
     * @param {puzzleConfig} currentConfig 
     */
    resetModel(currentConfig){

        this.config = configs[currentConfig];

        this.score = 0;
        this.moves = 0;
        this.victory = false;

        this.board.numRows = parseInt(this.config.numRows);
        this.board.numCol = parseInt(this.config.numColumns);

        this.NinjaSeRow = parseInt(this.config.ninjaRow) - 1;
        this.NinjaSeCol = this.parseColumn(this.config.ninjaColumn);

        for (let r = 0; r < this.board.numRows; r++) {
            for (let c = 0; c < this.board.numCol; c++) {
                if(this.board.grid[r][c].color !== "white"){
                    this.board.grid[r][c].color = "white";
                }
            }
        }

        for(let i = 0; i < this.config.initial.length; i++){
            let c = Math.abs(this.config.initial[i].column.charCodeAt(0) - 65);
            let r = parseInt(this.config.initial[i].row) - 1;
            let color = this.parseColor(this.config.initial[i].color);
            this.board.grid[r][c].color = color;
        }
    }

    /**
     * function selectConfig allows user to request a different puzzle config
     * @param {puzzleConfig} currentConfig 
     */
    selectConfig(currentConfig){
        
        this.config = configs[currentConfig];

        this.score = 0;
        this.moves = 0;
        this.victory = false;

        this.board.numRows = parseInt(this.config.numRows);
        this.board.numCol = parseInt(this.config.numCol);

        this.NinjaSeRow = parseInt(this.config.ninjaRow) - 1;
        this.NinjaSeCol = this.parseColumn(this.config.ninjaColumn);

        for (let r = 0; r < this.board.numRows; r++) {
            for (let c = 0; c < this.board.numCol; c++) {
                if(this.board.grid[r][c].color !== "white"){
                    this.board.grid[r][c].color = "white";
                }
            }
        }

        for(let i = 0; i < this.config.initial.length; i++){
            let c = Math.abs(this.config.initial[i].column.charCodeAt(0) - 65);
            let r = parseInt(this.config.initial[i].row) - 1;
            let color = this.parseColor(this.config.initial[i].color);
            this.board.grid[r][c].color = color;
        }
    }

    /**
     * function isAvailable is a function that takes the user's requested direction for ninjase to move and determines if that is an available move
     * @param {MoveType} direction 
     * @returns boolean
     */
    isAvailable(direction){
        if(this.NinjaSeRow === 0 && direction === Up){ return false; }
        else if(this.NinjaSeRow === (this.board.numberOfRows - 2) && direction === Down){ return false;}
        else if(this.NinjaSeColumn === 0 && direction === Left){ return false;}
        else if(this.NinjaSeColumn === (this.board.numberOfColumns - 2) && direction === Right){ return false;}
        else if(this.victory === true){return false;}
        else{
            return true;
        }
    }

    /**
     * function isRemovable determines wether the conditions have been met to remove a group of pieces
     * @returns boolean
     */
    isRemoveable(){
        for(let r = 0; r < this.board.numRows; r++){
            for(let c = 0; c < this.board.numCol; c = c + 2){
               if(this.board.grid[r][c].color !== "white"){
                let color = this.board.grid[r][c].color;

                if(r === 0){
                    if(c === 0){
                        if((this.board.grid[r][c].color === color) &&
                            (this.board.grid[r + 1][c].color === color) &&
                            (this.board.grid[r][c + 1].color === color) &&
                            (this.board.grid[r + 1][c + 1].color === color)){
                                return true;
                        }
                    }
                    else if(c === (this.board.numberOfColumns - 1)){
                        if((this.board.grid[r][c].color === color) &&
                        (this.board.grid[r][c - 1].color === color) &&
                        (this.board.grid[r + 1][c].color === color) &&
                        (this.board.grid[r + 1][c - 1].color === color)){
                            return true;
                        }
                    }
                    else{
                        if((this.board.grid[r][c].color === color) &&
                        (this.board.grid[r + 1][c].color === color) &&
                        (this.board.grid[r][c + 1].color === color) &&
                        (this.board.grid[r + 1][c + 1].color === color)){
                            return true;
                        }
                    }
                }
                else if(r === (this.board.numberOfRows - 1)){
                    if(c === 0){
                        if((this.board.grid[r][c].color === color) &&
                        (this.board.grid[r - 1][c].color === color) &&
                        (this.board.grid[r][c + 1].color === color) &&
                        (this.board.grid[r - 1][c + 1].color === color)){
                            return true;
                        }
                    }
                    else if(c === (this.board.numberOfColumns - 1)){
                        if((this.board.grid[r][c].color === color) &&
                        (this.board.grid[r - 1][c].color === color) &&
                        (this.board.grid[r - 1][c - 1].color === color) &&
                        (this.board.grid[r][c - 1].color === color)){
                            return true;
                        }
                    }
                    else{
                        if((this.board.grid[r][c].color === color) &&
                        (this.board.grid[r - 1][c].color === color) &&
                        (this.board.grid[r][c + 1].color === color) &&
                        (this.board.grid[r - 1][c + 1].color === color)){
                            return true;
                        }
                    }

                }
                else{
                    if(c === 0){
                        if((this.board.grid[r][c].color === color) &&
                        (this.board.grid[r][c + 1].color === color) &&
                        (this.board.grid[r + 1][c].color === color) &&
                        (this.board.grid[r + 1][c + 1].color === color)){
                            return true;
                        }
                    }
                    else if(c === (this.board.numberOfColumns - 1)){
                        if((this.board.grid[r][c].color === color) &&
                        (this.board.grid[r][c - 1].color === color) &&
                        (this.board.grid[r - 1][c].color === color) &&
                        (this.board.grid[r - 1][c - 1].color === color)){
                            return true;
                        }
                    }
                }
            }
        }
    }
        return false;
    } 

    /**
     * function clone creates a copy of the model
     * @returns Model
     */
    clone(){
        let m = new Model(this.currentConfig);
        m.board = this.board.clone();
        m.NinjaSeRow = this.NinjaSeRow;
        m.NinjaSeColumn = this.NinjaSeColumn;
        m.moves = this.moves;
        m.score = this.score;
        m.victory = this.victory;
        return m;
    }

    /**
     * function isVictorious determines if the model has met the conditions for the user to be victorious
     * @returns boolean
     */
    isVictorious(){
        for(let r = 0; r < this.board.numRows; r++){
            for(let c = 0; c < this.board.numCol; c++){
                if(this.board.grid[r][c].color !== "white"){
                    return false;
                }
            }
        }
        this.victory = true;
        return true;
    }

    }



        

