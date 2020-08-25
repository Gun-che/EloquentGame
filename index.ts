import { level1, level2 } from './src/levels';
import { runGame } from "./src/runFunctions"
import { DOMDisplay } from './src/Displays/DOMDisplay';
import { CanvasDisplay } from './src/Displays/CanvasDisplay';


runGame([level1, level2], CanvasDisplay)