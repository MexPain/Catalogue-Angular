import {Component, OnDestroy, OnInit} from '@angular/core';
import {ShowService} from "../../services/show.service";
import {ShowResult, ShowSearchResult} from "../../../models/ShowSerach";
import {Subscription} from "rxjs";
import {PageEvent} from "@angular/material/paginator";
import {Genre} from "../../../models/Genres";

/**
 * A collection of show-item components, shows the results when we are
 * searching for tv shows
 */
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

  /**
   * Returns the names of the provided genres' ids. Its required,
   * because responses not always contain the name of
   * the different genres, only the ids of them
   * @param ids The ids of the genres we are looking for
   */
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

  /**
   * Called when the search button is pressed, starts an api call
   * with the given text as query parameter, then shows the results
   * @param text The phrase we are searching for
   */
  searchShows(text: string) {
    this.searchText = text
    this.isLoading = true
    this.refreshShows(0, 10)
  }

  /**
   * Called when the state of the search result paginator changes
   * @param event contains information about the state of the paginator
   */
  onPageEvent(event: PageEvent) {
    this.refreshShows(event.pageIndex, event.pageSize)
  }

  ngOnDestroy(): void {
    if(this.showSub)
      this.showSub.unsubscribe()
    if(this.genreSub)
      this.genreSub.unsubscribe()
  }

  /**
   * Downloads, filters and refreshes the shown tv shows list depending on the given values
   * @param pageIndex The index of which page we are currently on
   * @param pageSize The amount of movies shown in the page
   * @private
   */
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
