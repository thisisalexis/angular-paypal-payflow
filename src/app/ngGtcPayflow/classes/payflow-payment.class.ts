import {PaymentInterface} from './payment.interface';
import {TransactionRequestInterface} from './transaction-request.interface';
import {TransactionResponseInterface} from './transaction-response.interface';

export abstract class PayflowPaymentClass implements PaymentInterface {
  public constructor() {}
  public abstract getTransactionRequest(): TransactionRequestInterface;
  public abstract getTransactionResponse(): TransactionResponseInterface;
}
