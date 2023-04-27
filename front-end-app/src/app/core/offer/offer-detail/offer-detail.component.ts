import {Component, Input, OnInit} from '@angular/core';
import {Covoiturage} from "../../../models/Covoiturage.model";
import {Internaute} from "../../../models/Internaute.model";

@Component({
  selector: 'app-offer-detail',
  templateUrl: './offer-detail.component.html',
  styleUrls: ['./offer-detail.component.scss']
})
export class OfferDetailComponent implements OnInit{
  @Input() carpool: Covoiturage = new Covoiturage()
  dataset: Internaute[] = []


  ngOnInit() {
    this.dataset = this.carpool.passengers
  }

}
