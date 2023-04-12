import { Player } from "./Player";

export interface IGameState {
  players: Player[];
  gameboard: number[];
  activePlayer: Player;
  isGameActive: boolean;
}
