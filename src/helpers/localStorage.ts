export function saveToLocalStorage(element: any) {
  localStorage.setItem("game", JSON.stringify(element));
}
