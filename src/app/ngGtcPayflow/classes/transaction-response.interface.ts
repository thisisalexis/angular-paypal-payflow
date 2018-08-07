import {TransactionRequestInterface} from './transaction-request.interface';

export interface TransactionResponseInterface {
  getServerResponse(): string;
  getId(): string;
  getPayflowTransactionId(): string;
  getResponseMessage(): string;
  isSuccess(): boolean;
  isError(): boolean;
  getTransactionRequest(): TransactionRequestInterface;
}
