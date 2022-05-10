import { Injectable } from '@angular/core';
import {Observable} from 'rxjs'
import {HttpClient, HttpParams} from '@angular/common/http'
import {ShowSearchResult} from "../../models/ShowSerach";
import { environment as env} from "../../environments/environment";
import {GenreList} from "../../models/Genres";
import {ShowResponse} from "../../models/Show";
import {SeasonDetails} from "../../models/SeasonDetails";
import {ShowCredits} from "../../models/ShowCredits";

@Injectable({
  providedIn: 'root'
})
export class ShowService {

  constructor(private http: HttpClient) { }

  searchShows(search: string, page: number = 1): Observable<ShowSearchResult> {
    let params = new HttpParams()
      .set('query', search)
      .set("page", page)

    return this.http.get<ShowSearchResult>(`${env.BASE_URL}/search/tv`, {
      params: params
    })
  }

  getListOfGenres(): Observable<GenreList> {
    return this.http.get<GenreList>(`${env.BASE_URL}/genre/tv/list`)
  }

  getShow(id: string): Observable<ShowResponse> {
    return this.http.get<ShowResponse>(`${env.BASE_URL}/tv/${id}`)
  }

  getSeason(showId: string, seasonNum: string): Observable<SeasonDetails> {
    return this.http.get<SeasonDetails>(`${env.BASE_URL}/tv/${showId}/season/${seasonNum}`)
  }

  getShowCredits(showId: string): Observable<ShowCredits> {
    return this.http.get<ShowCredits>(`${env.BASE_URL}/tv/${showId}/aggregate_credits`)
  }

  getTrendingShows(timeWindow: "day" | "week", page: number): Observable<ShowSearchResult> {
    let options = {
      params: new HttpParams().set("page", page)
    }
    return this.http.get<ShowSearchResult>(`${env.BASE_URL}/trending/tv/${timeWindow}`, options)
  }

  getRecommendations(id: number): Observable<ShowSearchResult> {
    return this.http.get<ShowSearchResult>(`${env.BASE_URL}/tv/${id}/recommendations`)
  }
}
