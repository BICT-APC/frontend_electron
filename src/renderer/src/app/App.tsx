import { HashRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import { MainPage } from '../pages/MainPage/'

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
      </Routes>
    </HashRouter>
  )
}

export default App
