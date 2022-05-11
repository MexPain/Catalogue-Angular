import {Component, Input, OnInit} from '@angular/core';
import {MovieResult as Movie} from "../../../models/MovieSearch";
import {environment as env} from "../../../environments/environment";

/**
 * A card-view about a movie and its most important details
 */
@Component({
  selector: 'app-movie-item',
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.css']
})
export class MovieItemComponent implements OnInit {

  /**
   * The movie object, which details will be shown
   */
  @Input() movie!: Movie
  /**
   * A list of all the movie's genres
   */
  @Input() filteredGenreNames: string[] = []

  baseImgUrl = env.IMAGE_BASE_URL
  releaseYear: string | undefined

  constructor() { }

  ngOnInit(): void {
    this.releaseYear = this.movie.release_date?.toString().substring(0, 4)
  }
}
