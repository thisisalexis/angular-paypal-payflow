import {TransactionResponseInterface} from './transaction-response.interface';
import {UtilClass} from './Util.class';
import {PayflowCreditCardPaymentResponseEnum} from '../enums/payflow-credit-card-payment-response-enum';
import {PayflowResponseResultEnum} from '../enums/payflow-response-result.enum';
import {AddressVerificationServiceEnum} from '../enums/address-verification-service.enum';
import {CardSecurityCodeMatchResponseEnum} from '../enums/card-security-code-match-response.enum';
import {CreditCardTypeEnum} from '../enums/credit-card-type.enum';
import {DuplicateEnum} from '../enums/duplicate.enum';
import {TransactionRequestInterface} from './transaction-request.interface';

export class PayflowTransactionResponseClass implements TransactionResponseInterface {

  private encodedNameValuePairResponseString: string;
  private transactionRequest: TransactionRequestInterface;
  private result: PayflowResponseResultEnum;
  private payflowTransactionId: string;
  private paypalProcessorTransactionId: string;
  private responseMessage: string;
  private authCode: string;
  private addressVerificationServiceStreetAddress: AddressVerificationServiceEnum;
  private addressVerificationServiceZip: AddressVerificationServiceEnum;
  private cardSecurityCodeMatch: CardSecurityCodeMatchResponseEnum;
  private correlationId: string;
  private rawAddressVerificationServiceResponse: string;
  private rawCVV2Response: string;
  private internationalAddressVerificationService: AddressVerificationServiceEnum;
  private hostCode: string;
  private hostCodeResponseText: string;
  private rawBuyerAuthentication: string;
  private additionalErrorMessage: string;
  private paymentType: string;
  private amexId: string;
  private amexPostData: string;
  private ccTransactionId: string;
  private ccTransactionPostData: string;
  private amount: number;
  private originalAmount: number;
  private cardType: CreditCardTypeEnum;
  private emailMatch: string;
  private phoneMatch: string;
  private extraProcessorMessage: string;
  private transactionTime: string;
  private duplicate: DuplicateEnum;
  private dateToSettle: string;
  private paymentAdviceCode: string;
  private transactionState: string;

  public constructor(encodedNameValuePairResponseString: string, transactionRequest: TransactionRequestInterface) {
    this.encodedNameValuePairResponseString = encodedNameValuePairResponseString;
    this.setTransactionRequest(transactionRequest);
    this.initializeInstanceMembers();
  }

  public getId(): string {
    return this.getPaypalProcessorTransactionId();
  }

  public isSuccess(): boolean {
    return this.getResult() === PayflowResponseResultEnum.approved;
  }

  public isError(): boolean {
    return this.getResult() !== PayflowResponseResultEnum.approved;
  }

  public getServerResponse(): string {
    return this.encodedNameValuePairResponseString;
  }

  private initializeInstanceMembers(): void {
    try {
      const nameValuePairMap: Map<string, string> =
        this.createMapOfDecodedElementsFromListOfNameValuePairEncodedResponseString();

      this.initializeInstanceMembersFromValuePairMap(nameValuePairMap);
    } catch ( error ) {
      console.error( error );
    }
  }

  private createMapOfDecodedElementsFromListOfNameValuePairEncodedResponseString (): Map<string, string> {
    const nameValuePairMap: Map<string, string> = new Map<string, string>();
    try {
      UtilClass.splitStringSeparatedByAmpersandSignIntoArray( this.getEncodedNameValuePairResponseString() )
        .forEach( ( elementOfNameValuePairEncodedResponseString ) => {
          const nameValuePairElementArray: string[] = UtilClass.splitStringSeparatedByEqualsSignIntoArray(
            elementOfNameValuePairEncodedResponseString );
          const nameElement: string = this.getNameElementFromNameValuePairArray( nameValuePairElementArray );
          const valueElement: string = this.getValueElementFromNameValuePairArray( nameValuePairElementArray );
          nameValuePairMap.set( nameElement, valueElement );
        } );
      return nameValuePairMap;
    } catch ( error ) {
      console.error ( error );
    }
    return nameValuePairMap;
  }

