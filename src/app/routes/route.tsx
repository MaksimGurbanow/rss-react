import { Link } from '@remix-run/react';

const App = () => {
  return (
    <h3 data-testid="home-header">
      Hello, you can move{' '}
      <Link to="/main/1" data-testid="link-to-main">
        Here
      </Link>
    </h3>
  );
};

export default App;
