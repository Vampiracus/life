import { useState } from "react"
import Game from "./components/Game"
import './App.css'

function App() {
  const [n, setN] = useState(15)
  const [isGameOn, setIsGameOn] = useState(false)

  function onClick() {
    setIsGameOn(true)
  }

  if (isGameOn) {
    return (
      <Game n={n} />
    )
  }

  return (
    <>
      <label htmlFor="nsetter">Размерность матрицы: {n}</label> <br/>
      <input
        id='nsetter'
        type="range"
        min={15}
        max={100}
        value={n}
        onChange={(e) => setN(e.target.value)}
      />
      <br></br>
      <button onClick={onClick}>Начать!</button>
    </>
  )
}

export default App
