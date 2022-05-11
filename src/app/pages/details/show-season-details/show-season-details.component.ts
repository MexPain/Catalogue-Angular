import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {ActivatedRoute, Params} from "@angular/router";
import {ShowService} from "../../../services/show.service";
import {SeasonDetails} from "../../../../models/SeasonDetails";
import {environment as env} from "../../../../environments/environment";

/**
 * A detailed view about a season of a tv show.
 */
@Component({
  selector: 'app-show-season-details',
  templateUrl: './show-season-details.component.html',
  styleUrls: ['./show-season-details.component.css']
})
export class ShowSeasonDetailsComponent implements OnInit, OnDestroy {
  routeSub!: Subscription
  seasonSub!: Subscription

  season!: SeasonDetails

  baseImgUrl = env.IMAGE_BASE_URL

  exPanelStep = 1;

  constructor(private activatedRoute: ActivatedRoute,
              private showService: ShowService) { }

  ngOnInit(): void {
    this.routeSub = this.activatedRoute.params.subscribe((params: Params) => {
      let showId: string = params['id']
      let seasonNum: string = params['season_num']
      console.log(showId, seasonNum)
      this.getSeasonDetails(showId, seasonNum)
    })
  }

  ngOnDestroy(): void {
    if(this.routeSub) {
      this.routeSub.unsubscribe()
    }
    if(this.seasonSub)
      this.seasonSub.unsubscribe()
  }

  private getSeasonDetails(showId: string, seasonNum: string) {
    this.seasonSub = this.showService.getSeason(showId, seasonNum).subscribe( (resp) => {
      this.season = resp
      console.log(resp)
    })
  }

  setStep(index: number) {
    this.exPanelStep = index;
  }

  nextStep() {
    this.exPanelStep++;
  }

  prevStep() {
    this.exPanelStep--;
  }
}
