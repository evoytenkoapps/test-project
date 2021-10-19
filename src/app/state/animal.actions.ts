export class AddAnimal {
  static readonly type = '[Zoo] Add Animal';
  constructor(public animal: string) {}
}

export class ResetAnimals {
  static readonly type = '[Zoo] Reset Animal';
  constructor() {}
}

export class IncCounterAction {
  static readonly type = '[Zoo] IncCounterAction';
  constructor() {}
}

export class EmptyAction {
  static readonly type = '[Zoo] EmptyAction';
  constructor() {}
}
