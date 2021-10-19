export class AddAnimal {
  static readonly type = '[Zoo] Add Animal';
  constructor(public animal: string) {}
}
