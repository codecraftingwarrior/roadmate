import {Injectable} from '@angular/core';
import {HttpService} from "./http.service";
import {Covoiturage} from "../../models/Covoiturage.model";
import {Observable} from "rxjs";
import {Internaute} from "../../models/Internaute.model";

@Injectable({
  providedIn: 'root'
})
export class CarpoolService {
  private basePath = 'carpooling/'

  constructor(
    private httpSrv: HttpService<Covoiturage>
  ) {
  }

  findByEmail(email: string): Observable<Covoiturage[]> {
    return this
      .httpSrv
      .get<Covoiturage[]>(`${this.basePath}user/${email}/find`);
  }

  store(carpool: Covoiturage): Observable<Covoiturage> {
    return this
      .httpSrv
      .post<Covoiturage>(`${this.basePath}store`, carpool);
  }

  update(carpool: Covoiturage): Observable<Covoiturage> {
    return this
      .httpSrv
      .put<Covoiturage>(`${this.basePath}update/${carpool._id}`, carpool);
  }

  delete(carpool: Covoiturage): Observable<any> {
    return this
      .httpSrv
      .delete(this.basePath + `delete/${carpool._id}`)
  }

  findCities(): Observable<{ _id: string, departureCity: { name: string }, arrivalCity: { name: string } }[]> {
    return this
      .httpSrv
      .get(this.basePath + 'find-cities')
  }

  search(criteria: { departureCity: string, arrivalCity: string, date: string, maxPrice: number, numSeats: number }): Observable<Covoiturage[]> {
    return this
      .httpSrv
      .post<Covoiturage[]>(this.basePath + 'search', criteria);
  }

  createBooking(offerId: string, user: Internaute) {
    return this
      .httpSrv
      .put(this.basePath + offerId + '/book', {passenger: user})
  }

  findByPassengerEmail(email: string): Observable<Covoiturage[]> {
    return this
      .httpSrv
      .get<Covoiturage[]>(this.basePath + email + '/bookings' )
  }
}
