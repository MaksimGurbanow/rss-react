import React from 'react';
import './App.css';
import Search from './components/search/Search';
import List from './components/list/List';
import { queryItems } from './app/api';
import ErrorBoundary from './components/common/error-boundary/ErrorBoundary';
import Button from './components/ui/button/Button';
import store from './app/store/Store';
import { AppState } from './types/types';

class App extends React.Component<object, AppState> {
  constructor(props: object) {
    super(props);
    this.state = {
      searchQuery: store.getQuery(),
      listData: [],
      error: {
        isActive: false,
        message: '',
      },
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
    store.setQuery(searchQuery);
  }

  componentDidMount(): void {
    if (this.state.error.isActive) throw new Error('Error');
    queryItems(this.state.searchQuery)
      .then((response) => response.products)
      .then((res) => this.setState({ listData: res }))
      .catch((error) => {
        this.setState({
          error: {
            isActive: true,
            message: error,
          },
        });
      });
  }

  throwError() {
    this.setState({
      error: {
        isActive: true,
        message: 'Synthetic error message',
      },
    });
  }

  render(): React.ReactNode {
    if (this.state.error.isActive) {
      throw new Error(this.state.error.message);
    }

    return (
      <ErrorBoundary fallback={() => <div>{this.state.error.message}</div>}>
        <Search
          onChange={this.updateQuery}
          onSearch={this.handleSearchSubmit}
          value={this.state.searchQuery}
        />
        <List items={this.state.listData} />
        <Button onClick={this.throwError} className="fixed">
          Throw an error
        </Button>
      </ErrorBoundary>
    );
  }
}

export default App;
