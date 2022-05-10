import { Injectable } from '@angular/core';
import {Observable} from 'rxjs'
import {HttpClient, HttpParams} from '@angular/common/http'
import { MovieResponse } from '../../models/Movie'
import { environment as env} from "../../environments/environment";
import {MovieSearchResult} from "../../models/MovieSearch";
import {GenreList} from "../../models/Genres";
import {Credits} from "../../models/Credits";

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient) { }

  searchMovies(search: string, page: number = 1): Observable<MovieSearchResult> {
    let params = new HttpParams()
      .set('query', search)
      .set("page", page)

    return this.http.get<MovieSearchResult>(`${env.BASE_URL}/search/movie`, {
      params: params
    })
  }

  getListOfGenres(): Observable<GenreList> {
    return this.http.get<GenreList>(`${env.BASE_URL}/genre/movie/list`)
  }

  getMovie(id: string): Observable<MovieResponse> {
    return this.http.get<MovieResponse>(`${env.BASE_URL}/movie/${id}`)
  }

  getMovieCredits(id: string): Observable<Credits> {
    return this.http.get<Credits>(`${env.BASE_URL}/movie/${id}/credits`)
  }

  getTrendingMovies(timeWindow: "day" | "week", page: number): Observable<MovieSearchResult> {
    let options = {
      params: new HttpParams().set("page", page)
    }
    return this.http.get<MovieSearchResult>(`${env.BASE_URL}/trending/movie/${timeWindow}`, options)
  }

  getRecommendations(id: number): Observable<MovieSearchResult> {
    return this.http.get<MovieSearchResult>(`${env.BASE_URL}/movie/${id}/recommendations`)
  }
}
