import {TransactionRequestInterface} from './transaction-request.interface';
import {TransactionResponseInterface} from './transaction-response.interface';

export interface PaymentInterface {
  getTransactionRequest(): TransactionRequestInterface;
  getTransactionResponse(): TransactionResponseInterface;
}
