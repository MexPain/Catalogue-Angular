import {Component, OnDestroy, OnInit} from '@angular/core';
import {MovieService} from "../../services/movie.service";
import {Subscription} from "rxjs";
import {MovieResult, MovieSearchResult} from "../../../models/MovieSearch";
import {PageEvent} from "@angular/material/paginator";
import {ShowResult, ShowSearchResult} from "../../../models/ShowSerach";
import {ShowService} from "../../services/show.service";
import {Genre} from "../../../models/Genres";

/**
 * The home page of the website. It contains recommendations of different
 * movies and tv shows with pagination
 */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  movieSub!: Subscription
  showSub!: Subscription
  movieGenreSub!: Subscription
  showGenreSub!: Subscription

  movies!: MovieSearchResult
  filteredMovieList: MovieResult[] = []
  allMovieGenres: Genre[] | undefined = []

  shows!: ShowSearchResult
  filteredShowList: ShowResult[] = []
  allShowGenres: Genre[] | undefined = []

  selectedMovieTimeWindow: "day" | "week" = "day"
  currentMoviePageIdx: number = 0
  currentMoviePageSize: number = 5

  selectedShowTimeWindow: "day" | "week" = "day"
  currentShowPageIdx: number = 0
  currentShowPageSize: number = 5

  constructor(private movieService: MovieService,
              private showService: ShowService) { }

  ngOnInit(): void {
    this.movieGenreSub = this.movieService.getListOfGenres().subscribe( (resp) => {
      this.allMovieGenres = resp.genres
    })
    this.showGenreSub = this.showService.getListOfGenres().subscribe( (resp) => {
      this.allShowGenres = resp.genres
    })
    this.refreshMovies(this.currentMoviePageIdx, this.currentMoviePageSize)
    this.refreshShows(this.currentShowPageIdx, this.currentShowPageSize)
  }

  /**
   * Returns the names of the provided genres' ids. Its required,
   * because responses not always contain the name of
   * the different genres, only the ids of them
   * @param ids The ids of the genres we are looking for
   * @param allGenres All the genres with ids and names of that media type
   */
  findGenreNames(ids: number[] | undefined, allGenres: Genre[] | undefined): string[] {
    let filtered: string[] = []
    if (ids) {
      allGenres?.map(genre => {
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
   * Called when the state of the trending movies paginator changes
   * @param event contains information about the state of the paginator
   */
  onMoviesPageEvent(event: PageEvent) {
    this.currentMoviePageIdx = event.pageIndex
    this.currentMoviePageSize = event.pageSize
    this.refreshMovies(event.pageIndex, event.pageSize)
  }

  /**
   * Called when the state of the trending shows paginator changes
   * @param event contains information about the state of the paginator
   */
  onShowsPageEvent(event: PageEvent) {
    this.currentShowPageIdx = event.pageIndex
    this.currentShowPageSize = event.pageSize
    this.refreshShows(event.pageIndex, event.pageSize)
  }

  /**
   * Downloads, filters and refreshes the shown trending movies list depending on the given values
   * @param idx The index of which page we are currently on
   * @param size The amount of movies shown in the page
   * @private
   */
  private refreshMovies(idx: number, size: number) {
    let page = ((idx*size)/20) + 1
    this.movieSub = this.movieService.getTrendingMovies(this.selectedMovieTimeWindow, page).subscribe( (resp) => {
      if(resp.results) {
        let first = (idx * size) % 20
        let until = first + size
        this.filteredMovieList = resp.results.slice(first, until)
      }
      this.movies = resp
    })
  }

  /**
   * Downloads, filters and refreshes the shown trending tv shows list depending on the given values
   * @param idx The index of which page we are currently on
   * @param size The amount of shows shown in the page
   * @private
   */
  private refreshShows(idx: number, size: number) {
    let page = ((idx*size)/20) + 1
    this.showSub = this.showService.getTrendingShows(this.selectedShowTimeWindow, page).subscribe( (resp) => {
      if(resp.results) {
        let first = (idx * size) % 20
        let until = first + size
        this.filteredShowList = resp.results.slice(first, until)
      }
      this.shows = resp
    })
  }

  ngOnDestroy(): void {
    if(this.movieSub)
      this.movieSub.unsubscribe()
    if(this.showSub)
      this.showSub.unsubscribe()
  }

  /**
   * Called when the user changes the value of the trending shows time window select field
   * Refreshes the trending shows
   */
  showTimeWindowChanged() {
    this.refreshShows(this.currentShowPageIdx, this.currentShowPageSize)
  }

  /**
   * Called when the user changes the value of the trending movies time window select field
   * Refreshes the trending movies
   */
  movieTimeWindowChanged() {
    this.refreshMovies(this.currentMoviePageIdx, this.currentMoviePageSize)
  }
}
