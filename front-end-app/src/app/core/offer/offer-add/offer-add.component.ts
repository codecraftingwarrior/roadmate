import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Address} from "ngx-google-places-autocomplete/objects/address";
import {Covoiturage} from "../../../models/Covoiturage.model";
import {DatePipe} from "@angular/common";
import {CarpoolService} from "../../../shared/services/carpool.service";
import {finalize, first} from "rxjs";
import {Internaute} from "../../../models/Internaute.model";
import {AuthService} from "../../../shared/services/auth.service";

@Component({
  selector: 'app-offer-add',
  templateUrl: './offer-add.component.html',
  styleUrls: ['./offer-add.component.scss']
})
export class OfferAddComponent implements OnInit {
  journey: Covoiturage = new Covoiturage();
  user!: Internaute

  loading = false
  @Output() terminated: EventEmitter<Covoiturage> = new EventEmitter<Covoiturage>();

  options: any = {
    componentRestrictions: {country: 'FR'}
  }

  constructor(
    private readonly datePipe: DatePipe,
    private readonly carpoolSrv: CarpoolService,
    private readonly authSrv: AuthService
  ) {
    this.journey.numSeats = 0;
    this.journey.price = 0;
  }

  ngOnInit() {
    this.fetchCurrentUser()
  }

  formatterEuro = (value: number): string => `€ ${value}`;
  parserEuro = (value: string): string => value.replace('€ ', '');

  handleAddressChange(address: Address, target: 'departure' | 'arrival') {
    let place = {
      name: address.vicinity,
      lat: address.geometry.location.lat(),
      lng: address.geometry.location.lng(),
      address: address.formatted_address
    };

    if (target === 'departure') {
      this.journey.departureCity = place
    } else if (target === 'arrival') {
      this.journey.arrivalCity = place
    }
  }

  onDatetimeChoosen(event: any) {
    this.journey.date = event;
  }

  storeCarpool() {
    this.loading = true
    this.journey.date = this.datePipe.transform(this.journey.date, 'yyyy-MM-ddTHH:mm') as any
    this.journey.driverEmail = this.user.email as any
    this
      .carpoolSrv
      .store(this.journey)
      .pipe(first(), finalize(() => this.loading = false))
      .subscribe(carpool => this.terminated.emit(carpool));
  }

  private fetchCurrentUser() {
    this
      .authSrv
      .user$
      .subscribe({
        next: user => {
          this.user = user
        }
      })
  }
}
