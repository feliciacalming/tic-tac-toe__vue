import { Player } from "./Player";

export interface IGameState {
  players: Player[];
  activePlayer: 0;
  isGameActive: true;
}
