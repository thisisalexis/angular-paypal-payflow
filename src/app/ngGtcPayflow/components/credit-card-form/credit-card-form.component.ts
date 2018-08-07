import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NgGtcPayflowService} from '../../services/ng-gtc-payflow/ng-gtc-payflow.service';
import { isNullOrUndefined } from 'util';
import {UtilClass} from '../../classes/Util.class';
import {Observable} from 'rxjs/Rx';
import {CreditCardClass} from '../../classes/credit-card.class';
import {TransactionResponseInterface} from '../../classes/transaction-response.interface';

@Component({
  templateUrl: 'credit-card-form.component.html',
  selector: 'ng-gtc-payflow-credit-card-form'
})
export class CreditCardFormComponent implements OnInit {
  @Input() amount: number = 10000;
  public creditCardFormGroup: FormGroup;
  public arrayOfExpirationMonths: number[] = [];
  public arrayOfExpirationYears: number[] = [];
  public isShowErrorMessageInForm = false;

  public constructor( private payflowService: NgGtcPayflowService ) {}

  public ngOnInit() {
    this.setUpForm();
    this.arrayOfExpirationMonths = UtilClass.createArrayOfExpirationMonths();
    this.arrayOfExpirationYears = UtilClass.createArrayOfExpirationYears( CreditCardClass.maxYearsExpirationDate );
  }

  private setUpForm(): void {
    try {

      this.creditCardFormGroup = new FormGroup( {
        creditCardHolderName: new FormControl( 'Paypal', [ Validators.required ] ),
        creditCardNumber: new FormControl( '5354988311998469', [ Validators.required, this.creditCardNumberValidation.bind( this ) ] ),
        expirationDate:  new FormGroup( {
          expirationMonth: new FormControl( 10, [ Validators.required, Validators.pattern( CreditCardClass.expirationMonthRegex ) ] ),
          expirationYear: new FormControl( 2020, [ Validators.required, Validators.pattern( CreditCardClass.expirationYearRegex ) ] )
        }, this.expirationDateValidation.bind( this ) ),
        securityNumber: new FormControl( 978, [ Validators.required, Validators.pattern( CreditCardClass.securityNumberRegex ) ] )
      });
    } catch ( error ) {
      console.log( 'CreditCardFormComponent.setUpForm()' );
      console.error ( error );
    }
  }

  private creditCardNumberValidation( creditCardNumberField: FormControl ): { error?: boolean } {
    try {
      const unformattedCreditCardNumber = creditCardNumberField.value;

      if ( isNullOrUndefined( unformattedCreditCardNumber ) ) {
        return {};
      }
      const formattedCreditCardNumber: string = UtilClass.formatCreditCardNumber( unformattedCreditCardNumber );
      if ( formattedCreditCardNumber.match( new RegExp( CreditCardClass.creditCardRegex ) ) ) {
        return {};
      } else {
        return { error: true };
      }
    } catch ( error ) {
      console.log( 'CreditCardFormComponent.creditCardNumberValidation()' );
      console.error( error );
      return { error: true };
    }
  }

  private expirationDateValidation( expirationDateForm: FormGroup ): { validationError?: boolean } {
    const resultObject = { validationError: false };
    try {
      const FIRST_DAY_OF_MONTH = 1;

      const selectedYear: number = expirationDateForm.get('expirationYear').value;
      const selectedMonth: number = expirationDateForm.get('expirationMonth').value;
      const expirationDateObject: Date =  UtilClass.getDate( selectedYear, selectedMonth, FIRST_DAY_OF_MONTH );
      const todayDate: Date = new Date();
      const firstDayOfCurrentMonth: Date = UtilClass.getDate( todayDate.getFullYear(), todayDate.getMonth(), FIRST_DAY_OF_MONTH );

      if ( isNullOrUndefined( selectedMonth )
        || isNullOrUndefined( selectedYear )
        || isNullOrUndefined( expirationDateObject )
        || expirationDateObject < firstDayOfCurrentMonth  ) {
        resultObject.validationError = true;
      }

      return resultObject.validationError === true ? resultObject : {};
    } catch ( error ) {
      resultObject.validationError = true;
      console.log( 'CreditCardFormComponent.expirationDateValidation()' );
      console.error( error );
      return resultObject;
    }
  }

  public confirm(): void {
    try {
      if ( this.creditCardFormGroup.valid ) {
        this.isShowErrorMessageInForm = false;
        const creditCard: CreditCardClass = new CreditCardClass(this.creditCardFormGroup.value);
        this.requestCreditCardPayment( creditCard )
          .subscribe( ( transactionResponse: TransactionResponseInterface )  => {

            console.log('Primera transacción de aprobación: ');
            console.log( transactionResponse );

            const delayedTransactionResponse: Observable<TransactionResponseInterface> =
              this.payflowService.requestDelayedPayment(100000, transactionResponse);

            if (delayedTransactionResponse === null || delayedTransactionResponse === undefined) {

            } else {
              delayedTransactionResponse.subscribe( ( delayedPaymentTransactionResponse: TransactionResponseInterface ) => {
                console.log('Delayed Payment');
                console.log(delayedPaymentTransactionResponse);
              }, (error: any) => {
                console.error(error);
              });
            }

        }, ( error: any ) => {
          console.log( error );
          this.isShowErrorMessageInForm = true;
        } );
      } else {
        this.isShowErrorMessageInForm = true;
      }
    } catch ( error ) {
      console.log( 'CreditCardFormComponent.confirm()' );
      console.error ( error );
      this.isShowErrorMessageInForm = true;
    }
  }

  private requestCreditCardPayment( creditCard: CreditCardClass ): Observable<TransactionResponseInterface> {
    try {
      return this.payflowService.requestAuthorizationPayment( creditCard, this.amount );
    } catch ( error ) {
      console.log ( 'CreditCardFormComponent.requestCreditCardPayment()' );
      console.error ( error );
      return Observable.throw( error );
    }
  }

  public resetForm(): void {
    this.creditCardFormGroup.reset();
  }

}