  private getNameElementFromNameValuePairArray( nameValuePairArray: string[] ): string {
    const NAME_ELEMENT_POSITION_IN_ARRAY = 0;
    return UtilClass.getElementInAnArrayFromAGivenPosition<string>( nameValuePairArray, NAME_ELEMENT_POSITION_IN_ARRAY );
  }

  private getValueElementFromNameValuePairArray( nameValuePairArray: string[] ): string {
    const NAME_ELEMENT_POSITION_IN_ARRAY = 1;
    return UtilClass.getElementInAnArrayFromAGivenPosition<string>( nameValuePairArray, NAME_ELEMENT_POSITION_IN_ARRAY );
  }

  private initializeInstanceMembersFromValuePairMap(mapOfNameValuePairDecodedResponse: Map<string, string>): void {

    const result: number =  parseInt( UtilClass.getValueFromMap( mapOfNameValuePairDecodedResponse,
      PayflowCreditCardPaymentResponseEnum.result ), 10 );
    this.setResult(result);

    const payflowTransactionId: string = UtilClass.getValueFromMap( mapOfNameValuePairDecodedResponse,
      PayflowCreditCardPaymentResponseEnum.payflowTransactionId );
    this.setPayflowTransactionId(payflowTransactionId);

    const paypalProcessorTransactionId: string = UtilClass.getValueFromMap( mapOfNameValuePairDecodedResponse,
      PayflowCreditCardPaymentResponseEnum.paypalProcessorTransactionId );
    this.setPaypalProcessorTransactionId(paypalProcessorTransactionId);

    const responseMessage: string = UtilClass.getValueFromMap( mapOfNameValuePairDecodedResponse,
      PayflowCreditCardPaymentResponseEnum.responseMessage );
    this.setResponseMessage(responseMessage);

    const authCode: string = UtilClass.getValueFromMap( mapOfNameValuePairDecodedResponse,
      PayflowCreditCardPaymentResponseEnum.authCode );
    this.setAuthCode(authCode);

    const addressVerificationServiceStreetAddress: string = UtilClass.getValueFromMap( mapOfNameValuePairDecodedResponse,
      PayflowCreditCardPaymentResponseEnum.addressVerificationServiceStreetAddress );
    this.setAddressVerificationServiceStreetAddress(AddressVerificationServiceEnum[addressVerificationServiceStreetAddress]);

    const addressVerificationServiceZip: string = UtilClass.getValueFromMap( mapOfNameValuePairDecodedResponse,
      PayflowCreditCardPaymentResponseEnum.addressVerificationServiceZip );
    this.setAddressVerificationServiceZip(AddressVerificationServiceEnum[addressVerificationServiceZip]);

    const cardSecurityCodeMatch: string = UtilClass.getValueFromMap( mapOfNameValuePairDecodedResponse,
      PayflowCreditCardPaymentResponseEnum.cardSecurityCodeMatch );
    this.setCardSecurityCodeMatch(CardSecurityCodeMatchResponseEnum[cardSecurityCodeMatch]);

    const correlationId: string = UtilClass.getValueFromMap( mapOfNameValuePairDecodedResponse,
      PayflowCreditCardPaymentResponseEnum.correlationId );
    this.setCorrelationId(correlationId);

    const rawAddressVerificationServiceResponse: string = UtilClass.getValueFromMap( mapOfNameValuePairDecodedResponse,
      PayflowCreditCardPaymentResponseEnum.rawAddressVerificationServiceResponse );
    this.setRawAddressVerificationServiceResponse(rawAddressVerificationServiceResponse);

    const rawCVV2Response: string = UtilClass.getValueFromMap( mapOfNameValuePairDecodedResponse,
      PayflowCreditCardPaymentResponseEnum.rawCVV2Response );
    this.setRawCVV2Response(rawCVV2Response);

    const internationalAddressVerificationService: string =
      UtilClass.getValueFromMap( mapOfNameValuePairDecodedResponse,
      PayflowCreditCardPaymentResponseEnum.internationalAddressVerificationService );
    this.setInternationalAddressVerificationService(
      AddressVerificationServiceEnum[internationalAddressVerificationService]);

    const hostCode: string = UtilClass.getValueFromMap( mapOfNameValuePairDecodedResponse,
      PayflowCreditCardPaymentResponseEnum.hostCode );
    this.setHostCode(hostCode);

    const hostCodeResponseText: string = UtilClass.getValueFromMap( mapOfNameValuePairDecodedResponse,
      PayflowCreditCardPaymentResponseEnum.hostCodeResponseText );
    this.setHostCodeResponseText(hostCodeResponseText);

    const rawBuyerAuthentication: string = UtilClass.getValueFromMap( mapOfNameValuePairDecodedResponse,
      PayflowCreditCardPaymentResponseEnum.rawBuyerAuthentication );
    this.setRawBuyerAuthentication(rawBuyerAuthentication);

    const additionalErrorMessage: string = UtilClass.getValueFromMap( mapOfNameValuePairDecodedResponse,
      PayflowCreditCardPaymentResponseEnum.additionalErrorMessage );
    this.setAdditionalErrorMessage(additionalErrorMessage);

    const paymentType: string = UtilClass.getValueFromMap( mapOfNameValuePairDecodedResponse,
      PayflowCreditCardPaymentResponseEnum.paymentType );
    this.setPaymentType(paymentType);

    const amexId: string = UtilClass.getValueFromMap( mapOfNameValuePairDecodedResponse,
      PayflowCreditCardPaymentResponseEnum.amexId );
    this.setAmexId(amexId);

    const amexPostData: string = UtilClass.getValueFromMap( mapOfNameValuePairDecodedResponse,
      PayflowCreditCardPaymentResponseEnum.amexPostData );
    this.setAmexPostData(amexPostData);

    const ccTransactionId: string = UtilClass.getValueFromMap( mapOfNameValuePairDecodedResponse,
      PayflowCreditCardPaymentResponseEnum.ccTransactionId );
    this.setCcTransactionId(ccTransactionId);

    const ccTransactionPostData: string = UtilClass.getValueFromMap( mapOfNameValuePairDecodedResponse,
      PayflowCreditCardPaymentResponseEnum.ccTransactionPostData );
    this.setCcTransactionPostData(ccTransactionPostData);

    const amount: number =  parseInt( UtilClass.getValueFromMap( mapOfNameValuePairDecodedResponse,
      PayflowCreditCardPaymentResponseEnum.amount ), 10 );
    this.setAmount(amount);

    const originalAmount: number =  parseInt( UtilClass.getValueFromMap( mapOfNameValuePairDecodedResponse,
      PayflowCreditCardPaymentResponseEnum.originalAmount ), 10 );
    this.setOriginalAmount(originalAmount);

    const cardType: string = UtilClass.getValueFromMap( mapOfNameValuePairDecodedResponse,
        PayflowCreditCardPaymentResponseEnum.cardType );
    this.setCardType(CreditCardTypeEnum[cardType]);

    const emailMatch: string = UtilClass.getValueFromMap( mapOfNameValuePairDecodedResponse,
      PayflowCreditCardPaymentResponseEnum.emailMatch );
    this.setEmailMatch(emailMatch);

    const phoneMatch: string = UtilClass.getValueFromMap( mapOfNameValuePairDecodedResponse,
      PayflowCreditCardPaymentResponseEnum.phoneMatch );
    this.setPhoneMatch(phoneMatch);

    const extraProcessorMessage: string = UtilClass.getValueFromMap( mapOfNameValuePairDecodedResponse,
      PayflowCreditCardPaymentResponseEnum.extraProcessorMessage );
    this.setExtraProcessorMessage(extraProcessorMessage);

    const transactionTime: string = UtilClass.getValueFromMap( mapOfNameValuePairDecodedResponse,
      PayflowCreditCardPaymentResponseEnum.transactionTime );
    this.setTransactionTime(transactionTime);

    const duplicate: number = parseInt (UtilClass.getValueFromMap( mapOfNameValuePairDecodedResponse,
      PayflowCreditCardPaymentResponseEnum.duplicate ), 10);
    this.setDuplicate(duplicate);

    const dateToSettle: string = UtilClass.getValueFromMap( mapOfNameValuePairDecodedResponse,
      PayflowCreditCardPaymentResponseEnum.dateToSettle );
    this.setDateToSettle(dateToSettle);

    const paymentAdviceCode: string = UtilClass.getValueFromMap( mapOfNameValuePairDecodedResponse,
      PayflowCreditCardPaymentResponseEnum.paymentAdviceCode );
    this.setPaymentAdviceCode(paymentAdviceCode);

    const transactionState: string = UtilClass.getValueFromMap( mapOfNameValuePairDecodedResponse,
      PayflowCreditCardPaymentResponseEnum.transactionState );
    this.setTransactionState(transactionState);

  }

