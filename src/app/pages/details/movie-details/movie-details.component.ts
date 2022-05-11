import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {MovieService} from "../../../services/movie.service";
import {Subscription} from "rxjs";
import {MovieResponse as Movie} from "../../../../models/Movie"
import { environment as env} from "../../../../environments/environment";
import {Cast, Credits} from "../../../../models/Credits";
import {PageEvent} from "@angular/material/paginator";

/**
 * A detailed view about a movie. It also shows the cast members and some recommended movies
 */
@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit, OnDestroy {
  routeSub!: Subscription
  movieSub!: Subscription
  creditsSub!: Subscription
  // movieId!: string
  movie!: Movie
  credits!: Credits
  directors: Cast[] = []

  filteredCast: Cast[] = []
  castLength: number = 0

  baseImgUrl = env.IMAGE_BASE_URL

  constructor(private activatedRoute: ActivatedRoute,
              private movieService: MovieService) { }

  ngOnInit(): void {
    this.routeSub = this.activatedRoute.params.subscribe((params: Params) => {
      let movieId: string = params['id']
      this.getMovieDetails(movieId)
      this.getCredits(movieId)
    })
  }

  private getMovieDetails(id: string) {
    this.movieSub = this.movieService.getMovie(id).subscribe((movieResp) => {
      this.movie = movieResp
    })
  }

  /**
   * Called when the state of the cast members' paginator changes
   * @param event contains information about the state of the paginator
   */
  onCastPageEvent(event: PageEvent) {
    this.filterMainCast(event.pageIndex, event.pageSize)
  }

  private getCredits(id: string) {
    this.creditsSub = this.movieService.getMovieCredits(id).subscribe( (creditsResp) => {
      this.credits = creditsResp
      this.castLength = creditsResp.cast ? creditsResp.cast.length : 0
      this.getDirector()
      this.filterMainCast(0, 10)
    })
  }

  ngOnDestroy(): void {
    if(this.movieSub) {
      this.movieSub.unsubscribe()
    }
    if(this.routeSub) {
      this.routeSub.unsubscribe()
    }
    if(this.creditsSub) {
      this.creditsSub.unsubscribe()
    }
  }

  private getDirector() {
    let directorList = this.credits.crew?.filter( (crewMember) => (
      crewMember.job === "Director"
    ))
    if(directorList) {
      this.directors = directorList
    }
  }

  private filterMainCast(pageIndex: number, pageSize: number) {
    let first = pageIndex*pageSize
    let until = first + pageSize
    let filteredList = this.credits.cast?.slice(first, until)
    if(filteredList) {
      this.filteredCast = filteredList
    }
  }

}
