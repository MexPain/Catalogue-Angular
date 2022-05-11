import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {PersonSearchResult} from "../../models/PersonSearch";
import {environment as env} from "../../environments/environment";
import {PersonResponse} from "../../models/Person";
import {PersonCredits} from "../../models/PersonCredits";

/**
 * Responsible for the different api calls regarding people
 */
@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(private http: HttpClient) { }

  /**
   * Returns people which has some connection to the given phase
   * @param search The phase we are searching for
   * @param page Which page of the paginated results are we looking for (default: 1)
   */
  searchPeople(search: string, page: number = 1): Observable<PersonSearchResult> {
    let params = new HttpParams()
      .set('query', search)
      .set("page", page)

    return this.http.get<PersonSearchResult>(`${env.BASE_URL}/search/person`, {
      params: params
    })
  }

  /**
   * Returns the details of the person with the given id
   * @param id The id of the person
   */
  getPerson(id: string): Observable<PersonResponse> {
    return this.http.get<PersonResponse>(`${env.BASE_URL}/person/${id}`)
  }

  /**
   * Returns a collection of movies and tv shows to which the person
   * with the given id is connected to as cast or crew member
   * @param id The id of the person
   */
  getCredits(id: string): Observable<PersonCredits> {
    return this.http.get<PersonCredits>(`${env.BASE_URL}/person/${id}/combined_credits`)
  }

}