  public getTransactionRequest(): TransactionRequestInterface {
    return this.transactionRequest;
  }

  private setTransactionRequest(transactionRequestInterface: TransactionRequestInterface): void {
    this.transactionRequest = transactionRequestInterface;
  }

  public getResult(): PayflowResponseResultEnum {
    return this.result;
  }

  private setResult(result: PayflowResponseResultEnum): void {
    this.result = result;
  }

  public getPayflowTransactionId(): string {
    return this.payflowTransactionId;
  }

  private setPayflowTransactionId(payflowTransactionId: string): void {
    this.payflowTransactionId = payflowTransactionId;
  }

  public getPaypalProcessorTransactionId(): string {
    return this.paypalProcessorTransactionId;
  }

  private setPaypalProcessorTransactionId(paypalProcessorTransactionId: string): void {
    this.paypalProcessorTransactionId = paypalProcessorTransactionId;
  }

  public getResponseMessage(): string {
    return this.responseMessage;
  }

  private setResponseMessage(responseMessage: string) {
    this.responseMessage = responseMessage;
  }

  public getAuthCode(): string {
    return this.authCode;
  }

  private setAuthCode(authCode: string): void {
    this.authCode = authCode;
  }

  private setAddressVerificationServiceStreetAddress(addressVerificationServiceStreetAddress: AddressVerificationServiceEnum): void {
    this.addressVerificationServiceStreetAddress = addressVerificationServiceStreetAddress;
  }

