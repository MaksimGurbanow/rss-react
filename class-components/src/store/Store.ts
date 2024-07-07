export class Store {
  get query() {
    return localStorage.getItem('queryString') || '';
  }

  set query(v: string) {
    localStorage.setItem('queryString', v);
  }
}

const store = new Store();

export default store;
