export interface CreditCardModel {
  creditCardHolderName: string;
  creditCardNumber: number;
  securityNumber: number;
  expirationDate: {
    expirationMonth: number;
    expirationYear: number;
  };
}
