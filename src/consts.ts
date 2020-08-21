import { Coin } from './actors/Coin'
import { Lava } from './actors/Lava'
import { Player } from './actors/Player'

export const levelChars: {
  '.': 'empty',
  '#': 'wall',
  '+': 'lava',
  '@': typeof Player,
  'o': typeof Coin,
  '=': typeof Lava,
  'v': typeof Lava,
  '|': typeof Lava,
} = {
  '.': 'empty',
  '#': 'wall',
  '+': 'lava',
  '@': Player,
  'o': Coin,
  '=': Lava,
  'v': Lava,
  '|': Lava,
}


export const scale = 20;

export const wobbleSpeed = 8;

export const wobbleDist = 0.07;

export const playerXSpeed = 7;

export const gravity = 30;

export const jumpSpeed = 17;