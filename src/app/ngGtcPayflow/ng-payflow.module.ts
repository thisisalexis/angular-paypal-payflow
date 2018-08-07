import {NgModule} from '@angular/core';
import {CreditCardFormComponent} from './components/credit-card-form/credit-card-form.component';
import {NgGtcPayflowService} from './services/ng-gtc-payflow/ng-gtc-payflow.service';
import {BrowserModule} from '@angular/platform-browser';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClient, HttpClientModule} from '@angular/common/http';

@NgModule( {
  declarations: [
    CreditCardFormComponent
  ], providers: [
    NgGtcPayflowService, HttpClient
  ],
  imports: [ BrowserModule, CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  exports: [ CreditCardFormComponent ]
} )
export class NgGtcPayflowModule{}
