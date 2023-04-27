import {Injectable} from '@angular/core';
import {HttpService} from "./http.service";
import {Internaute} from "../../models/Internaute.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class InternauteService {
  private basePath = 'internautes/'

  constructor(
    private readonly httpSrv: HttpService<Internaute>
  ) {
  }

  update(internaute: Internaute): Observable<Internaute> {
    return this
      .httpSrv
      .put<Internaute>(`${this.basePath}update/${internaute._id}`, internaute)
  }
}
