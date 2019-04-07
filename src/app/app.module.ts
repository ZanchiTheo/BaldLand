import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToasterModule, ToasterService } from 'angular2-toaster';
import { FormsModule } from '@angular/forms';

import {
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule
} from "@angular/material";

import { AppComponent } from './app.component';
import { ProductComponent } from './product/product.component';
import { BigvaluePipe } from './bigvalue.pipe';
import { ModalComponent } from './modal/modal.component';
import { ManagerComponent } from './manager/manager.component';
import { UpgrademodalComponent } from './upgrademodal/upgrademodal.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    BigvaluePipe,
    ModalComponent,
    ManagerComponent,
    UpgrademodalComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ToasterModule,
    BrowserAnimationsModule,
    FormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule
  ],
  providers: [
    ToasterService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
