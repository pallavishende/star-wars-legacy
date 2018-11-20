export class Level1Validations {
    public validationsRequired: boolean;
    public duplicateRecordChk: string;
    public recordCountHigh: number;
    public recordCountLow: number;
    public recordCountSeverity: string;
    public weekendHolidayHigh: number;
    public weekendHolidayLow: number;
    public weekendHolidaySeverity: string;

    constructor(
      validationsRequired = false ,
      duplicateRecordChk: string,
      recordCountHigh:number,
      recordCountLow:number,
      recordCountSeverity:string,
      weekendHolidayHigh:number,
      weekendHolidayLow:number,
      weekendHolidaySeverity:string) {
        this.validationsRequired = validationsRequired;
        this.duplicateRecordChk = duplicateRecordChk;
        this.recordCountHigh = recordCountHigh;
        this.recordCountLow = recordCountLow;
        this.recordCountSeverity = recordCountSeverity;
        this.weekendHolidayHigh = weekendHolidayHigh;
        this.weekendHolidayLow = weekendHolidayLow;
        this.weekendHolidaySeverity = weekendHolidaySeverity;

    }

    clear() {
        this.validationsRequired = false;
        this.duplicateRecordChk = '';
        this.recordCountHigh = 0;
        this.recordCountLow = 0;
        this.recordCountSeverity = '';
        this.weekendHolidayHigh = 0;
        this.weekendHolidayLow = 0;
        this.weekendHolidaySeverity = '';
    }
}
