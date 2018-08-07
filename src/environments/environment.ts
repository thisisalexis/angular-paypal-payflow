// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

import {PayflowRequestVerbosityEnum} from '../app/ngGtcPayflow/enums/payflow-request-verbosity.enum';
import {PayFlowTransactionTypeEnum} from '../app/ngGtcPayflow/enums/payflow-transaction-type.enum';
import {PayflowPartnerEnum} from '../app/ngGtcPayflow/enums/payflow-partner.enum';

export const environment = {
  production: false,
  ngGtcPayflow: {
    apiUrl: 'https://pilot-payflowpro.paypal.com',
    partner: PayflowPartnerEnum.paypal,
    vendor: 'vktest',
    user: 'vktest',
    password: 'newpass1234',
    defaultVerbosity: PayflowRequestVerbosityEnum.high,
    defaultTransactionType: PayFlowTransactionTypeEnum.sale
  }
};
