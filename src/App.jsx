import { useContext, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { ThemeContext } from './provider/ThemeProvider/ThemeProvider'

function App() {
  const [count, setCount] = useState(0)
  const { theme, toggleTheme } = useContext(ThemeContext);
  const handleToggleTheme = () => {
    toggleTheme();

    const htmlElement = document.getElementById('html-theme');
    htmlElement.setAttribute('data-theme', theme);
  };
  return (
    <>
    <button className='btn btn-primary' onClick={handleToggleTheme}>Toggle Theme</button>
      <div>
       
        
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs text-" data-theme="valentine">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
