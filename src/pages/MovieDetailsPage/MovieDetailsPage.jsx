import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from 'react-router-dom'
import {
  getMovieById,
  posterBaseUrl,
} from '../../movies-api'
import { useState, useEffect, useRef, Suspense } from 'react'
import Loader from '../../components/Loader/Loader'
import NotFoundPage from '../NotFoundPage/NotFoundPage'
import css from './MovieDetailsPage.module.css'
export default function MovieDetailsPage() {
  const { movieId } = useParams()
  const [movie, setMovie] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)
  const location = useLocation()
const backLincRef = useRef(location.state ?? "/movies")
  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true)
        const data = await getMovieById(movieId)
        setMovie(data)
      } catch (error) {
        setError(true)
      } finally {
        setIsLoading(false)
      }
    }
    getData()
  }, [movieId])

  return (
    <div className={css.wrap}>
      {!error && <Link to={backLincRef.current} className={css.backlink}>Go back</Link>}
      {error && <NotFoundPage />}
      {isLoading && <Loader/>}
      
      {movie && (
        <div className={css.card}>
          <img
            src={`${posterBaseUrl}${movie.poster_path}`}
            alt={movie.title}
            className={css.poster}
          />
          <div className={css.info}>
            <h2 className={css.title}>{movie.title}</h2>
          <h3>Rating</h3>
          <p>{movie.vote_average}</p>
          <h3>Owerview</h3>
          <p>{movie.overview}</p>
          <h3>Genres</h3>
          <ul className={css.genres}>
            {movie.genres &&
              movie.genres.map((genre) => (
                <li key={genre.id}>
                  <p>{genre.name}</p>
                </li>
              ))}
            </ul>
            <ul className={css.details}>
              <li>
                <NavLink to="cast">Cast</NavLink>
              </li>
              <li>
                <NavLink to="reviews">Reviews</NavLink>
              </li>
            </ul>
          </div>
        </div>
      )}
        <Suspense fallback={null}>
              <Outlet />
            </Suspense>
    </div>
  )
}
