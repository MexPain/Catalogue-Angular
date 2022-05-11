import {Component, OnDestroy, OnInit} from '@angular/core';
import {PersonService} from "../../services/person.service";
import {PersonResult, PersonSearchResult} from "../../../models/PersonSearch";
import {Subscription} from "rxjs";
import {PageEvent} from "@angular/material/paginator";

/**
 * A collection of person-item components, shows the results when we are
 * searching for people
 */
@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit, OnDestroy {
  people!: PersonSearchResult
  filteredPeopleList: PersonResult[] = []

  peopleSub!: Subscription

  isLoading: boolean = false
  searchText: string = ""

  constructor(private personService: PersonService) { }

  ngOnInit(): void {
  }

  /**
   * Called when the search button is pressed, starts an api call
   * with the given text as query parameter, then shows the results
   * @param text The phrase we are searching for
   */
  searchPeople(text: string) {
    this.searchText = text
    this.isLoading = true
    this.refreshPeople(0,10)
  }

  /**
   * Called when the state of the search result paginator changes
   * @param event contains information about the state of the paginator
   */
  onPageEvent(event: PageEvent) {
    this.refreshPeople(event.pageIndex, event.pageSize)
  }

  ngOnDestroy(): void {
    if(this.peopleSub) {
      this.peopleSub.unsubscribe()
    }
  }

  /**
   * Downloads, filters and refreshes the shown people list depending on the given values
   * @param pageIndex The index of which page we are currently on
   * @param pageSize The amount of people shown in the page
   * @private
   */
  private refreshPeople(pageIndex: number, pageSize: number) {
    let page = ((pageIndex*pageSize)/20) + 1
    this.peopleSub = this.personService.searchPeople(this.searchText, page).subscribe( (resp) => {
      if(resp.results) {
        let first = (pageIndex * pageSize) % 20
        let until = first + pageSize
        this.filteredPeopleList = resp.results.slice(first, until)
      }
      this.people = resp
      this.isLoading = false
    })
  }

}
