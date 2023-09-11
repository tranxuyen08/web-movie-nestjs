import axios from "axios"

export class MovieAPI {
  static getAllMovie(paginate : number,queryString : string,sortValue : string,valueProgress: number,genresValue : any) {
    const url = `http://localhost:8000/api/v1/movie?${queryString}`;
    const params = {
      page: paginate,
      limit: 12,
      _sort:sortValue,
      // _filter:,
      _genres:genresValue,
      _process:valueProgress
    };

    return axios.get(url, { params: params });
  }

  static getMovieShowSlide(cancelRequest: any) {
    const url = 'http://localhost:8000/api/v1/movie/popular'
    return axios.get(url, {
      signal: cancelRequest
    })
  }
  static getMovieRate() {
    const url = 'http://localhost:8000/api/v1/movie/rate'
    return axios.get(url)
  }
  static getMovieSearch(params : string) {
    const url = `http://localhost:8000/api/v1/movie/search?title=${params}`
    return axios.get(url)
  }
}