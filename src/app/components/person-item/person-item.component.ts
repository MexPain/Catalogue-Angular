import {Component, Input, OnInit} from '@angular/core';
import { PersonResult as Person } from "../../../models/PersonSearch";
import {environment as env} from "../../../environments/environment";

@Component({
  selector: 'app-person-item',
  templateUrl: './person-item.component.html',
  styleUrls: ['./person-item.component.css']
})
export class PersonItemComponent implements OnInit {

  @Input() person!: Person
  baseImgUrl = env.IMAGE_BASE_URL

  constructor() { }

  ngOnInit(): void {
  }

}
