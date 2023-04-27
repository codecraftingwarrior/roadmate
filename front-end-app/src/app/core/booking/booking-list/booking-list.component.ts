import {Component, Input, OnInit} from '@angular/core';
import {Covoiturage} from "../../../models/Covoiturage.model";
import {CarpoolService} from "../../../shared/services/carpool.service";
import {Internaute} from "../../../models/Internaute.model";
import {first} from "rxjs";

@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.scss']
})
export class BookingListComponent implements OnInit {
  carpools: Covoiturage[] = []
  isItineraryModalVisible = false
  @Input() user: Internaute = new Internaute()

  selectedCarpool = new Covoiturage()
  constructor(
    private readonly carpoolSrv: CarpoolService
  ) {
  }

  ngOnInit() {
    this.fetchBookings()
  }

  fetchBookings() {
    this
      .carpoolSrv
      .findByPassengerEmail(this.user.email!!)
      .pipe(first())
      .subscribe(data => this.carpools = data)
  }
}
