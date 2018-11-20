export class RecordCount {
    public preProcessRecord: boolean;
    public location: string;
    public delimiter: string;
    public position: string;
    public lineNumber: number;

    constructor(preProcessRecord = false , location: string, delimiter:string, position:string, lineNumber:number) {
        this.preProcessRecord = preProcessRecord;
        this.location = location;
        this.delimiter = delimiter;
        this.position = position;
        this.lineNumber = lineNumber;
    }

    clear() {
      this.preProcessRecord = false;
      this.location = '';
      this.delimiter = '';
      this.position = '';
      this.lineNumber = 0;
    }
}
