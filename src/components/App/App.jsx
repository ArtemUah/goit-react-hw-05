import { Suspense, lazy, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'

const Navigation = lazy(()=> import('../Navigation/Navigation'));
const MovieDetailsPage = lazy(()=> import('../../pages/MovieDetailsPage/MovieDetailsPage'));
const HomePage = lazy(()=>import('../../pages/HomePage/HomePage'));
const MovieCast = lazy(()=> import('../MovieCast/MovieCast'));
const MovieReviews = lazy(()=>import('../MovieReviews/MovieReviews'));
const MoviesPage = lazy(()=> import('../../pages/MoviesPage/MoviesPage'));
const NotFoundPage = lazy(()=> import('../../pages/NotFoundPage/NotFoundPage'))

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Navigation />
      <Suspense fallback={null}>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/movies' element={<MoviesPage/>}/>
        <Route path='movies/:movieId' element={<MovieDetailsPage/>}>
          <Route path='cast' element={<MovieCast/>}/>
          <Route path='previews' element={<MovieReviews/>}/>
        </Route>
        <Route path='*' element={<NotFoundPage/>}/>
      </Routes>
      </Suspense>
    </div>
  )
}

export default App
