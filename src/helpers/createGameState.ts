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
  } else {
    gameFromLS.players = gameFromLS.players.map((player) => {
      return new Player(
        player.username,
        player.playerSymbol,
        player.checkedSquares,
        player.score
      );
    });

    gameFromLS.activePlayer = new Player(
      gameFromLS.activePlayer.username,
      gameFromLS.activePlayer.playerSymbol,
      gameFromLS.activePlayer.checkedSquares,
      gameFromLS.activePlayer.score
    );
  }

  return gameFromLS;
}
