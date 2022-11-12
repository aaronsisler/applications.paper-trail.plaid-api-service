interface Dao {
  create(object: Object): void;

  read(id: string | number): void;

  readAll(): void;

  update(): void;

  delete(): void;
}

export { Dao };
