import './App.css'
import Header from './components/header-component/Header';
import GamePage from './pages/GamePage';

function App() {
  return (
    <>
      < Header />
      <div id="root-content">
        <GamePage />
      </div>
    </>
  )
}

export default App
