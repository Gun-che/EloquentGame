import { level1, level2 } from './src/levels';
import { runGame } from "./src/runFunctions"
import { DOMDisplay } from './src/Displays/DOMDisplay';

runGame([level1, level2], DOMDisplay)