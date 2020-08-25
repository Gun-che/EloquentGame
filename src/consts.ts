import { Coin } from './actors/Coin'
import { Lava } from './actors/Lava'
import { Player } from './actors/Player'
import { Monster } from './actors/Monster';

export const levelChars: {
  '.': 'empty',
  '#': 'wall',
  '+': 'lava',
  '@': typeof Player,
  'o': typeof Coin,
  '=': typeof Lava,
  'v': typeof Lava,
  '|': typeof Lava,
  'M': typeof Monster,
} = {
  '.': 'empty',
  '#': 'wall',
  '+': 'lava',
  '@': Player,
  'o': Coin,
  '=': Lava,
  'v': Lava,
  '|': Lava,
  'M': Monster,
}


export const scale = 20;

export const wobbleSpeed = 8;

export const wobbleDist = 0.07;

export const playerXSpeed = 7;

export const monsterSpeed = 4;

export const gravity = 30;

export const jumpSpeed = 17;

export const playerXOverlap = 4;