#!/usr/bin/env node

import Color from './modules/Color.js';
import hexToRgb from './helpers/hex-to-rgb.js';
import Solver from './modules/Solver.js';

const [targetColor] = process.argv.slice(2);

if (!targetColor) {
  const __filename = new URL(import.meta.url).pathname;
  console.log(`Usage: ${__filename} "#hexColor"`);
  process.exit(1);
}

const rgb = hexToRgb(targetColor);

if (rgb.length !== 3) {
  console.error('Invalid format!');
  process.exit(1);
}

const color = new Color(rgb[0], rgb[1], rgb[2]);

let result;
let loss = Infinity;

const start = Date.now();

while (loss >= 0.005) {
  const solver = new Solver(color);
  result = solver.solve();

  loss = result.loss;
}

console.log(`Solved in: ${Date.now() - start}ms`);
console.log(`loss: ${result.loss.toFixed(5)}`);
console.log(result.filter);
