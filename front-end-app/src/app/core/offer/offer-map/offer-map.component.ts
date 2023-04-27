import {Component, Inject, Input, OnInit} from '@angular/core';
import * as L from 'leaflet'
import 'leaflet-routing-machine'
import {Covoiturage} from "../../../models/Covoiturage.model";

const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-offer-map',
  templateUrl: './offer-map.component.html',
  styleUrls: ['./offer-map.component.scss']
})
export class OfferMapComponent implements OnInit {
  private map!: L.Map

  @Input() carpool: Covoiturage = new Covoiturage()

  constructor(
  ) {
  }

  ngOnInit() {
    this.initMap()
  }

  private initMap(): void {

    //this.map = L.map('map').setView([48.8566, 2.3522], 13);
    this.map = L.map('map').setView([this.carpool.departureCity.lat, this.carpool.departureCity.lng], 13);

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
      maxZoom: 18
    })

    tiles.addTo(this.map);

    L.marker([this.carpool.departureCity.lat, this.carpool.departureCity.lng])
      .bindPopup(this.locationPopup(this.carpool.departureCity.address))
      .addTo(this.map);

    L.marker([this.carpool.arrivalCity.lat, this.carpool.arrivalCity.lng])
      .bindPopup(this.locationPopup(this.carpool.arrivalCity.address))
      .addTo(this.map);

    this.initRoute()
  }

  private initRoute(): void {
    const startLatLng = L.latLng(this.carpool.departureCity.lat, this.carpool.departureCity.lng);
    const endLatLng = L.latLng(this.carpool.arrivalCity.lat, this.carpool.arrivalCity.lng);

    L.Routing.control({
      waypoints: [
        startLatLng,
        endLatLng
      ],
      routeWhileDragging: true,
    }).addTo(this.map);
  }

  locationPopup(data: string): string {
    return `` +
      `<div>Adresse: ${ data }</div>`
  }

}
