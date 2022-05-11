import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {MovieService} from "../../services/movie.service";
import {ShowService} from "../../services/show.service";
import {MovieResult} from "../../../models/MovieSearch";
import {ShowResult} from "../../../models/ShowSerach";
import {Subscription} from "rxjs";

/**
 * A collection of card-views about movies or tv shows which are similar to a given movie or tv show
 */
@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.css']
})
export class RecommendationsComponent implements OnInit, OnDestroy, OnChanges {

  /**
   * Specifies if the given item is a movie or a tv show
   */
  @Input() mediaType!: "movie" | "tv"
  /**
   * The id of the movie or show we want to find recommendations for
   */
  @Input() id!: number
  /**
   * The number of appearing items
   */
  @Input() amount!: number

  recommendedMovies!: MovieResult[] | undefined
  recommendedShows!: ShowResult[] | undefined

  movieSub!: Subscription
  showSub!: Subscription

  constructor(private movieService: MovieService,
              private showService: ShowService) { }

  ngOnInit(): void {
    console.log("Recomm on ninit")
    if(this.mediaType === 'movie') {
      this.movieSub = this.movieService.getRecommendations(this.id).subscribe( (resp) => {
        this.recommendedMovies = resp.results?.slice(0, this.amount)
      })
    }
    if(this.mediaType === 'tv') {
      this.showSub = this.showService.getRecommendations(this.id).subscribe( (resp) => {
        this.recommendedShows = resp.results?.slice(0, this.amount)
      })
    }
  }

  ngOnDestroy(): void {
    if(this.movieSub)
      this.movieSub.unsubscribe()
    if(this.showSub)
      this.showSub.unsubscribe()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(!changes['id'].firstChange)
      this.ngOnInit()
  }

}
