import {Component, OnDestroy, OnInit} from '@angular/core';
import {PersonService} from "../../services/person.service";
import {PersonResult, PersonSearchResult} from "../../../models/PersonSearch";
import {Subscription} from "rxjs";
import {PageEvent} from "@angular/material/paginator";

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

  searchPeople(text: string) {
    this.searchText = text
    this.isLoading = true
    this.refreshPeople(0,10)
  }

  onPageEvent(event: PageEvent) {
    this.refreshPeople(event.pageIndex, event.pageSize)
  }

  ngOnDestroy(): void {
    if(this.peopleSub) {
      this.peopleSub.unsubscribe()
    }
  }

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
