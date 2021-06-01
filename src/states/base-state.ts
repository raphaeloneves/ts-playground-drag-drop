type Listener<T> = (items: Array<T>) => void;

export abstract class State<T> {
  protected listeners: Array<Listener<T>> = [];
  protected dataSet: Array<T> = [];

  addListener(listener: Listener<T>) {
    this.listeners.push(listener);
  }

  add(item: T) {
    this.dataSet.push(item);
    this.executeListeners();
  }

  protected executeListeners() {
    for (const listener of this.listeners) {
      listener(this.dataSet.slice());
    }
  }
}