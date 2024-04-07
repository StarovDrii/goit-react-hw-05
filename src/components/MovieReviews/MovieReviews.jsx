import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getMovieReviews } from '../../movies-api'
import Loader from '../Loader/Loader'
import NotFoundPage from '../../pages/NotFoundPage/NotFoundPage'
import css from './MovieReviews.module.css'

export default function MovieReviews() {
  const { movieId } = useParams()

  const [reviews, setReviews] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true)
        const data = await getMovieReviews(movieId)
        setReviews(data)
      } catch (error) {
        setError(true)
      } finally {
        setIsLoading(false)
      }
    }
    getData()
  }, [movieId])

  return (
  <div>
    {(isLoading && !reviews.length) && <Loader />}
    {error && <NotFoundPage />}
    {reviews.length > 0 ? (
      <div>
        {reviews.map((post) => (
          <div key={post.id}
          className={css.post}>
            <p className={css.author}>Author: {post.author}</p>
            <p>{post.content}</p>
          </div>
        ))}
      </div>
    ) : (
      !isLoading && <p className={css.noReviews}>No reviews available</p>
    )}
  </div>
)
}
