
import { Route,BrowserRouter as Router, Routes } from 'react-router'
import Insurance from './insurance'
// import NotFoundPage from './common/NotFoundPage'
import Login from './login'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/list" element={<Insurance />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path="*" element={<NotFoundPage />} /> */}
        </Routes>
      </Router>

    </>
  )
}

export default App
