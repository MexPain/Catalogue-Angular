import { Injectable } from '@angular/core';
import {Observable} from 'rxjs'
import {HttpClient, HttpParams} from '@angular/common/http'
import { MovieResponse } from '../../models/Movie'
import { environment as env} from "../../environments/environment";
import {MovieSearchResult} from "../../models/MovieSearch";
import {GenreList} from "../../models/Genres";
import {Credits} from "../../models/Credits";

/**
 * Responsible for the different api calls regarding movies
 */
@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient) { }

  /**
   * Returns movies which has some connection to the given phase
   * @param search The phase we are searching for
   * @param page Which page of the paginated results are we looking for (default: 1)
   */
  searchMovies(search: string, page: number = 1): Observable<MovieSearchResult> {
    let params = new HttpParams()
      .set('query', search)
      .set("page", page)

    return this.http.get<MovieSearchResult>(`${env.BASE_URL}/search/movie`, {
      params: params
    })
  }

  /**
   * Returns all the movie genres
   */
  getListOfGenres(): Observable<GenreList> {
    return this.http.get<GenreList>(`${env.BASE_URL}/genre/movie/list`)
  }

  /**
   * Returns the details of the movie with the given id
   * @param id The id of the movie
   */
  getMovie(id: string): Observable<MovieResponse> {
    return this.http.get<MovieResponse>(`${env.BASE_URL}/movie/${id}`)
  }

  /**
   * Returns the credits of the movie with the given id
   * @param id The id of the movie
   */
  getMovieCredits(id: string): Observable<Credits> {
    return this.http.get<Credits>(`${env.BASE_URL}/movie/${id}/credits`)
  }

  /**
   * Returns the currently trending movies from the given time period
   * @param timeWindow The time period we want the results from (allowed: 'day' or 'week')
   * @param page Which page of the paginated results are we looking for
   */
  getTrendingMovies(timeWindow: "day" | "week", page: number): Observable<MovieSearchResult> {
    let options = {
      params: new HttpParams().set("page", page)
    }
    return this.http.get<MovieSearchResult>(`${env.BASE_URL}/trending/movie/${timeWindow}`, options)
  }

  /**
   * Returns similar movies to the one with the given id
   * @param id The id of the movie
   */
  getRecommendations(id: number): Observable<MovieSearchResult> {
    return this.http.get<MovieSearchResult>(`${env.BASE_URL}/movie/${id}/recommendations`)
  }
}
