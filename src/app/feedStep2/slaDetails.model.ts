export class SlaDetail {
    public startTime: string;
    public endTime: string;
    public timeZone: string;
    public waitDays: number;
    public waitMinutes: number;

    constructor(startTime: string , endTime: string, timeZone:string, waitDays:number, waitMinutes:number) {
        this.startTime = startTime;
        this.endTime = endTime;
        this.timeZone = timeZone;
        this.waitDays = waitDays;
        this.waitMinutes = waitMinutes;
    }

    clear() {
      this.startTime = '';
      this.endTime = '';
      this.timeZone = '';
      this.waitDays = 0;
      this.waitMinutes = 0;
    }
}
