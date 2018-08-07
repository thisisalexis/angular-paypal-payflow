import {isNullOrUndefined} from 'util';

export class UtilClass {

  public static createArrayOfExpirationYears( maxYearsExpirationDate: number ): number[] {
    try {
      const arrayOfExpirationYears: number[] = [];
      const currentYear: number = new Date().getFullYear();
      for ( let counter = currentYear; counter <= currentYear + maxYearsExpirationDate; counter++  ) {
        arrayOfExpirationYears.push( counter );
      }
      return arrayOfExpirationYears;
    } catch ( error ) {
      console.log( 'UtilClass.createArrayOfExpirationYears()' );
      console.error( error );
      return [];
    }
  }

  public static createArrayOfExpirationMonths(): number[] {
    return Array.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 );
  }

  public static formatCreditCardNumber( unformattedCreditCard: string ): string {
    try {
      return unformattedCreditCard.replace( new RegExp( '[- ]', 'g' ), '' );
    } catch ( error ) {
      console.log( 'UtilClass.formatCreditCardNumber()' );
      console.error ( error );
      return null;
    }
  }

  public static getDate( fullYear: number, month: number, day: number ): Date {
    try {
      if ( isNullOrUndefined( fullYear ) || isNullOrUndefined( month ) || isNullOrUndefined( day )
        || ( month < 1 || month > 12 ) || ( day < 1 || day > 31 ) ) { return null; }
      return new Date( fullYear, month - 1, day );
    } catch ( error ) {
      console.log( 'UtilClass.getDate()' );
      console.error( error );
      return null;
    }
  }

  public static splitStringSeparatedByAmpersandSignIntoArray( stringToSplitIntoAnArray: string ): string[] {
    try {
      const NAME_VALUE_PAIR_SEPARATOR = '&';
      return UtilClass.splitStringIntoArray( stringToSplitIntoAnArray, NAME_VALUE_PAIR_SEPARATOR );
    } catch ( error ) {
      console.log( 'UtilClass.splitStringSeparatedByAmpersandIntoArray()' );
      console.error( error );
      return [];
    }
  }

  public static splitStringSeparatedByEqualsSignIntoArray( stringToSplitIntoAnArray: string ): string[] {
    try {
      const NAME_VALUE_PAIR_SEPARATOR = '=';
      return UtilClass.splitStringIntoArray( stringToSplitIntoAnArray, NAME_VALUE_PAIR_SEPARATOR );
    } catch ( error ) {
      console.log( 'UtilClass.splitStringSeparatedByEqualsSignIntoArray()' );
      console.error( error );
      return [];
    }
  }

  private static splitStringIntoArray( stringToSplitIntoAnArray: string, separator: string ): string[] {
    try {
      if ( !isNullOrUndefined( stringToSplitIntoAnArray ) ) {
        return stringToSplitIntoAnArray.split( separator );
      }
    } catch ( error ) {
      console.log( 'UtilClass.splitStringIntoArray()' );
      console.error( error );
    }
    return [];
  }

  public static getElementInAnArrayFromAGivenPosition<T>( arrayOfElements: T[], positionToSearchInArray: number ): T {
    try {
      if ( arrayOfElements.length > positionToSearchInArray ) {
        return arrayOfElements[ positionToSearchInArray ];
      }
    } catch ( error ) {
      console.log( 'UtilClass.getElementInAnArrayFromAGivenPosition()' );
      console.error( error );
    }
    return null;
  }

  public static getValueFromMap( mapOfNameValuePairDecodedResponse: Map<string, string>, keyName: string ): string {
    try {
      if ( mapOfNameValuePairDecodedResponse.has( keyName ) ) {
        return mapOfNameValuePairDecodedResponse.get( keyName );
      }
    } catch ( error ) {
      console.log( 'UtilClass.getValueFromMap()' );
      console.error ( error );
    }
    return null;
  }

}
