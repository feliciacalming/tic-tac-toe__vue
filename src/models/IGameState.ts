import { Player } from "./Player";

export interface IGameState {
  players: Player[];
  gameboard: string[];
  activePlayer: Player;
  isGameActive: boolean;
  markedSquares: number;
}
