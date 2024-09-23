import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Signiin from './pages/Signiin'
import Signup from './pages/Signup'
import Profile from './pages/Profile'
import ErrorPage from './pages/ErrorPage'
import Header from './components/Header'

function App() {

  return (
    <Router>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/signin' element={<Signiin/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/*' element={<ErrorPage/>}/>

      </Routes>
    </Router>
  )
}

export default App
