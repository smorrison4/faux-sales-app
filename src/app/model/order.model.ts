import {TransactionType} from "../Transaction-type.enum";

export class Order {
  constructor(public id: number, public creditedRep: string, public enteredBy: string, public entryDateAndTime: string) { }
  //constructor(public id: number, public creditedRep: string, public transactionType: TransactionType, public enteredBy: string, public entryDateAndTime: string) { }
}

