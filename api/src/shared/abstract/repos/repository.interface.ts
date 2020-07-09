export interface IRepository<T> {
  get(itemId: number): T;
  add(item: T);
  update(itemId: number, item: T);
  delete(itemId: number);
}
