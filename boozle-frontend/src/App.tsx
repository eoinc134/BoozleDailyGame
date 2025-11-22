import React from 'react';
import './App.css'
import Header from './components/header-component/Header';
import GamePage from './pages/GamePage';

function App() {
  const [gameComplete, setGameComplete] = React.useState<boolean>(false)
  
  const handleGameComplete = () => {
    setGameComplete(true)
  }

  return (
    <>
      < Header gameComplete={gameComplete} />
      <div id="root-content">
        <GamePage onGameComplete= {() => handleGameComplete()} />
      </div>
    </>
  )
}

export default App
