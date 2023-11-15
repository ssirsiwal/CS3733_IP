import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Model from './Models/Model.js';
import App from './App';

// default puzzle to use
import { testConfig_5x5 as testInformation} from './Configs/Test5x5.js'; 
import { Up, Down, Left, Right } from './model/Model.js';

var actualPuzzle = JSON.parse(JSON.stringify(testConfig_5x5));   // parses string into JSON object, used below.

test('No moves when model created', () => {
  var model = new Model(actualPuzzle);

  expect(model.numMoves).toBe(0)
});
