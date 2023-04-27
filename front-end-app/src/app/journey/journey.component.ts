import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {CarpoolService} from "../shared/services/carpool.service";
import {finalize, first} from "rxjs";
import {Covoiturage} from "../models/Covoiturage.model";
import {DatePipe} from "@angular/common";
import {AuthService} from "../shared/services/auth.service";
import {Internaute} from "../models/Internaute.model";
import {NzMessageService} from "ng-zorro-antd/message";
import {NzModalService} from "ng-zorro-antd/modal";

declare type SearchCriteria = { departureCity: string, arrivalCity: string, date: string, maxPrice: number, numSeats: number }

@Component({
  selector: 'app-journey',
  templateUrl: './journey.component.html',
  styleUrls: ['./journey.component.scss']
})
export class JourneyComponent implements OnInit {
  criteria: SearchCriteria = {
    departureCity: '',
    arrivalCity: '',
    date: '',
    maxPrice: 0,
    numSeats: 0
  }
  isOnline = false
  user: Internaute = new Internaute()
  isItineraryModalVisible = false
  selectedCarpool = new Covoiturage()
  loading = false
  departurePlaceOptions: string[] = []
  _departurePlaceOptions: string[] = []
  arrivalPlaceOptions: string[] = []
  _arrivalPlaceOptions: string[] = []

  carpools: Covoiturage[] = []

  constructor(
    private fb: FormBuilder,
    private readonly carpoolSrv: CarpoolService,
    private readonly datePipe: DatePipe,
    private readonly authSrv: AuthService,
    private readonly messageSrv: NzMessageService,
    private readonly modal: NzModalService,
  ) {
  }

  ngOnInit(): void {
    this.fetchCities()
    this.fetchCurrentUser()
  }

  onSubmit(): void {
    console.log(this.criteria);
    this.criteria.date = this.datePipe.transform(this.criteria.date, 'yyyy-MM-dd') as any
    this
      .carpoolSrv
      .search(this.criteria)
      .pipe(first(), finalize(() => this.loading = false))
      .subscribe(carpools => {
        carpools.forEach(c => c.numSeats = c.numSeats!! - c.passengers.length)
        this.carpools = carpools
      })
  }

  resetForm(): void {
    this.criteria = {
      departureCity: '',
      arrivalCity: '',
      date: '',
      maxPrice: 0,
      numSeats: 0
    }
  }

  areAllFieldsEmpty(): boolean {
    return (
      !this.criteria.departureCity.length &&
      !this.criteria.arrivalCity.length
    );
  }


  fetchCities() {
    this
      .carpoolSrv
      .findCities()
      .subscribe(data => {
        this.departurePlaceOptions = [...new Set(data.map(d => d.departureCity.name))]
        this._departurePlaceOptions = [...new Set(data.map(d => d.departureCity.name))]
        this.arrivalPlaceOptions = [...new Set(data.map(d => d.arrivalCity.name))]
        this._arrivalPlaceOptions = [...new Set(data.map(d => d.arrivalCity.name))]
      })
  }

  onInput(event: Event, src: 'arrival' | 'departure'): void {
    const value = (event.target as HTMLInputElement).value;
    if (src === 'departure') {
      this.departurePlaceOptions = value ? this.departurePlaceOptions.filter(s => s.toLowerCase().startsWith(value.toLowerCase())) : this._departurePlaceOptions;
    } else if (src === 'arrival') {
      this.arrivalPlaceOptions = value ? this.arrivalPlaceOptions.filter(s => s.toLowerCase().startsWith(value.toLowerCase())) : this._arrivalPlaceOptions;
    }
  }

  showItineraryModal(carpool: Covoiturage) {
    this.selectedCarpool = carpool
    this.isItineraryModalVisible = true
  }

  private fetchCurrentUser() {
    this
      .authSrv
      .user$
      .subscribe({
        next: user => {
          this.isOnline = user !== null
          this.user = user
        }
      })
  }

  promptUser(carpool: Covoiturage) {
    this.modal.confirm({
      nzTitle: '<i>Voulez vous vraiment effectuer cette reservation?</i>',
      nzContent: `<b>Depart: ${carpool?.departureCity?.name} </b> <br>
                   <b>Arrivée: ${carpool?.arrivalCity?.name}</b>  <br>
                   <b>Date: ${this.datePipe.transform(carpool?.date, 'dd/MM/yyyy')}</b>  <br>
                   <b>Heure: ${this.datePipe.transform(carpool?.date, 'HH:mm')}</b>
                    `,
      nzOnOk: () => this.book(carpool),
      nzOkText: 'Confirmer',
      nzCancelText: 'Annuler'
    });
  }

  book(carpool: Covoiturage) {
    this.loading = true
    this
      .carpoolSrv
      .createBooking(carpool._id, this.user)
      .pipe(first(), finalize(() => this.loading = false))
      .subscribe(data => {
        this.messageSrv.success("Votre reservation a été crée avec succès!.")
        this.onSubmit()
      })
  }

  alreadyBooked(carpool: Covoiturage) {
    return carpool.passengers.map(p => p.email).includes(this.user.email)
  }
}

