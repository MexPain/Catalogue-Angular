import {Component, OnDestroy, OnInit} from '@angular/core';
import {MovieService} from "../../services/movie.service";
import {MovieResult, MovieSearchResult} from "../../../models/MovieSearch";
import {Genre} from "../../../models/Genres";
import {Subscription} from "rxjs";
import {PageEvent} from "@angular/material/paginator";

/**
 * A collection of movie-item components, shows the results when we are
 * searching for movies
 */
@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit, OnDestroy {

  movies!: MovieSearchResult
  filteredMovieList: MovieResult[] = []

  movieSub!: Subscription

  genreSub!: Subscription
  allGenres: Genre[] | undefined = []

  isLoading: boolean = false
  searchText: string = ""

  constructor(private movieService: MovieService) {
  }

  ngOnInit(): void {
    this.genreSub = this.movieService.getListOfGenres().subscribe((resp) => {
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
  searchMovies(text: string) {
    this.searchText = text
    this.isLoading = true
    this.refreshMovies(0, 10)
  }

  /**
   * Called when the state of the search result paginator changes
   * @param event contains information about the state of the paginator
   */
  onPageEvent(event: PageEvent) {
    this.refreshMovies(event.pageIndex, event.pageSize)
  }

  ngOnDestroy(): void {
    if(this.movieSub)
      this.movieSub.unsubscribe()
    if(this.genreSub)
      this.genreSub.unsubscribe()
  }

  /**
   * Downloads, filters and refreshes the shown trending movies list depending on the given values
   * @param pageIndex The index of which page we are currently on
   * @param pageSize The amount of movies shown in the page
   * @private
   */
  private refreshMovies(pageIndex: number, pageSize: number) {
    let page = ((pageIndex*pageSize)/20) + 1
    this.movieSub = this.movieService.searchMovies(this.searchText, page).subscribe( (resp) => {
      if(resp.results) {
        let first = (pageIndex * pageSize) % 20
        let until = first + pageSize
        this.filteredMovieList = resp.results.slice(first, until)
      }
      this.movies = resp
      this.isLoading = false
    })
  }
}
