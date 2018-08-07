import {PayflowPaymentClass} from './payflow-payment.class';
import {TransactionRequestInterface} from './transaction-request.interface';
import {TransactionResponseInterface} from './transaction-response.interface';

export class CreditCardPayflowPaymentClass extends PayflowPaymentClass {

  private transactionRequest: TransactionRequestInterface;
  private transactionResponse: TransactionResponseInterface;

  public constructor(transactionRequest: TransactionRequestInterface) {
    super();
    this.transactionRequest = transactionRequest;
  }

  public getTransactionRequest(): TransactionRequestInterface {
    return null;
  }

  public getTransactionResponse(): TransactionResponseInterface {
    return this.transactionResponse;
  }

}
