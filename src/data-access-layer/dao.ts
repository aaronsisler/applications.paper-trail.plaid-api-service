interface Dao {
  get(id: string | number): void;

  getAll(): void;

  create(object: Object): void;

  update(): void;

  delete(): void;
}

export { Dao };
