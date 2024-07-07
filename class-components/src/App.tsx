import React from 'react';
import './App.css';
import Search from './components/search/Search';
import List from './components/list/List';
import { searchProducts } from './app/api';
import ErrorBoundary from './components/common/error-boundary/ErrorBoundary';
import Button from './components/ui/button/Button';
import { AppState } from './types/types';
import store from './store/Store';
import Loader from './components/common/loader/Loader';

class App extends React.Component<object, AppState> {
  constructor(props: object) {
    super(props);
    this.state = {
      searchQuery: store.query,
      listData: [],
      error: '',
      isLoading: false,
    };
    this.updateQuery = this.updateQuery.bind(this);
    this.throwError = this.throwError.bind(this);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
  }

  updateQuery(newQuery: string) {
    this.setState({ searchQuery: newQuery });
  }

  handleSearchSubmit() {
    const { searchQuery } = this.state;
    store.query = searchQuery;
    this.handleSearch();
  }

  handleSearch() {
    this.setState({ isLoading: true });
    searchProducts(this.state.searchQuery)
      .then((response) => response.products)
      .then((res) => this.setState({ listData: res }))
      .catch((error) => {
        this.setState({ error });
      })
      .finally(() => this.setState({ isLoading: false }));
  }

  componentDidMount(): void {
    if (this.state.error) throw new Error(this.state.error);
    this.handleSearch();
  }

  throwError() {
    this.setState({ error: 'Generated error' });
  }

  render(): React.ReactNode {
    if (this.state.error) {
      throw new Error(this.state.error);
    }

    return (
      <ErrorBoundary fallback={() => <div>{this.state.error}</div>}>
        <Search
          onChange={this.updateQuery}
          onSearch={this.handleSearchSubmit}
          value={this.state.searchQuery}
        />
        <List items={this.state.listData} />
        <Button onClick={this.throwError} className="fixed">
          Throw an error
        </Button>
        {this.state.isLoading && <Loader />}
      </ErrorBoundary>
    );
  }
}

export default App;
