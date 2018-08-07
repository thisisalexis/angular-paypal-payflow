/*
* https://www.paypalobjects.com/en_US/vhelp/paypalmanager_help/result_values_for_transaction_declines_or_errors.htm
* */
export enum PayflowResponseResultEnum {
  approved = 0,
  rejected = 1,
  invalidTenderType = 2,
  invalidTransactionType = 3,
  invalidAmountFormat = 4,
  invalidMerchantInformation = 5,
  invalidCurrencyCode = 6,
  fieldFormatError = 7,
  notATransactionServer = 8,
  tooManyParametersOrInvalidStream = 9,
  tooManyLineItems = 10,
  clientTimeoutWaitingForResponse = 11,
  declined = 12,
  referral = 13,
  invalidClientCertificationId = 14,
  originalTransactionIdNotFound = 19,
  // TODO Completar lista
}
