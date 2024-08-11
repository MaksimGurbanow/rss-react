import { Link } from '@remix-run/react';

const App = () => {
  return (
    <h3>
      Hello, you can move <Link to="/main/1">Here</Link>
    </h3>
  );
};

export default App;
