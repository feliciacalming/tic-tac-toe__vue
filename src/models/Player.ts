export class Player {
  constructor(
    public username: string,
    public playerSymbol: string,
    public checkedSquares: number[],
    public score: number
  ) {}
}
