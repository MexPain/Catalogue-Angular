import {Component, OnDestroy, OnInit} from '@angular/core';
import {ShowService} from "../../services/show.service";
import {ShowResult, ShowSearchResult} from "../../../models/ShowSerach";
import {Subscription} from "rxjs";
import {PageEvent} from "@angular/material/paginator";
import {Genre} from "../../../models/Genres";

@Component({
  selector: 'app-shows',
  templateUrl: './shows.component.html',
  styleUrls: ['./shows.component.css']
})
export class ShowsComponent implements OnInit, OnDestroy {
  shows!: ShowSearchResult
  filteredShowsList: ShowResult[] = []

  private showSub!: Subscription

  genreSub!: Subscription
  allGenres: Genre[] | undefined = []

  isLoading: boolean = false
  searchText: string = ""

  constructor(private showService: ShowService) { }

  ngOnInit(): void {
    this.genreSub = this.showService.getListOfGenres().subscribe( (resp) => {
      this.allGenres = resp.genres
    })
  }

  findGenreNames(ids: number[] | undefined): string[] {
    let filtered: string[] = []
    if (ids) {
      this.allGenres?.map(genre => {
        if (ids.includes(<number>genre.id)) {
          if (genre.name != null) {
            filtered.push(genre.name)
          }
        }
      })
    }
    return filtered
  }

  searchShows(text: string) {
    this.searchText = text
    this.isLoading = true
    this.refreshShows(0, 10)
  }

  onPageEvent(event: PageEvent) {
    this.refreshShows(event.pageIndex, event.pageSize)
  }

  ngOnDestroy(): void {
    if(this.showSub)
      this.showSub.unsubscribe()
    if(this.genreSub)
      this.genreSub.unsubscribe()
  }

  private refreshShows(pageIndex: number, pageSize: number) {
    let page = ((pageIndex*pageSize)/20) + 1
    this.showSub = this.showService.searchShows(this.searchText, page).subscribe( (resp) => {
      if(resp.results) {
        let first = (pageIndex * pageSize) % 20
        let until = first + pageSize
        this.filteredShowsList = resp.results.slice(first, until)
      }
      this.shows = resp
      this.isLoading = false
    })
  }

}
