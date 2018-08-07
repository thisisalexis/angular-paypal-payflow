import {TransactionRequestInterface} from './transaction-request.interface';
import {PayflowPartnerEnum} from '../enums/payflow-partner.enum';
import {PayflowPaymentMethodEnum} from '../enums/payflow-payment-method.enum';
import {PayFlowTransactionTypeEnum} from '../enums/payflow-transaction-type.enum';
import {CreditCardClass} from './credit-card.class';
import {PayflowRequestVerbosityEnum} from '../enums/payflow-request-verbosity.enum';

export abstract class PayflowTransactionRequestClass implements TransactionRequestInterface {
  public constructor() {}
  public abstract getRequestToServer(): any;
  public abstract getPartner(): PayflowPartnerEnum;
  public abstract getVendor(): string;
  public abstract getUser(): string;
  public abstract getPassword(): string;
  public abstract getPaymentMethod(): PayflowPaymentMethodEnum;
  public abstract getTransactionType(): PayFlowTransactionTypeEnum;
  public abstract getAmount(): number;
  public abstract getCreditCard(): CreditCardClass;
  public abstract getVerbosity(): PayflowRequestVerbosityEnum;
}
