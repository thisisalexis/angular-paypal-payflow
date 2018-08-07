import { Injectable } from '@angular/core';

import {Observable} from 'rxjs/Rx';

import {PayflowEnvironmentParameterModel} from '../../models/payflow-environment-parameter.model';
import {environment} from '../../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CreditCardClass} from '../../classes/credit-card.class';
import {TransactionResponseInterface} from '../../classes/transaction-response.interface';
import {PayflowTransactionResponseClass} from '../../classes/payflow-transaction-response.class';
import {TransactionRequestFactoryClass} from '../../classes/transaction-request-factory.class';
import {TransactionRequestInterface} from '../../classes/transaction-request.interface';

@Injectable()
export class NgGtcPayflowService {

  public constructor( private httpService: HttpClient ) {}

  public requestCreditCardPayment( creditCard: CreditCardClass, amount: number ):
  Observable<TransactionResponseInterface> {
    try {
      const payflowEnvironmentParameter: PayflowEnvironmentParameterModel = environment.ngGtcPayflow;
      const transactionRequestFactory: TransactionRequestFactoryClass = TransactionRequestFactoryClass.getInstance();

      const creditCardPaymentRequest: TransactionRequestInterface
        = transactionRequestFactory.createPayflowSaleTransaction(payflowEnvironmentParameter, creditCard, amount);

      return this.requestPayflowPaymentToPayflowGatewayApi( creditCardPaymentRequest.getRequestToServer() )
        .map ( ( nameValuePairStringPayflowGatewayApiResponse: string ) => {
          console.log( 'Response from server: ' + nameValuePairStringPayflowGatewayApiResponse );
          const transactionResponse: TransactionResponseInterface =
            new PayflowTransactionResponseClass(
              nameValuePairStringPayflowGatewayApiResponse, creditCardPaymentRequest);

          return transactionResponse;
        } ).catch( (error: any) => {
          return Observable.throw(new Error( error ));
        } );
    } catch ( error ) {
      console.error ( error );
    }
    return null;
  }

  public requestAccountVerification(creditCard: CreditCardClass): Observable<boolean> {
    try {
      const payflowEnvironmentParameter: PayflowEnvironmentParameterModel = environment.ngGtcPayflow;
      const transactionRequestFactory: TransactionRequestFactoryClass = TransactionRequestFactoryClass.getInstance();

      const creditCardPaymentRequest: TransactionRequestInterface
        = transactionRequestFactory.createPayflowVerificationTransaction(payflowEnvironmentParameter, creditCard);

      return this.requestPayflowPaymentToPayflowGatewayApi( creditCardPaymentRequest.getRequestToServer() )
        .map ( ( nameValuePairStringPayflowGatewayApiResponse: string ) => {
          console.log( 'Response from server: ' + nameValuePairStringPayflowGatewayApiResponse );
          const transactionResponse: TransactionResponseInterface =
            new PayflowTransactionResponseClass(
              nameValuePairStringPayflowGatewayApiResponse, creditCardPaymentRequest);

          return transactionResponse.isSuccess();
        } ).catch( (error: any) => {
          return Observable.throw(new Error( error ));
        } );
    } catch ( error ) {
      console.error ( error );
    }
    return null;
  }

  public requestAuthorizationPayment(creditCard: CreditCardClass,
                              amount: number): Observable<TransactionResponseInterface> {
    try {
      const payflowEnvironmentParameter: PayflowEnvironmentParameterModel = environment.ngGtcPayflow;
      const transactionRequestFactory: TransactionRequestFactoryClass = TransactionRequestFactoryClass.getInstance();

      const creditCardPaymentRequest: TransactionRequestInterface
        = transactionRequestFactory.createPayflowAutorizationTransaction(payflowEnvironmentParameter, creditCard, amount);

      return this.requestPayflowPaymentToPayflowGatewayApi( creditCardPaymentRequest.getRequestToServer() )
        .map ( ( nameValuePairStringPayflowGatewayApiResponse: string ) => {
          console.log( 'Response from server: ' + nameValuePairStringPayflowGatewayApiResponse );
          const transactionResponse: TransactionResponseInterface =
            new PayflowTransactionResponseClass(
              nameValuePairStringPayflowGatewayApiResponse, creditCardPaymentRequest);

          return transactionResponse;
        } ).catch( (error: any) => {
          return Observable.throw(new Error( error ));
        } );
    } catch ( error ) {
      console.error ( error );
    }
    return null;
  }

  public requestDelayedPayment(amount: number, approvedTransactionResponse: TransactionResponseInterface):
                              Observable<TransactionResponseInterface> {
    try {
      const creditCard: CreditCardClass = approvedTransactionResponse.getTransactionRequest().getCreditCard();
      const payflowEnvironmentParameter: PayflowEnvironmentParameterModel = environment.ngGtcPayflow;
      const transactionRequestFactory: TransactionRequestFactoryClass = TransactionRequestFactoryClass.getInstance();

      const creditCardPaymentRequest: TransactionRequestInterface
        = transactionRequestFactory.createPayflowDelayedTransaction(
          payflowEnvironmentParameter, creditCard, approvedTransactionResponse, amount);

      return this.requestPayflowPaymentToPayflowGatewayApi( creditCardPaymentRequest.getRequestToServer() )
        .map ( ( nameValuePairStringPayflowGatewayApiResponse: string ) => {
          console.log( 'Response from server: ' + nameValuePairStringPayflowGatewayApiResponse );
          const transactionResponse: TransactionResponseInterface =
            new PayflowTransactionResponseClass(
              nameValuePairStringPayflowGatewayApiResponse, creditCardPaymentRequest);

          return transactionResponse;
        } ).catch( (error: any) => {
          return Observable.throw(new Error( error ));
        } );
    } catch ( error ) {
      console.error ( error );
    }
    return null;
  }

  private requestPayflowPaymentToPayflowGatewayApi( requestString: string ): Observable<string> {
    const httpHeaders: HttpHeaders = new HttpHeaders( { 'Content-Type': 'text/plain' } );
    return this.httpService.post(
        environment.ngGtcPayflow.apiUrl,
        requestString,
        { headers: httpHeaders, responseType: 'text' } )
      .catch( ( error ) => {
        return Observable.throw(new Error( error ));
      } );
  }

}
