import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="flex justify-center space-x-4">
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <div className="text-xl font-PR_BL text-green-Normal ">ChitChat</div>
      <h1 className="text-3xl font-PR_L text-center mt-4">Vite + React</h1>
      <div className="card bg-gray-200 p-4 shadow-md rounded-lg mt-6 text-center">
        <button className="btn btn-primary" onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p className="mt-4">
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs mt-6 text-center">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;