import {environment} from '../../../environments/environment';

import {PayflowRequestModel} from '../models/payflow-request.model';
import {CreditCardModel} from '../models/credit-card.model';
import {PayflowPaymentMethodEnum} from '../enums/payflow-payment-method.enum';
import {PayFlowTransactionTypeEnum} from '../enums/payflow-transaction-type.enum';
import {PayflowPartnerEnum} from '../enums/payflow-partner.enum';
import {PayflowEnvironmentParameterModel} from '../models/payflow-environment-parameter.model';
import {PayflowCreditCardPaymentRequestEnum} from '../enums/payflow-credit-card-payment-request.enum';

export class PayflowRequestWrapperClass {

  public payflowRequestModel: PayflowRequestModel;
  private encodedNameValuePairRequestString: string;

  public constructor(creditCardModel: CreditCardModel) {
    const payflowRequestModel: PayflowRequestModel = this.createPayflowRequestModel( creditCardModel );
    this.setPayflowRequestModel( payflowRequestModel );
    this.generatePayflowRequestString();
  }

  private createPayflowRequestModel( creditCardModel: CreditCardModel ): PayflowRequestModel {
    try {
      const payflowEnvironmentParameterModel: PayflowEnvironmentParameterModel = environment.ngGtcPayflow;
      const payflowRequestModel: PayflowRequestModel = {
        user: payflowEnvironmentParameterModel.user,
        partner: PayflowPartnerEnum.paypal,
        vendor: payflowEnvironmentParameterModel.vendor,
        password: payflowEnvironmentParameterModel.password,
        creditCardNumber: creditCardModel.creditCardNumber,
        expirationDate: this.createDateNumberForPayflowRequest( creditCardModel ),
        paymentMethod: PayflowPaymentMethodEnum.creditCard,
        transactionType: PayFlowTransactionTypeEnum.sale,
        amount: 25
      };
      return payflowRequestModel;
    } catch ( error ) {
      console.error( error );
    }
    return null;
  }

  private createDateNumberForPayflowRequest(creditCardModel: CreditCardModel): number {
    try {
      const RADIX = 10;
      const contatenatedNumber: string =
        '' + creditCardModel.expirationDate.expirationMonth + creditCardModel.expirationDate.expirationYear;
      return parseInt( contatenatedNumber, RADIX );
    } catch ( error ) {
      console.error( error );
    }
    return 0;
  }

  private setPayflowRequestModel( payflowRequestModel: PayflowRequestModel ): void {
    this.payflowRequestModel = payflowRequestModel;
  }

  private generatePayflowRequestString(): void {
    const encodedPayflowRequestString: string = this.createPayflowRequestString();
    this.setEncodedNameValuePairRequestString( encodedPayflowRequestString );
  }

  private createPayflowRequestString(): string {
    const ELEMENT_SEPARATOR = '&';
    const PAIR_VALUE_SEPARATOR = '=';
    let payflowRequestString = '';
    try {
      Object.keys( this.getPayflowRequestModel() ).forEach( ( element ) => {
        payflowRequestString +=
          PayflowCreditCardPaymentRequestEnum[element]
           + PAIR_VALUE_SEPARATOR + this.getPayflowRequestModel()[ element ] + ELEMENT_SEPARATOR;
      } );
      return payflowRequestString;
    } catch ( error ) {
      console.error( error );
    }
    return '';
  }

  private getPayflowRequestModel(): PayflowRequestModel {
    return this.payflowRequestModel;
  }

  private setEncodedNameValuePairRequestString( encodedNameValuePairRequestString: string ): void {
    this.encodedNameValuePairRequestString = encodedNameValuePairRequestString;
  }

  public getEncodedNameValuePairRequestString(): string {
    return this.encodedNameValuePairRequestString;
  }

}
