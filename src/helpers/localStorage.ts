import { Game } from "../models/Game";
import { IGameState } from "../models/IGameState";
import { Player } from "../models/Player";

export function saveToLocalStorage(gameState: IGameState) {
  localStorage.setItem("game", JSON.stringify(gameState));
}

export function getFromLocalStorage() {
  let gameFromLS: IGameState = JSON.parse(
    localStorage.getItem("game") ?? ("[]" as string)
  );

  gameFromLS.players.map((player) => {
    return new Player(
      player.username,
      player.playerSymbol,
      player.checkedSquares,
      player.score
    );
  });

  return gameFromLS;
}
