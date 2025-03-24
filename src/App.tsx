import { useState } from 'react'

import { Route,BrowserRouter as Router, Routes } from 'react-router'
import Insurance from './insurance'
import NotFoundPage from './common/NotFoundPage'
import Login from './login'
// import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <Routes>
          <Route path="/list" element={<Insurance />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path="/contact" element={<Contact />} /> */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>

    </>
  )
}

export default App
