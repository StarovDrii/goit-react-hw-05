import { Link, useLocation } from 'react-router-dom'
import { posterBaseUrl } from '../../movies-api'

import css from './MovieList.module.css'

export default function MovieList({ items }) {
  const location = useLocation()

  return (
    <ul className={css.list}>
      {items.map((item) => (
        <li key={item.id} className={css.item}>
          <Link to={`/movies/${item.id}`} state={location}>
            <img
              src={`${posterBaseUrl}${item.poster_path}`}
              alt={item.title}
              className={css.img}
            />
          </Link>
        </li>
      ))}
    </ul>
  )
}