  public getAddressVerificationServiceStreetAddress(): AddressVerificationServiceEnum {
    return this.addressVerificationServiceStreetAddress;
  }

  private setAddressVerificationServiceZip(addressVerificationServiceZip: AddressVerificationServiceEnum): void {
    this.addressVerificationServiceZip = addressVerificationServiceZip;
  }

  public getAddressVerificationServiceZip(): AddressVerificationServiceEnum {
    return this.addressVerificationServiceZip;
  }

  public getCardSecurityCodeMatch(): CardSecurityCodeMatchResponseEnum {
    return this.cardSecurityCodeMatch;
  }

  private setCardSecurityCodeMatch(cardSecurityCodeMatch: CardSecurityCodeMatchResponseEnum): void {
    this.cardSecurityCodeMatch = cardSecurityCodeMatch;
  }

  public getCorrelationId(): string {
    return this.correlationId;
  }

  private setCorrelationId(correlationId: string): void {
    this.correlationId = correlationId;
  }

  public getRawAddressVerificationServiceResponse(): string {
    return this.rawAddressVerificationServiceResponse;
  }

  private setRawAddressVerificationServiceResponse(rawAddressVerificationServiceResponse: string): void {
    this.rawAddressVerificationServiceResponse = rawAddressVerificationServiceResponse;
  }

  public getRawCVV2Response(): string {
    return this.rawCVV2Response;
  }

  private setRawCVV2Response(rawCVV2Response: string): void {
    this.rawCVV2Response = rawCVV2Response;
  }

  private setInternationalAddressVerificationService(
    internationalAddressVerificationService: AddressVerificationServiceEnum): void {
    this.internationalAddressVerificationService = internationalAddressVerificationService;
  }

