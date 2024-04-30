import { useState } from 'react'

import './App.css'
import Navigation from '../Navigation/Navigation'
import { Route, Routes } from 'react-router-dom'
import HomePage from '../../pages/HomePage/HomePage'
import MovieDetailsPage from '../../pages/MovieDetailsPage/MovieDetailsPage'
import MovieCast from '../MovieCast/MovieCast'
import MovieReviews from '../MovieReviews/MovieReviews'
import MoviesPage from '../../pages/MoviesPage/MoviesPage'
import NotFoundPage from '../../pages/NotFoundPage/NotFoundPage'


function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Navigation />
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/movies' element={<MoviesPage/>}/>
        <Route path='movies/:movieId' element={<MovieDetailsPage/>}>
          <Route path='cast' element={<MovieCast/>}/>
          <Route path='previews' element={<MovieReviews/>}/>
        </Route>
        <Route path='*' element={<NotFoundPage/>}/>
      </Routes>
    </div>
  )
}

export default App
