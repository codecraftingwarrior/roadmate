import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from "@angular/common/http";
import {NzMessageModule, NzMessageService} from "ng-zorro-antd/message";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    NzMessageModule
  ],
  providers: [NzMessageService]
})
export class SharedModule {
}
