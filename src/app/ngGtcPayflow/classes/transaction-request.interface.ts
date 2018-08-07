import {CreditCardClass} from './credit-card.class';

export interface TransactionRequestInterface {
  getRequestToServer(): any;
  getAmount(): number;
  getCreditCard(): CreditCardClass;
}
