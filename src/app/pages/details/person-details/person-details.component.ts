import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {PersonResponse as Person} from "../../../../models/Person";
import {ActivatedRoute, Params} from "@angular/router";
import {PersonService} from "../../../services/person.service";
import {environment as env} from "../../../../environments/environment";
import {Cast, Crew, PersonCredits} from "../../../../models/PersonCredits";
import {PageEvent} from "@angular/material/paginator";

/**
 * A detailed view about a person.
 */
@Component({
  selector: 'app-person-details',
  templateUrl: './person-details.component.html',
  styleUrls: ['./person-details.component.css']
})
export class PersonDetailsComponent implements OnInit, OnDestroy {

  routeSub!: Subscription
  personSub!: Subscription
  creditsSub!: Subscription
  personId!: string
  person!: Person
  credits!: PersonCredits

  mainCast: Cast[] = []
  mainCrew: Crew[] = []
  castLength = 0
  crewLength = 0

  baseImgUrl = env.IMAGE_BASE_URL

  constructor(private activatedRoute: ActivatedRoute,
              private personService: PersonService) { }

  ngOnInit(): void {
    this.routeSub = this.activatedRoute.params.subscribe( (params: Params) => {
      this.personId = params['id']
    })
    this.getPersonDetails(this.personId)
    this.getPersonCredits(this.personId)
  }

  /**
   * Called when the state of the cast list paginator changes
   * @param event contains information about the state of the paginator
   */
  setCastPageEvent(event: PageEvent) {
    this.getMainCast(event.pageIndex, event.pageSize)
  }

  /**
   * Called when the state of the crew list paginator changes
   * @param event contains information about the state of the paginator
   */
  setCrewPageEvent(event: PageEvent) {
    this.getMainCrew(event.pageIndex, event.pageSize)
  }

  private getPersonDetails(id: string) {
    this.personSub = this.personService.getPerson(id).subscribe( (resp) => {
      this.person = resp
    })
  }

  private getPersonCredits(id: string) {
    this.creditsSub = this.personService.getCredits(id).subscribe( (resp) => {
      this.credits = resp
      this.getMainCast(0, 10)
      this.getMainCrew(0, 10)

      this.castLength = resp.cast ? resp.cast.length : 0
      this.crewLength = resp.crew ? resp.crew.length : 0
    })
  }

  ngOnDestroy(): void {
    if(this.routeSub) {
      this.routeSub.unsubscribe()
    }
    if(this.personSub){
      this.personSub.unsubscribe()
    }
    if(this.creditsSub) {
      this.creditsSub.unsubscribe()
    }
  }

  private getMainCast(pageIndex: number, pageSize: number) {
    let first = pageIndex*pageSize
    let until = first + pageSize
    let castList = this.credits.cast?.slice(first, until)
    if(castList) {
      this.mainCast = castList
    }
  }

  private getMainCrew(pageIndex: number, pageSize: number) {
    let first = pageIndex*pageSize
    let until = first + pageSize
    let crewList = this.credits.crew?.slice(first, until)
    if(crewList) {
      this.mainCrew = crewList
    }
  }

  getGender() {
    switch (this.person.gender) {
      case 0: return "other1"
      case 1: return "woman"
      case 2: return "man"
      case 3: return "other2"
      default: return "unknown"
    }
  }

  getDeathdate() {
    return this.person.deathday ? this.person.deathday : "-"
  }
}
