import axios from 'axios'
axios.defaults.baseURL = 'https://api.themoviedb.org/3/'
axios.defaults.headers.common['Authorization'] =
  'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYTNjZWQxM2EyMzYwMTk2MDI3ZmRkYjQ1ZGJlZmMyNCIsInN1YiI6IjY2MDk4MDlkMDIxY2VlMDE3YzRjMzBlMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5bL-z4pmvgAHD8OK8yZjyPik-pBoF2bOtQi96ICdySw'
axios.defaults.headers.common['accept'] = 'application/json'
export const posterBaseUrl =
  'https://image.tmdb.org/t/p/w500'

export async function getMovieReviews(movieId) {
  const response = await axios.get(
    `movie/${movieId}/reviews`,
  )
  return response.data.results
}

export async function getMovieCredit(movieId) {
  const response = await axios.get(
    `movie/${movieId}/credits`,
  )
  return response.data.cast
}
export async function getMovieById(movieId) {
  const response = await axios.get(`movie/${movieId}`)
  return response.data
}

export async function getMovies(query) {
  const response = await axios.get('search/movie', {
    params: {
      query,
      include_adult: false,
      language: 'en-US',
      page: 1,
    },
  })
  return response.data.results
}

export async function getPopularMovies() {
  const response = await axios.get('trending/movie/day')
  return response.data.results
}
