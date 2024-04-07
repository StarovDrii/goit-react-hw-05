import { useEffect, useMemo, useState } from 'react'
import MovieList from '../../components/MovieList/MovieList'
import { getMovies } from '../../movies-api'
import { useSearchParams } from 'react-router-dom'
import MovieFilter from '../../components/MovieFilter/MovieFilter'
import Loader from '../../components/Loader/Loader'
import NotFoundPage from '../NotFoundPage/NotFoundPage'
import toast from 'react-hot-toast'
import css from './MoviesPage.module.css'

export default function MoviesPage() {
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)

  const [params] = useSearchParams()
  const movieFilter = params.get('query') ?? ''

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true)
        if (!movieFilter.trim()) {
        setMovies([])
        setIsLoading(false)
        return
      }
        const data = await getMovies(movieFilter)
        console.log(data);
        if (data.length === 0) {
          toast.error(
            'Sorry, there are no movies matching your search query. Please try again!',
            {
              position: 'top-right',
              style: {
                background: 'transparent',
              },
            },
          )
          return
        }
        setMovies(data)
      } catch (error) {
        setError(true)
      } finally {
        setIsLoading(false)
      }
    }
    getData()
  }, [movieFilter])

  const filteredMovies = useMemo(() => {
    return movies.filter((movies) =>
      movies.title
        .toLowerCase()
        .includes(movieFilter.toLowerCase()),
    )
  }, [movieFilter, movies])

  return (
    <div className={css.wrap}>
      <MovieFilter />
      {isLoading && <Loader />}
      {error && <NotFoundPage/>}
      {movies.length > 0 && (
        <MovieList items={filteredMovies} />
      )}
      {/* {movies.length === 0 && <NoMoviesMessage />} */}
    </div>
  )
}
