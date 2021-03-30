import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TemplateHomeComponent } from './template-home/template-home.component';
import { TemplateNavComponent } from './template-nav/template-nav.component';



import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Module Home
import { TemplateHomeModule } from './template-home/template-home.module';
import { TemplateNavModule } from './template-nav/template-nav.module';
import { ProgressSpinnerDialogComponent } from './progress-spinner-dialog/progress-spinner-dialog.component';
import { DropdownModule } from 'primeng/dropdown';
import {InputTextModule} from 'primeng/inputtext';
import {NgxPaginationModule} from 'ngx-pagination';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { MatTableModule, MatPaginatorModule, MatSortModule, MatDialogModule } from '@angular/material';
import { MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import {MatProgressSpinnerModule} from '@angular/material'

@NgModule({
  declarations: [
    AppComponent,
    TemplateHomeComponent,
    TemplateNavComponent,
    ProgressSpinnerDialogComponent,

  ],
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatDialogModule,
    MatSortModule,
    BrowserModule,
    AppRoutingModule,
    TemplateHomeModule,
    DropdownModule,
    InputTextModule,
    TemplateNavModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
