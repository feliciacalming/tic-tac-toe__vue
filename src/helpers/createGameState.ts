import { IGameState } from "../models/IGameState";
import { Player } from "../models/Player";

export function createGameState(): IGameState {
  let gameFromLS: IGameState = JSON.parse(
    localStorage.getItem("game") as string
  );

  if (gameFromLS === null) {
    return {
      players: [],
      gameboard: ["", "", "", "", "", "", "", "", ""],
      activePlayer: new Player("", "", [], 0),
      isGameActive: true,
      markedSquares: 0,
    };
  }

  return gameFromLS;
}
