import {AfterViewInit, Component, EventEmitter, Input, Output} from '@angular/core';
import {Covoiturage} from "../../../models/Covoiturage.model";
import {Address} from "ngx-google-places-autocomplete/objects/address";
import {AuthService} from "../../../shared/services/auth.service";
import {Internaute} from "../../../models/Internaute.model";
import {DatePipe} from "@angular/common";
import {finalize, first} from "rxjs";
import {CarpoolService} from "../../../shared/services/carpool.service";

@Component({
  selector: 'app-offer-update',
  templateUrl: './offer-update.component.html',
  styleUrls: ['./offer-update.component.scss']
})
export class OfferUpdateComponent {
  @Input() journey: Covoiturage = new Covoiturage();
  @Output() terminated: EventEmitter<Covoiturage> = new EventEmitter<Covoiturage>()
  loading = false
  user: Internaute = new Internaute()

  formatterEuro = (value: number): string => `€ ${value}`;
  parserEuro = (value: string): string => value.replace('€ ', '');

  constructor(
    private readonly authSrv: AuthService,
    private readonly datePipe: DatePipe,
    private readonly carpoolSrv: CarpoolService
  ) {
  }

  options: any = {
    componentRestrictions: {country: 'FR'}
  }

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

  update() {
    this.loading = true
    this.journey.date = this.datePipe.transform(this.journey.date, 'yyyy-MM-ddTHH:mm') as any
    this.journey.driverEmail = this.user.email as any
    this
      .carpoolSrv
      .update(this.journey)
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
