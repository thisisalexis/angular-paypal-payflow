import {PayflowPartnerEnum} from '../enums/payflow-partner.enum';
import {PayflowRequestVerbosityEnum} from '../enums/payflow-request-verbosity.enum';
import {PayFlowTransactionTypeEnum} from '../enums/payflow-transaction-type.enum';

export interface PayflowEnvironmentParameterModel {
  apiUrl: string;
  partner: PayflowPartnerEnum;
  vendor: string;
  user: string;
  password: string;
  defaultVerbosity: PayflowRequestVerbosityEnum;
  defaultTransactionType: PayFlowTransactionTypeEnum;
}
