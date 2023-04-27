import {Internaute} from "./Internaute.model";

export class Covoiturage {
  _id!: string;
  departureCity!: { name: string, lat: number, lng: number, address: string };
  arrivalCity!: { name: string, lat: number, lng: number, address: string };
  date?: string;
  driverEmail!: string;
  numSeats?: number;
  passengers: Internaute[] = [];
  price?: number;

  toString() {
    return this.departureCity?.name + ' - ' + this.arrivalCity?.name
  }
}
