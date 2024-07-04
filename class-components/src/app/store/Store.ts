type Observer = () => void;

class Observable {
  private observers: Observer[] = [];

  subscribe(observer: Observer) {
    this.observers.push(observer);
  }

  unsubscribe(observer: Observer) {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }

  notify() {
    this.observers.forEach((observer) => observer());
  }
}

export class Store extends Observable {
  private query: string = '';

  getQuery() {
    return this.query;
  }

  setQuery(newQuery: string) {
    this.query = newQuery;
    this.notify();
  }
}

const store = new Store();
export default store;
