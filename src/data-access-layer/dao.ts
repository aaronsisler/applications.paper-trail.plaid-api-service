interface Dao {
  create(object: Object): void;

  // read(id: string | number): void;

  // readAll(id: string | number): void;

  update(updateKey: string, updateValue: any, id: number): void;

  delete(): void;
}

export { Dao };
