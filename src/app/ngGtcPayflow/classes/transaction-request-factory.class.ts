import {PayflowEnvironmentParameterModel} from '../models/payflow-environment-parameter.model';
import {CreditCardPayflowTransactionRequestClass} from './credit-card-payflow-transaction-request.class';
import {PayflowPaymentMethodEnum} from '../enums/payflow-payment-method.enum';
import {TransactionRequestInterface} from './transaction-request.interface';
import {CreditCardClass} from './credit-card.class';
import {PayFlowTransactionTypeEnum} from '../enums/payflow-transaction-type.enum';
import {TransactionResponseInterface} from './transaction-response.interface';

export class TransactionRequestFactoryClass {

  private static readonly transactionRequestFactory: TransactionRequestFactoryClass = new TransactionRequestFactoryClass;

  private constructor() {}

  public static getInstance(): TransactionRequestFactoryClass {
    return TransactionRequestFactoryClass.transactionRequestFactory;
  }

  public createPayflowSaleTransaction(payflowEnvironmentParameter: PayflowEnvironmentParameterModel,
                                        creditCardObject: CreditCardClass,
                                        amount: number): TransactionRequestInterface {

    const creditCardPaymentRequest: CreditCardPayflowTransactionRequestClass
      = new CreditCardPayflowTransactionRequestClass();

    creditCardPaymentRequest.setPartner(payflowEnvironmentParameter.partner);
    creditCardPaymentRequest.setVendor(payflowEnvironmentParameter.vendor);
    creditCardPaymentRequest.setUser(payflowEnvironmentParameter.user);
    creditCardPaymentRequest.setPassword(payflowEnvironmentParameter.password);
    creditCardPaymentRequest.setVerbosity(payflowEnvironmentParameter.defaultVerbosity);
    creditCardPaymentRequest.setTransactionType(payflowEnvironmentParameter.defaultTransactionType);
    creditCardPaymentRequest.setPaymentMethod(PayflowPaymentMethodEnum.creditCard);
    creditCardPaymentRequest.setCreditCard(creditCardObject);
    creditCardPaymentRequest.setAmount(amount);
    return creditCardPaymentRequest;
  }

  public createPayflowVerificationTransaction(payflowEnvironmentParameter: PayflowEnvironmentParameterModel,
                                                     creditCardObject: CreditCardClass): TransactionRequestInterface {
    const creditCardPaymentRequest: CreditCardPayflowTransactionRequestClass
      = new CreditCardPayflowTransactionRequestClass();

    creditCardPaymentRequest.setPartner(payflowEnvironmentParameter.partner);
    creditCardPaymentRequest.setVendor(payflowEnvironmentParameter.vendor);
    creditCardPaymentRequest.setUser(payflowEnvironmentParameter.user);
    creditCardPaymentRequest.setPassword(payflowEnvironmentParameter.password);
    creditCardPaymentRequest.setVerbosity(payflowEnvironmentParameter.defaultVerbosity);
    creditCardPaymentRequest.setTransactionType(PayFlowTransactionTypeEnum.authorization);
    creditCardPaymentRequest.setPaymentMethod(PayflowPaymentMethodEnum.creditCard);
    creditCardPaymentRequest.setCreditCard(creditCardObject);
    creditCardPaymentRequest.setAmount(0);
    return creditCardPaymentRequest;
  }

  public createPayflowAutorizationTransaction(payflowEnvironmentParameter: PayflowEnvironmentParameterModel,
                                             creditCardObject: CreditCardClass,
                                             amount: number): TransactionRequestInterface {
    const creditCardPaymentRequest: CreditCardPayflowTransactionRequestClass
      = new CreditCardPayflowTransactionRequestClass();

    creditCardPaymentRequest.setPartner(payflowEnvironmentParameter.partner);
    creditCardPaymentRequest.setVendor(payflowEnvironmentParameter.vendor);
    creditCardPaymentRequest.setUser(payflowEnvironmentParameter.user);
    creditCardPaymentRequest.setPassword(payflowEnvironmentParameter.password);
    creditCardPaymentRequest.setVerbosity(payflowEnvironmentParameter.defaultVerbosity);
    creditCardPaymentRequest.setTransactionType(PayFlowTransactionTypeEnum.authorization);
    creditCardPaymentRequest.setPaymentMethod(PayflowPaymentMethodEnum.creditCard);
    creditCardPaymentRequest.setCreditCard(creditCardObject);
    creditCardPaymentRequest.setAmount(amount);
    return creditCardPaymentRequest;
  }

  public createPayflowDelayedTransaction(payflowEnvironmentParameter: PayflowEnvironmentParameterModel,
                                        creditCardObject: CreditCardClass,
                                        authorizationTransactionResponse: TransactionResponseInterface,
                                        amount: number): TransactionRequestInterface {

    const authorizationTransactionId: string = authorizationTransactionResponse.getPayflowTransactionId();

    if ( authorizationTransactionResponse.isError()
      || authorizationTransactionResponse.getTransactionRequest().getAmount() < amount
      || this.isEmptyNullOrUndefined (authorizationTransactionId)
    ) {
      throw new Error('Amount cannot be greater than authorized amount.');
    }

    const creditCardPaymentRequest: CreditCardPayflowTransactionRequestClass
      = new CreditCardPayflowTransactionRequestClass();

    creditCardPaymentRequest.setPartner(payflowEnvironmentParameter.partner);
    creditCardPaymentRequest.setVendor(payflowEnvironmentParameter.vendor);
    creditCardPaymentRequest.setUser(payflowEnvironmentParameter.user);
    creditCardPaymentRequest.setPassword(payflowEnvironmentParameter.password);
    creditCardPaymentRequest.setVerbosity(payflowEnvironmentParameter.defaultVerbosity);
    creditCardPaymentRequest.setTransactionType(PayFlowTransactionTypeEnum.delayedCapture);
    creditCardPaymentRequest.setPaymentMethod(PayflowPaymentMethodEnum.creditCard);
    creditCardPaymentRequest.setCreditCard(creditCardObject);
    creditCardPaymentRequest.setOriginalTransactionId( authorizationTransactionId );
    creditCardPaymentRequest.setAmount(amount);
    return creditCardPaymentRequest;
  }

  private isEmptyNullOrUndefined(elementToValidate: string): boolean {
    return elementToValidate === '' || elementToValidate === null || elementToValidate === undefined;
  }

}
