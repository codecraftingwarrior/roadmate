import {APP_INITIALIZER, NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NZ_I18N} from 'ng-zorro-antd/i18n';
import {fr_FR, en_US} from 'ng-zorro-antd/i18n';
import {DatePipe, registerLocaleData} from '@angular/common';
import fr from '@angular/common/locales/fr';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FooterComponent} from './theme/footer/footer.component';
import {MenuComponent} from './theme/menu/menu.component';
import {RouterModule} from "@angular/router";
import {HomeComponent} from './home/home.component';
import {environment} from "../environments/environment.development";
import {NzMessageModule, NzMessageService} from "ng-zorro-antd/message";
import {JwtInterceptor} from "./shared/interceptors/jwt.interceptor";
import {appInitializer} from "./shared/globals";
import {AuthService} from "./shared/services/auth.service";
import {LoadingBarHttpClientModule} from "@ngx-loading-bar/http-client";
import {LoadingBarModule} from "@ngx-loading-bar/core";
import {JourneyComponent} from './journey/journey.component';
import {NzCardModule} from 'ng-zorro-antd/card';
import en from '@angular/common/locales/en';
import {WorkspaceComponent} from './core/workspace/workspace.component';
import {SharedModule} from "./shared/shared.module";
import {NzTabsModule} from "ng-zorro-antd/tabs";
import {UserInformationsComponent} from './core/user/user-informations/user-informations.component';
import {OfferListComponent} from './core/offer/offer-list/offer-list.component';
import {UserUpdateInformationsComponent} from './core/user/user-update-informations/user-update-informations.component';
import {NzInputModule} from "ng-zorro-antd/input";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzDividerModule} from "ng-zorro-antd/divider";
import {NzIconModule} from "ng-zorro-antd/icon";
import {OfferDetailComponent} from './core/offer/offer-detail/offer-detail.component';
import {NzModalModule} from "ng-zorro-antd/modal";
import {NzTableModule} from "ng-zorro-antd/table";
import {NzBadgeModule} from "ng-zorro-antd/badge";
import {GooglePlaceModule} from 'ngx-google-places-autocomplete';
import {OfferAddComponent} from './core/offer/offer-add/offer-add.component';
import {NzDatePickerModule} from "ng-zorro-antd/date-picker";
import {NzInputNumberModule} from "ng-zorro-antd/input-number";
import {NzDropDownModule} from "ng-zorro-antd/dropdown";
import {NzAlertModule} from "ng-zorro-antd/alert";
import {OfferUpdateComponent} from './core/offer/offer-update/offer-update.component';
import {OfferMapComponent} from './core/offer/offer-map/offer-map.component';
import {NzFormModule} from "ng-zorro-antd/form";
import {NzAutocompleteModule} from "ng-zorro-antd/auto-complete";
import {NzToolTipModule} from "ng-zorro-antd/tooltip";
import { BookingListComponent } from './core/booking/booking-list/booking-list.component';

registerLocaleData(fr);

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    MenuComponent,
    HomeComponent,
    JourneyComponent,
    WorkspaceComponent,
    UserInformationsComponent,
    OfferListComponent,
    UserUpdateInformationsComponent,
    OfferDetailComponent,
    OfferAddComponent,
    OfferUpdateComponent,
    OfferMapComponent,
    BookingListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    LoadingBarHttpClientModule,
    LoadingBarModule,
    RouterModule,
    NzCardModule,
    SharedModule,
    NzCardModule,
    NzTabsModule,
    NzInputModule,
    NzButtonModule,
    NzDividerModule,
    NzIconModule,
    NzModalModule,
    NzTableModule,
    NzBadgeModule,
    NzDatePickerModule,
    NzInputNumberModule,
    NzDropDownModule,
    NzAlertModule,
    GooglePlaceModule,
    NzFormModule,
    NzAutocompleteModule,
    NzToolTipModule,
  ],
  providers: [
    {provide: NZ_I18N, useValue: fr_FR},
    {provide: 'API_URL', useValue: environment.apiUrl},
    {provide: 'TOKEN_PREFIX', useValue: environment.tokenPrefix},
    {provide: APP_INITIALIZER, useFactory: appInitializer, multi: true, deps: [AuthService]},
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    DatePipe,
    NzMessageService,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

  bootstrap: [AppComponent]
})
export class AppModule {
}
