import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ResformComponent } from './components/resform/resform.component';
import { RescompleteComponent } from './components/rescomplete/rescomplete.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// date picker
import {MenuItem} from 'primeng/api';
import {CalendarModule} from 'primeng/calendar';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { DatePipe } from '@angular/common';

// firestore
import { environment } from '../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';

// services
import {FairService} from './services/fair.service';
import {PeriodService} from './services/period.service';


// //validator
// import { CustomFormsModule } from 'ng4-validators';


import { RouterModule, Routes} from '@angular/router';

const appRoutes: Routes = [
  {path: '', component: DashboardComponent},
  {path: 'reservation', component: ResformComponent},
  {path: 'reservation/conf', component: RescompleteComponent}
  ];



@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ResformComponent,
    RescompleteComponent,
  ],
  imports: [
    BrowserModule, RouterModule.forRoot(appRoutes),
    FormsModule, ReactiveFormsModule, HttpClientModule,
    NgbModule.forRoot(), CalendarModule, BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence(),
    // CustomFormsModule
],
  providers: [FairService, PeriodService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
