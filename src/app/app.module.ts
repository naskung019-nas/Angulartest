import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChecklistTableComponent } from './component/page/checklist-table/checklist-table.component';
import { LoginComponent } from './component/page/login/login.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { HttpClientModule } from '@angular/common/http';
import { ShiftService } from './component/service/shift.service';
import { MatRadioModule } from '@angular/material/radio';
import { MatMenuModule } from '@angular/material/menu';
import { DashboardService } from './component/service/dashboard.sevice';
import { DataService } from './component/service/data.service';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTableModule } from '@angular/material/table';
import {  DatePipe } from '@angular/common';






@NgModule({
  declarations: [
    AppComponent,
    ChecklistTableComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatTabsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    MatListModule,
    HttpClientModule,
    MatRadioModule,
    MatMenuModule,
    MatAutocompleteModule,
    MatTableModule,
    ],
  providers: [
    ShiftService,
    DashboardService,
    DataService,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
