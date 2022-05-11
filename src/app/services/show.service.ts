import { Injectable } from '@angular/core';
import {Observable} from 'rxjs'
import {HttpClient, HttpParams} from '@angular/common/http'
import {ShowSearchResult} from "../../models/ShowSerach";
import { environment as env} from "../../environments/environment";
import {GenreList} from "../../models/Genres";
import {ShowResponse} from "../../models/Show";
import {SeasonDetails} from "../../models/SeasonDetails";
import {ShowCredits} from "../../models/ShowCredits";

/**
 * Responsible for the different api calls regarding tv shows
 */
@Injectable({
  providedIn: 'root'
})
export class ShowService {

  constructor(private http: HttpClient) { }

  /**
   * Returns shows which has some connection to the given phase
   * @param search The phase we are searching for
   * @param page Which page of the paginated results are we looking for (default: 1)
   */
  searchShows(search: string, page: number = 1): Observable<ShowSearchResult> {
    let params = new HttpParams()
      .set('query', search)
      .set("page", page)

    return this.http.get<ShowSearchResult>(`${env.BASE_URL}/search/tv`, {
      params: params
    })
  }

  /**
   * Returns all the tv show genres
   */
  getListOfGenres(): Observable<GenreList> {
    return this.http.get<GenreList>(`${env.BASE_URL}/genre/tv/list`)
  }

  /**
   * Returns the details of the show with the given id
   * @param id The id of the show
   */
  getShow(id: string): Observable<ShowResponse> {
    return this.http.get<ShowResponse>(`${env.BASE_URL}/tv/${id}`)
  }

  /**
   * Returns the details of a season of the given show with the given id
   * @param showId The id of the show
   * @param seasonNum The number of the season
   */
  getSeason(showId: string, seasonNum: string): Observable<SeasonDetails> {
    return this.http.get<SeasonDetails>(`${env.BASE_URL}/tv/${showId}/season/${seasonNum}`)
  }

  /**
   * Returns the credits of the show with the given id
   * @param showId The id of the show
   */
  getShowCredits(showId: string): Observable<ShowCredits> {
    return this.http.get<ShowCredits>(`${env.BASE_URL}/tv/${showId}/aggregate_credits`)
  }

  /**
   * Returns the currently trending tv shows from the given time period
   * @param timeWindow The time period we want the results from (allowed: 'day' or 'week')
   * @param page Which page of the paginated results are we looking for
   */
  getTrendingShows(timeWindow: "day" | "week", page: number): Observable<ShowSearchResult> {
    let options = {
      params: new HttpParams().set("page", page)
    }
    return this.http.get<ShowSearchResult>(`${env.BASE_URL}/trending/tv/${timeWindow}`, options)
  }

  /**
   * Returns similar shows to the one with the given id
   * @param id The id of the show
   */
  getRecommendations(id: number): Observable<ShowSearchResult> {
    return this.http.get<ShowSearchResult>(`${env.BASE_URL}/tv/${id}/recommendations`)
  }
}
