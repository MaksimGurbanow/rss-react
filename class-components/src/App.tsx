import React from 'react';
import './App.css';
import Search from './components/search/Search';
import List from './components/list/List';
import { getItemByID, queryItems } from './app/api';
import { IPokemon } from 'pokeapi-typescript';
import ErrorBoundary from './components/common/error-boundary/ErrorBoundary';
import Button from './components/ui/button/Button';

interface AppState {
  searchQuery: string;
  listData: IPokemon[];
  error: {
    isActive: boolean;
    message: string;
  };
}

class App extends React.Component<object, AppState> {
  constructor(props: object) {
    super(props);
    this.state = {
      searchQuery: '',
      listData: [],
      error: {
        isActive: false,
        message: '',
      },
    };
    this.updateQuery = this.updateQuery.bind(this);
    this.throwError = this.throwError.bind(this);
  }
  updateQuery(newQuery: string) {
    this.setState({ searchQuery: newQuery });
  }
  componentDidMount(): void {
    if (this.state.error.isActive) throw new Error('Error');
    queryItems()
      .then((v) => v.results)
      .then((items) => Promise.all(items.map((item) => getItemByID(item.url))))
      .then((res) => this.setState({ listData: res }))
      .catch((error) => {
        console.error('Error fetching items:', error);
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
          onSearch={() => console.log('searching...')}
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

const WrappedApp = () => (
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);

export default WrappedApp;
