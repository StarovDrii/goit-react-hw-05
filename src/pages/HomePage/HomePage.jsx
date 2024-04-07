import { useEffect, useState } from 'react'
import { getPopularMovies } from '../../movies-api'
import css from './HomePage.module.css'
import MovieList from '../../components/MovieList/MovieList'
import Loader from '../../components/Loader/Loader'
import NotFoundPage from '../NotFoundPage/NotFoundPage'

export default function HomePage() {
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)
  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true)
        setError(false)
        const data = await getPopularMovies()
        setMovies(data)
      } catch (error) {
        setError(true)
      } finally {
        setIsLoading(false)
      }
    }
    getData()
  }, [])

  return (
    <div className={css.wrap}>
      {isLoading && <Loader />}
      {error && <NotFoundPage />}
      <h2 className={css.title}>Today in top</h2>
      <MovieList items={movies} />
    </div>
  )
}
