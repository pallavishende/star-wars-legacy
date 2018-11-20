export class FeedDefinitionIndicators {

    public preProcessInd: string;
    public preProcessFilename: string;
    public preProcessType: string;
    public preProcessDirectory: string;
    public okFileInd: string;
    public feedActiveStatusInd: string;
    public feedActiveDt: any;
    public feedCopyInd: string;

    constructor(

      preProcessInd: string,
      preProcessFilename: string,
      preProcessType: string,
      preProcessDirectory: string,
      okFileInd: string,
      feedActiveStatusInd: string,
      feedActiveDt: any,
      feedCopyInd: string

      ) {

        this.preProcessInd = preProcessInd;
        this.preProcessFilename = preProcessFilename;
        this.preProcessType = preProcessType;
        this.preProcessDirectory = preProcessDirectory;
        this.okFileInd = okFileInd;
        this.feedActiveStatusInd = feedActiveStatusInd;
        this.feedActiveDt = feedActiveDt;
        this.feedCopyInd = feedCopyInd;

    }

    clear() {

      this.preProcessInd = '';
      this.preProcessFilename = '';
      this.preProcessType = '';
      this.preProcessDirectory = '';
      this.okFileInd = '';
      this.feedActiveStatusInd = '';
      this.feedActiveDt = '';
      this.feedCopyInd = '';

    }
}
