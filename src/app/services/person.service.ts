import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {PersonSearchResult} from "../../models/PersonSearch";
import {environment as env} from "../../environments/environment";
import {PersonResponse} from "../../models/Person";
import {PersonCredits} from "../../models/PersonCredits";

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(private http: HttpClient) { }

  searchPeople(search: string, page: number = 1): Observable<PersonSearchResult> {
    let params = new HttpParams()
      .set('query', search)
      .set("page", page)

    return this.http.get<PersonSearchResult>(`${env.BASE_URL}/search/person`, {
      params: params
    })
  }

  getPerson(id: string): Observable<PersonResponse> {
    return this.http.get<PersonResponse>(`${env.BASE_URL}/person/${id}`)
  }

  getCredits(id: string): Observable<PersonCredits> {
    return this.http.get<PersonCredits>(`${env.BASE_URL}/person/${id}/combined_credits`)
  }

}
