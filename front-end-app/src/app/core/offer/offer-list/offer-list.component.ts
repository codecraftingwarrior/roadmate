import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CarpoolService} from "../../../shared/services/carpool.service";
import {AuthService} from "../../../shared/services/auth.service";
import {Internaute} from "../../../models/Internaute.model";
import {finalize, first} from "rxjs";
import {Covoiturage} from "../../../models/Covoiturage.model";
import {NzContextMenuService, NzDropdownMenuComponent} from "ng-zorro-antd/dropdown";

@Component({
  selector: 'app-offer-list',
  templateUrl: './offer-list.component.html',
  styleUrls: ['./offer-list.component.scss']
})
export class OfferListComponent implements OnInit {
  isModalVisible: boolean = false;
  isAddModalVisible: boolean = false;
  isUpdateModalVisible = false;
  loading = false;
  selectedCarpool: Covoiturage = new Covoiturage()

  user: Internaute = new Internaute();
  carpoolings: Covoiturage[] = []

  constructor(
    private readonly carpoolingSrv: CarpoolService,
    private readonly authSrv: AuthService,
    private nzContextMenuService: NzContextMenuService,
  ) {
  }

  ngOnInit() {
    this.fetchCurrentUser();
  }

  fetchCarpools() {
    this.loading = true;
    this
      .carpoolingSrv
      .findByEmail(this.user.email!!)
      .pipe(first(), finalize(() => this.loading = false))
      .subscribe(carpools => this.carpoolings = carpools)
  }

  handleCancel() {

  }

  handleOk() {
  }

  openModal() {

  }

  private fetchCurrentUser() {
    this
      .authSrv
      .user$
      .subscribe({
        next: user => {
          this.user = user
          this.fetchCarpools()
        }
      })
  }

  contextMenu($event: MouseEvent, menu: NzDropdownMenuComponent, carpool: Covoiturage): void {
    this.selectedCarpool = {...carpool}
    this.selectedCarpool.date = new Date(this.selectedCarpool.date!) as any
    this.nzContextMenuService.create($event, menu);
  }

  onCarpoolAdded(carpool: Covoiturage) {
    this.carpoolings.push(carpool);
    this.isAddModalVisible = false;
  }

  closeMenu(): void {
    this.nzContextMenuService.close();
  }

  delete() {
    this
      .carpoolingSrv
      .delete(this.selectedCarpool)
      .pipe(first())
      .subscribe(_ => {
        this.carpoolings = this.carpoolings.filter(c => c._id !== this.selectedCarpool._id);
        this.closeMenu();
        this.selectedCarpool = new Covoiturage();
      })
  }
}
