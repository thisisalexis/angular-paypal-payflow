import {PayflowResponseResultEnum} from '../enums/payflow-response-result.enum';

export class  PayflowResponseModel {
  result: PayflowResponseResultEnum;
  payflowTransactionId: string;
  responseMessage: string;
  authCode: string;



}
