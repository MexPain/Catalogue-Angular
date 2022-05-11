import {Component, Input, OnInit} from '@angular/core';
import { PersonResult as Person } from "../../../models/PersonSearch";
import {environment as env} from "../../../environments/environment";

/**
 * A card-view about a person with some extra information about him/her
 */
@Component({
  selector: 'app-person-item',
  templateUrl: './person-item.component.html',
  styleUrls: ['./person-item.component.css']
})
export class PersonItemComponent implements OnInit {

  /**
   * The person whose details will be shown
   */
  @Input() person!: Person
  baseImgUrl = env.IMAGE_BASE_URL

  constructor() { }

  ngOnInit(): void {
  }

}
