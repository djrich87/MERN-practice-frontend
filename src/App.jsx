import { useState, useEffect } from 'react'
import { Route, Routes, NavLink, Navigate, useNavigate } from 'react-router-dom'
import './App.css'
import * as fishService from './services/fishes'
import * as authService from './services/authService'
import AddFish from './pages/AddFish/AddFish'
import FishList from './pages/FishList/FishList'
import EditFish from './pages/EditFish/EditFish'
import LoginPage from './pages/Login/Login'
import Profiles from './pages/Profiles/Profiles'
import Signup from './pages/Signup/Signup'
import ChangePassword from './pages/ChangePassword/ChangePassword'
import NavBar from './components/NavBar/NavBar'

function App() {
  const [fishes, setFishes] = useState([])
  const navigate = useNavigate()
  const [user, setUser] = useState(authService.getUser())


  useEffect(() => {
    if(user) {
      fishService.getAll()
      .then(allFishes => setFishes(allFishes))
    }
  }, [user])

  const handleAddFish = async newFishData => {
    const newFish = await fishService.create(newFishData)
    setFishes([...fishes, newFish])
    navigate('/')
  }

  const handleDeleteFish = id => {
    fishService.deleteOne(id)
    .then(deletedFish => setFishes(fishes.filter(fish => fish._id !== deletedFish._id)))
  }

  const handleUpdateFish = updatedFishData => {
    fishService.update(updatedFishData)
    .then(updatedFish => {
    const newFishesArray = fishes.map(fish => 
      fish._id === updatedFishData._id ? updatedFish: fish
    )
    setFishes(newFishesArray)
		navigate('/')
    })
  }

  const handleLogout = () => {
    authService.logout()
    setUser(null)
    navigate('/')
  }

  const handleSignupOrLogin = () => {
    setUser(authService.getUser())
  }


  return (
    <div className="App">
    <NavBar user={user} handleLogout={handleLogout} />
      <main>
        <Routes>
        <Route path='/add' element={<AddFish handleAddFish={handleAddFish}/>} />
        <Route
            path='/'
            element={
              user ?
              <FishList
                handleDeleteFish={handleDeleteFish}
                fishes={fishes}
                user={user} 
              />
              :
              <Navigate to='/login' />
            }
          />
        <Route path='/edit' element={<EditFish handleUpdateFish={handleUpdateFish}/>} />
        <Route
          path="/signup"
          element={<Signup handleSignupOrLogin={handleSignupOrLogin} />}
          />
          <Route
            path="/login"
            element={<LoginPage handleSignupOrLogin={handleSignupOrLogin} />}
          />
        <Route
            path="/changePassword"
            element={user ? <ChangePassword handleSignupOrLogin={handleSignupOrLogin}/> : <Navigate to="/login" />}
          />
        </Routes>
      </main>
    </div>
  )
}

export default App