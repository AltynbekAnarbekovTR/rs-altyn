import { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);

  // eslint-disable-next-line react/react-in-jsx-scope
  return (
    <div className="App">
      <h1>Hello World</h1>
    </div>
  );
}

export default App;