  public getInternationalAddressVerificationService(): AddressVerificationServiceEnum {
    return this.internationalAddressVerificationService;
  }

  public getHostCode(): string {
    return this.hostCode;
  }

  private setHostCode(hostCode: string): void {
    this.hostCode = hostCode;
  }

  public getHostCodeResponseText(): string {
    return this.hostCodeResponseText;
  }

  private setHostCodeResponseText(hostCodeResponseText: string): void {
    this.hostCodeResponseText = hostCodeResponseText;
  }

  public getRawBuyerAuthentication(): string {
    return this.rawBuyerAuthentication;
  }

  private setRawBuyerAuthentication(rawBuyerAuthentication: string): void {
    this.rawBuyerAuthentication = rawBuyerAuthentication;
  }

  public getAdditionalErrorMessage(): string {
    return this.additionalErrorMessage;
  }

  private setAdditionalErrorMessage(additionalErrorMessage: string): void {
    this.additionalErrorMessage = additionalErrorMessage;
  }

  public getPaymentType(): string {
    return this.paymentType;
  }

  private setPaymentType(paymentType: string): void {
    this.paymentType = paymentType;
  }

  public getAmexId(): string {
    return this.amexId;
  }

  private setAmexId(amexId: string): void {
    this.amexId = amexId;
  }

  public getAmexPostData(): string {
    return this.amexPostData;
  }

  private setAmexPostData(amexPostData: string): void {
    this.amexPostData = amexPostData;
  }

  public getCcTransactionId(): string {
    return this.ccTransactionId;
  }

  private setCcTransactionId(ccTransactionId: string): void {
    this.ccTransactionId = ccTransactionId;
  }

  public getCcTransactionPostData(): string {
    return this.ccTransactionPostData;
  }

  private setCcTransactionPostData(ccTransactionPostData: string): void {
    this.ccTransactionPostData = ccTransactionPostData;
  }

  public getAmount(): number {
    return this.amount;
  }

  private setAmount(amount: number): void {
    this.amount = amount;
  }

  public getOriginalAmount(): number {
    return this.originalAmount;
  }

  private setOriginalAmount(originalAmount: number): void {
    this.originalAmount = originalAmount;
  }

  public getCardType(): CreditCardTypeEnum {
    return this.cardType;
  }

  private setCardType(cardType: CreditCardTypeEnum): void {
    this.cardType = cardType;
  }

   public getEmailMatch(): string {
    return this.emailMatch;
   }

   private setEmailMatch(emailMatch: string) {
    this.emailMatch = emailMatch;
   }

   public getPhoneMatch(): string {
    return this.phoneMatch;
   }

   private setPhoneMatch(phoneMatch: string): void {
    this.phoneMatch = phoneMatch;
   }

  public getExtraProcessorMessage(): string {
    return this.extraProcessorMessage;
  }

  private setExtraProcessorMessage(extraProcessorMessage: string): void {
    this.extraProcessorMessage = extraProcessorMessage;
  }

  public getTransactionTime(): string {
    return this.transactionTime;
  }

  private setTransactionTime(transactionTime: string): void {
    this.transactionTime = transactionTime;
  }

  public getDuplicate(): DuplicateEnum {
    return this.duplicate;
  }

  public setDuplicate(duplicate: DuplicateEnum): void {
    this.duplicate = duplicate;
  }

  public getDateToSettle(): string {
    return this.dateToSettle;
  }

  private setDateToSettle(dateToSettle: string): void {
    this.dateToSettle = dateToSettle;
  }

  public getPaymentAdviceCode(): string {
    return this.paymentAdviceCode;
  }

  private setPaymentAdviceCode(paymentAdviceCode: string): void {
    this.paymentAdviceCode = paymentAdviceCode;
  }

  public getTransactionState(): string {
    return this.transactionState;
  }

  private setTransactionState(transactionState: string): void {
    this.transactionState = transactionState;
  }

  private getEncodedNameValuePairResponseString(): string {
    return this.encodedNameValuePairResponseString;
  }

}
