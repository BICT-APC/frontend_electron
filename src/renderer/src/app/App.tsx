import { HashRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import { MainPage } from '../pages/MainPage/'
import { LoginPage } from '../pages/loginPage'
import { AuthRoute } from './router/auth-router'

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={
            <AuthRoute>
              <MainPage />
            </AuthRoute>
          }
        />
      </Routes>
    </HashRouter>
  )
}

export default App