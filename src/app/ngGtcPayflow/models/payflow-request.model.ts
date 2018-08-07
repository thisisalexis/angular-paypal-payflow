import {PayflowPaymentMethodEnum} from '../enums/payflow-payment-method.enum';
import {PayFlowTransactionTypeEnum} from '../enums/payflow-transaction-type.enum';
import {PayflowPartnerEnum} from '../enums/payflow-partner.enum';

export class PayflowRequestModel {
  partner: PayflowPartnerEnum;
  vendor: string;
  user: string;
  password: string;
  paymentMethod: PayflowPaymentMethodEnum;
  creditCardNumber: number;
  expirationDate: number;
  transactionType: PayFlowTransactionTypeEnum;
  amount: number;
}
