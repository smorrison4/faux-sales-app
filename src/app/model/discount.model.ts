export class Discount {
  constructor(public id: number, public skuNumber: string, public isBogo: boolean, public percentOff: number, public amountOff: number, public isDisplayRequired: boolean, public qualifyingTerms: string, public startDate: string, public endDate: string) { }
}

