import {PayflowPartnerEnum} from '../app/ngGtcPayflow/enums/payflow-partner.enum';
import {PayflowRequestVerbosityEnum} from '../app/ngGtcPayflow/enums/payflow-request-verbosity.enum';
import {PayFlowTransactionTypeEnum} from '../app/ngGtcPayflow/enums/payflow-transaction-type.enum';

export const environment = {
  production: true,
  ng_gtc_payflow: {
    apiUrl: 'https://pilot-payflowpro.paypal.com',
    partner: PayflowPartnerEnum.paypal,
    vendor: 'galapagostravelcenter0312',
    user: 'galapagostravelcenter0312',
    password: 'xxx',
    defaultVerbosity: PayflowRequestVerbosityEnum.high,
    defaultTransactionType: PayFlowTransactionTypeEnum.sale
  }
};
