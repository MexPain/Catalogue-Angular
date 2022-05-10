import {Component, Input, OnInit} from '@angular/core';
import {ShowResult as Show} from "../../../models/ShowSerach";
import {environment as env} from "../../../environments/environment";

@Component({
  selector: 'app-show-item',
  templateUrl: './show-item.component.html',
  styleUrls: ['./show-item.component.css']
})
export class ShowItemComponent implements OnInit {

  @Input() show!: Show
  @Input() filteredGenreNames: string[] = []

  baseImgUrl = env.IMAGE_BASE_URL

  constructor() { }

  ngOnInit(): void {
  }

}
