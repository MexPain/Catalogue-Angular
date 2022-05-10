import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {ShowResponse as Show, Season} from "../../../../models/Show";
import {ActivatedRoute, Params} from "@angular/router";
import {ShowService} from "../../../services/show.service";
import {environment as env} from "../../../../environments/environment";
import {PageEvent} from "@angular/material/paginator";
import {Cast, ShowCredits} from "../../../../models/ShowCredits";

@Component({
  selector: 'app-show-details',
  templateUrl: './show-details.component.html',
  styleUrls: ['./show-details.component.css']
})
export class ShowDetailsComponent implements OnInit, OnDestroy {
  routeSub!: Subscription
  showSub!: Subscription
  creditSub!: Subscription

  show!: Show
  credits!: ShowCredits

  filteredCast: Cast[] = []
  filteredSeasons: Season[] = []

  baseImgUrl = env.IMAGE_BASE_URL

  constructor(private activatedRoute: ActivatedRoute,
              private showService: ShowService) { }

  ngOnInit(): void {
    this.routeSub = this.activatedRoute.params.subscribe((params: Params) => {
      let showId: string = params['id']
      this.getShowDetails(showId)
      this.getShowCredits(showId)
    })
  }

  private getShowDetails(showId: string) {
    this.showSub = this.showService.getShow(showId).subscribe( (resp) => {
      this.show = resp
    })
  }

  private getShowCredits(showId: string) {
    this.creditSub = this.showService.getShowCredits(showId).subscribe( (resp) => {
      this.credits = resp
      this.filterMainCast(0, 10)
    })
  }

  onSeasonsPageEvent(event: PageEvent) {
    this.filterSeasons(event.pageIndex, event.pageSize)
  }

  onCastPageEvent(event: PageEvent) {
    this.filterMainCast(event.pageIndex, event.pageSize)
  }

  private filterSeasons(pageIndex: number, pageSize: number) {
    let first = pageIndex*pageSize
    let until = first + pageSize
    let filteredList = this.show.seasons?.slice(first, until)
    if(filteredList) {
      this.filteredSeasons = filteredList
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

  ngOnDestroy(): void {
    if(this.showSub) {
      this.showSub.unsubscribe()
    }
    if(this.routeSub) {
      this.routeSub.unsubscribe()
    }
    if(this.creditSub)
      this.creditSub.unsubscribe()
  }
}
