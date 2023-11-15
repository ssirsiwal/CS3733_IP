import React from 'react';
import './App.css';
import { layout } from './Configs/LayoutConfig.js';

import Model, {Down, Up, Left, Right } from './Models/Model.js';
import { drawGrid, redrawCanvas } from './Boundaries/Boundaries.js';
import { useState, useRef } from 'react' 
import {moveNinja, shoveColor , removeBlockController, resetButton, selectConfig} from './Controllers/Controllers.js';
import ninjase from './ninjase.svg';
import {config_5x5 } from './Configs/puzzleConfigs.js';


function App() {
  // initial instantiation of the Model
  //const [currentConfig, setCurrentConfiguration] = React.useState(new Model(0));ù
  const [currentConfig, setCurrentConfig] = React.useState(0)
  const [model, setModel] = React.useState(new Model(currentConfig));  // only place where Model object is instantiated.
  const [redraw, forceRedraw] = React.useState(0);    // change values to force redraw
  const appRef = React.useRef(null);      // Later need to be able to refer to App 
  const canvasRef = React.useRef(null);   // Later need to be able to refer to Canvas

  /** Ensures initial rendering is performed, and that whenever model changes, it is re-rendered. */
  React.useEffect (() => {
    
    /** Happens once. */
    redrawCanvas(model, canvasRef.current, appRef.current);
  }, [model, redraw])   // this second argument is CRITICAL, since it declares when to refresh (whenever Model changes)

  // controller to handle moving

  const moveNinja = (direction) => {
    let newModel = moveNinja(model, direction);
    let newNewModel = shoveColor(newModel, direction);
    setModel(newNewModel); // react to changes, if model has changed.
  }
  
  const removeBlock = () => {
      let newModel = removeBlockController(model);
      setModel(newModel); // react to changes, if model has changed.
  }

  const resetGame = () => {
    let newModel = resetButton(model);
    setModel(new Model(currentConfig)); // react to changes, if model has changed.
}


const setConfig = (config) => {
  let newModel = selectConfig(model, config);
  setModel(newModel); // react to changes, if model has changed.
  setCurrentConfig(config)
  setModel(new Model(currentConfig))
}


  return (
    <main style={layout.Appmain} ref={appRef}>
      <h1 className='App-title'> SquarePush - Ninja-Se</h1>

      <canvas tabIndex="1"  
        data-testid="canvas"
        className="App-canvas"
        ref={canvasRef}
        width={layout.canvas.width}
        height={layout.canvas.height}
        />
        <img id="ninjase" src={ninjase} alt="hidden" hidden></img>
        <label className="scorecounter"> {"Score: " + model.score} </label>
        <label className="movecounter" > {"Move Counter: " + model.moves}</label>
        <div style = {layout.buttons}>

        <button style = {layout.config5x5}  onClick={(e) => setConfig(config_5x5)}> configuration 4x4 </button>
          <button style = {layout.config5x5} onClick={(e) => setConfig(config_5x5)}> configuration 5x5 </button>
          <button style = {layout.config6x6}   onClick={(e) => setConfig(2)}> configuration 6x6 </button>

          <button style = {layout.upbutton}  onClick={(e) => moveNinja(Up)} disabled ={!model.isAvailable(Up)}> Up </button>
          <button style = {layout.downbutton} onClick={(e) => moveNinja(Down)} disabled ={!model.isAvailable(Down)}> Down </button>
          <button style = {layout.leftbutton}   onClick={(e) => moveNinja(Left)} disabled ={!model.isAvailable(Left)}> Left </button>
          <button style = {layout.rightbutton}   onClick={(e) => moveNinja(Right)} disabled ={!model.isAvailable(Right)}> Right </button>
          <button style = {layout.removebutton} onClick={(e) => removeBlock()} disabled ={!model.isRemoveable()}>  Remove </button>
          <button style = {layout.resetbutton}  onClick={(e) => resetGame()}> Reset </button>
        </div>
       
    </main>
  );
}

export default App;
