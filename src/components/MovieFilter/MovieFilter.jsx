import { useSearchParams } from 'react-router-dom'
import css from './MovieFilter.module.css'
export default function MovieFilter() {
  const [params, setParams] = useSearchParams()
  const value = params.get('query') ?? ''

  const changeFilter = (newFilter) => {
    params.set('query', newFilter)
    setParams(params)
  }

  return (
    <div className={css.wrap}>
      <h2>Filter by title</h2>
      <input
        type="text"
        value={value}
        onChange={(e) =>
          changeFilter(e.target.value.trim())
        }
        placeholder="Search movies..."
        className={css.input}
      />
    </div>
  )
}
