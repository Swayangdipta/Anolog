import React from 'react'
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Home from './Components/Base/Home'
import Auth from './Components/Auth/Auth'
import {FiltersProvider} from './context/FiltersContext'
import BlogEditor from './Components/Blog/BlogEditor'
import Blog from './Components/Blog/Blog'
import { UserProvider } from './context/UserContext'
import { BlogProvider } from './context/BlogContext'

const App = () => {
  return (
    <BlogProvider>
    <FiltersProvider>
    <UserProvider>
    <Router>
      <ToastContainer theme='dark' position='bottom-left' />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/auth' element={<Auth />} />
        <Route path='/publish' element={<BlogEditor />} />
        <Route path='/blog/:blogId' element={<Blog />} />
      </Routes>
    </Router>
    </UserProvider>
    </FiltersProvider>
    </BlogProvider>
  )
}

export default App