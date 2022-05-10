import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {MovieService} from "../../services/movie.service";
import {ShowService} from "../../services/show.service";
import {MovieResult} from "../../../models/MovieSearch";
import {ShowResult} from "../../../models/ShowSerach";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.css']
})
export class RecommendationsComponent implements OnInit, OnDestroy, OnChanges {

  @Input() mediaType!: "movie" | "tv"
  @Input() id!: number
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
