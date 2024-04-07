import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import {
  getMovieCredit,
  posterBaseUrl,
} from '../../movies-api'
import Loader from '../Loader/Loader'
import NotFoundPage from '../../pages/NotFoundPage/NotFoundPage'
import css from './MovieCast.module.css'

export default function MovieCast() {
  const { movieId } = useParams()

  const [cast, setCast] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true)
        const data = await getMovieCredit(movieId)
        setCast(data)
      } catch (error) {
        setError(true)
      } finally {
        setIsLoading(false)
      }
    }
    getData()
  }, [movieId])
  return (
  <div >
    {isLoading && <Loader />}
    {error && <NotFoundPage />}
    {cast && cast.length > 0 ? (
      <div className={css.wrap}>
        {cast.map((actor) => (
          actor.profile_path && (
            <div key={actor.id}
            className={css.card}>
              <img
                src={`${posterBaseUrl}${actor.profile_path}`}
                alt={actor.name}
                className={css.img}
              />
              <div className={css.cardInfo}><p>{actor.name}</p>
              <p>Character: {actor.character}</p></div>
            </div>
          )
        ))}
      </div>
    ) : (
      !isLoading && <p className={css.noCast}>No cast available</p>
    )}
  </div>
)
}
