import {PaymentProductInterface} from './payment-product.interface';
import {CreditCardModel} from '../models/credit-card.model';

export class CreditCardClass implements PaymentProductInterface {

  public static readonly creditCardRegex = '^(?:(4[0-9]{12}(?:[0-9]{3})?)|(5[1-5][0-9]{14})|(6(?:011|5[0-9]{2})[0-9]{12})|(3[47][0-9]{13})|(3(?:0[0-5]|[68][0-9])[0-9]{11})|((?:2131|1800|35[0-9]{3})[0-9]{11}))$';
  public static readonly securityNumberRegex = '^[0-9]{3,4}$';
  public static readonly expirationMonthRegex = '^(0?[1-9]|1[012])$';
  public static readonly expirationYearRegex = '^[0-9]{3,4}$';
  public static readonly maxYearsExpirationDate = 20;


  private creditCardModel: CreditCardModel;
  private cardHolderName: string;
  private creditCardNumber: number;
  private securityNumber: number;
  private expirationMonth: number;
  private expirationYear: number;

  public constructor(creditCardModel: CreditCardModel) {
    this.setModel(creditCardModel);
    this.setCardHolderName(creditCardModel.creditCardHolderName);
    this.setProductNumber(creditCardModel.creditCardNumber);
    this.setSecurityNumber(creditCardModel.securityNumber);
    this.setExpirationMonth(creditCardModel.expirationDate.expirationMonth);
    this.setExpirationYear(creditCardModel.expirationDate.expirationYear);
    if (!this.isValid()) {
      throw new Error('There was a problem while creating and validating the credit card object');
    }
  }

  public getCardHolderName(): string {
    return this.cardHolderName;
  }

  private setCardHolderName(cardHolderFirstName: string): void {
    this.cardHolderName = cardHolderFirstName;
  }

  public getProductNumber(): number {
    return this.creditCardNumber;
  }

  private setProductNumber(creditCardNumber: number): void {
    this.creditCardNumber = creditCardNumber;
  }

  public getSecurityNumber(): number {
    return this.securityNumber;
  }

  private setSecurityNumber(securityNumber: number): void {
    this.securityNumber = securityNumber;
  }

  public getExpirationMonth(): number {
    return this.expirationMonth;
  }

  private setExpirationMonth(expirationMonth: number) {
    this.expirationMonth = expirationMonth;
  }

  public getExpirationYear(): number {
    return this.expirationYear;
  }

  private setExpirationYear(expirationYear: number) {
    this.expirationYear = expirationYear;
  }

  private setModel(creditCardModel: CreditCardModel): void {
    this.creditCardModel = creditCardModel;
  }

  public getExpirationDate(): number {
    try {
      const RADIX = 10;
      const contatenatedNumber: string =
        '' + this.getExpirationMonth() + this.getExpirationYear();
      return parseInt( contatenatedNumber, RADIX );
    } catch ( error ) {
      console.error(error);
    }
    return 0;
  }

  public isValid(): boolean {
    return this.isCreditCardNumberValid() && this.isSecurityNumberValid();
  }

  private isCreditCardNumberValid(): boolean {
    const creditCardNumberPattern: RegExp = new RegExp(CreditCardClass.creditCardRegex);
    const creditCardNumberAsString: string = this.getProductNumber() + '';
    return creditCardNumberPattern.test(creditCardNumberAsString);
  }

  private isSecurityNumberValid(): boolean {
    const securityNumberPattern: RegExp = new RegExp(CreditCardClass.securityNumberRegex);
    const securityNumberAsString: string = this.getSecurityNumber() + '';
    return securityNumberPattern.test(securityNumberAsString);
  }

}
