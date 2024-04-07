import { Link } from 'react-router-dom'
import img from '../../img/error.webp'
import css from './NotFoundPage.module.css'
export default function NotFoundPage() {
  return (
    <div className={css.box}>
      <img src={img} alt="Error" className={css.img} />
      <b>Oops! Not found!</b>
      <Link to="/">Back to home page</Link>
    </div>
  )
}
