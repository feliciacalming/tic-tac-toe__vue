import { IGameState } from "../models/IGameState";

export function saveToLocalStorage(gameState: IGameState) {
  localStorage.setItem("game", JSON.stringify(gameState));
}
