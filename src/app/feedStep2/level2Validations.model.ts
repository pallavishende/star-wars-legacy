export class Level2Validations {
    public validationsRequired: boolean;
    public duplicateRecordChk: string;
    public errorThreshold: string;
    public severity: string;

    constructor(
      validationsRequired = false ,
      duplicateRecordChk: string,
      errorThreshold: string,
      severity:string) {
        this.validationsRequired = validationsRequired;
        this.duplicateRecordChk = duplicateRecordChk;
        this.errorThreshold = errorThreshold;
        this.severity = severity;
    }

    clear() {
        this.validationsRequired = false;
        this.duplicateRecordChk = '';
        this.errorThreshold = '';
        this.severity = '';
    }
}
