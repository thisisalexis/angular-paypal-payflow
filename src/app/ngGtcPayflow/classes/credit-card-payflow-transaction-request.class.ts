import {PayflowTransactionRequestClass} from './payflow-transaction-request.class';
import {PayflowPartnerEnum} from '../enums/payflow-partner.enum';
import {PayflowPaymentMethodEnum} from '../enums/payflow-payment-method.enum';
import {PayFlowTransactionTypeEnum} from '../enums/payflow-transaction-type.enum';
import {PayflowCreditCardPaymentRequestEnum} from '../enums/payflow-credit-card-payment-request.enum';
import {CreditCardClass} from './credit-card.class';
import {PayflowRequestVerbosityEnum} from '../enums/payflow-request-verbosity.enum';

export class CreditCardPayflowTransactionRequestClass extends PayflowTransactionRequestClass {

  private partner: PayflowPartnerEnum;
  private vendor: string;
  private user: string;
  private password: string;
  private paymentMethod: PayflowPaymentMethodEnum;
  private transactionType: PayFlowTransactionTypeEnum;
  private amount: number;
  private creditCard: CreditCardClass;
  private verbosity: PayflowRequestVerbosityEnum;
  private originalTransactionId: string;

  public constructor() {
    super();
  }

  public setPartner(partner: PayflowPartnerEnum): void {
    this.partner = partner;
  }

  public getPartner(): PayflowPartnerEnum {
    return this.partner;
  }

  public setVendor(vendor: string): void {
    this.vendor = vendor;
  }

  public getVendor(): string {
    return this.vendor;
  }

  public setUser(user: string): void {
    this.user = user;
  }

  public getUser(): string {
    return this.user;
  }

  public setPassword(password: string): void {
    this.password = password;
  }

  public getPassword(): string {
    return this.password;
  }

  public setPaymentMethod(paymentMethod: PayflowPaymentMethodEnum): void {
    this.paymentMethod = paymentMethod;
  }

  public getPaymentMethod(): PayflowPaymentMethodEnum {
    return this.paymentMethod;
  }

  public setTransactionType(transactionType: PayFlowTransactionTypeEnum): void {
    this.transactionType = transactionType;
  }

  public getTransactionType(): PayFlowTransactionTypeEnum {
    return this.transactionType;
  }

  public setAmount(amount: number): void {
    this.amount = amount;
  }

  public getAmount(): number {
    return this.amount;
  }

  public setCreditCard(creditCard: CreditCardClass): void {
    this.creditCard = creditCard;
  }

  public getCreditCard(): CreditCardClass {
    return this.creditCard;
  }

  public setVerbosity(verbosity: PayflowRequestVerbosityEnum): void {
    this.verbosity = verbosity;
  }

  public getVerbosity(): PayflowRequestVerbosityEnum {
    return this.verbosity;
  }

  public getRequestToServer(): string {
    return this.generateEncodedNameValuePairRequestString();
  }

  public getOriginalTransactionId(): string {
    return this.originalTransactionId;
  }

  public setOriginalTransactionId (originalTransactionId: string) {
    this.originalTransactionId = originalTransactionId;
  }

  private generateEncodedNameValuePairRequestString(): string {
    let payflowRequestString = '';
    try {
      payflowRequestString += this.getElementNameValuePairString(
        PayflowCreditCardPaymentRequestEnum.user,
        this.getUser()
      );
      payflowRequestString += this.getElementNameValuePairString(
        PayflowCreditCardPaymentRequestEnum.partner,
        this.getPartner()
      );
      payflowRequestString += this.getElementNameValuePairString(
        PayflowCreditCardPaymentRequestEnum.vendor,
        this.getVendor()
      );
      payflowRequestString += this.getElementNameValuePairString(
        PayflowCreditCardPaymentRequestEnum.password,
        this.getPassword()
      );
      payflowRequestString += this.getElementNameValuePairString(
        PayflowCreditCardPaymentRequestEnum.creditCardNumber,
        this.getCreditCard().getProductNumber() + ''
      );
      payflowRequestString += this.getElementNameValuePairString(
        PayflowCreditCardPaymentRequestEnum.expirationDate,
        this.getCreditCard().getExpirationDate() + ''
      );
      payflowRequestString += this.getElementNameValuePairString(
        PayflowCreditCardPaymentRequestEnum.paymentMethod,
        this.getPaymentMethod()
      );
      payflowRequestString += this.getElementNameValuePairString(
        PayflowCreditCardPaymentRequestEnum.transactionType,
        this.getTransactionType()
      );
      payflowRequestString += this.getElementNameValuePairString(
        PayflowCreditCardPaymentRequestEnum.amount,
        this.getAmount() + ''
      );
      payflowRequestString += this.getElementNameValuePairString(
        PayflowCreditCardPaymentRequestEnum.verbosity,
        this.getVerbosity()
      );

      if (this.getOriginalTransactionId() !== null
        && this.getOriginalTransactionId() !== undefined) {
        payflowRequestString += this.getElementNameValuePairString(
          PayflowCreditCardPaymentRequestEnum.payflowTransactionId,
          this.getOriginalTransactionId()
        );
      }

    } catch ( error ) {
      console.error( error );
    }
    return payflowRequestString;
  }

  private getElementNameValuePairString(elementKey: string, elementValue: string): string {
    const ELEMENT_SEPARATOR = '&';
    const PAIR_VALUE_SEPARATOR = '=';
    return elementKey + PAIR_VALUE_SEPARATOR + elementValue + ELEMENT_SEPARATOR;
  }

}
