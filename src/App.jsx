import { useEffect, useState } from 'react'
import {useDispatch} from 'react-redux'
import authService from './appwrite/auth'
import appwriteService from './appwrite/config'
import {login, logout} from './store/authSlice'
import {Header} from './components'
import {Outlet} from 'react-router-dom'
import './index.css'

// import './App.css'

function App() {

  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getUserData()
    .then((userData) => {
      if (userData) {
        dispatch(login({userData}))
      } else {
        dispatch(logout())
      }
    })
    .finally(() => setLoading(false))
  }, [])

  return !loading ? (
    <div className='bg-[#000000] '>
    <div className='sm:flex'>
    <Header/>
    <main>
    <Outlet />
    </main>
    {/* <Footer/> */}

    </div>
    </div>
  ) : null

}

export default App
