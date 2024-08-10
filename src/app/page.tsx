import { cookies } from 'next/headers';
const cookiesStore = cookies();
const App = () => {
  console.log(cookiesStore.get('saved')?.value);
  return <div>hello</div>;
};

export default App;
