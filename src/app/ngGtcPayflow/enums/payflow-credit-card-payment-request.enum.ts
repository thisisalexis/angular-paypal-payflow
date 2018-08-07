export enum PayflowCreditCardPaymentRequestEnum {
  partner = 'PARTNER',
  vendor = 'VENDOR',
  user = 'USER',
  password = 'PWD',
  paymentMethod = 'TENDER',
  creditCardNumber = 'ACCT',
  expirationDate = 'EXPDATE',
  transactionType = 'TRXTYPE',
  amount = 'AMT',
  verbosity = 'VERBOSITY',
  payflowTransactionId = 'ORIGID'
  /*
  PARTNER=PayPal
  &VENDOR=vktest
  &USER=vktest
  &PWD=newpass1234
  &TRXTYPE[1]=A
  &TENDER[1]=C
  &VERBOSITY[6]=MEDIUM
  &ACCT[16]=5354988311998469
  &EXPDATE[4]=1020
  &AMT[5]=10.00
  &CVV2[3]=978
  &COMMENT1[23]=Global Test Transaction
  &FIRS=John
  &LASTNAME[5]=Smith
  &STREET[11]=123 Main St
  &CITY[7]=SanJose
  &STATE[2]=CA
  &ZIP[5]=68128&COUNTRY[2]=US
   */
}
