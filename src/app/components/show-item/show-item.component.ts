import {Component, Input, OnInit} from '@angular/core';
import {ShowResult as Show} from "../../../models/ShowSerach";
import {environment as env} from "../../../environments/environment";

/**
 * A card-view about a show and its most important details
 */
@Component({
  selector: 'app-show-item',
  templateUrl: './show-item.component.html',
  styleUrls: ['./show-item.component.css']
})
export class ShowItemComponent implements OnInit {

  /**
   * The show object, which details will be shown
   */
  @Input() show!: Show
  /**
   * A list of all the show's genres
   */
  @Input() filteredGenreNames: string[] = []

  baseImgUrl = env.IMAGE_BASE_URL

  constructor() { }

  ngOnInit(): void {
  }

}
