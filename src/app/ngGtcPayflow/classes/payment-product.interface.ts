export interface PaymentProductInterface {
  getCardHolderName(): string;
  getProductNumber(): number;
  isValid(): boolean;
}
