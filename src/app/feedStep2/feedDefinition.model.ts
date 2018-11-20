export class FeedDef {

    public feedDefKey: any;
    public status: string;
	  public sourceId: string;
    public sourceName: string;
    public rootDirectory: string;
    public targetSystem: string;

    public feedId: string;
    public feedName: string;
    public feedDescription: string;
    public feedTypeKey: string;
    public incrementLoadIndicator: string;
    public timeZone: string;
    public exclRecordCount: string;
    public procCalKey: string;
	public offset: string;

    public primeIndicator: boolean;
	public xmlPath1: string;
	public xmlPath2: string;
	public entityType: string;

    public feedTarget : Array<String>;
	public feedNotificationList : Array<String>;

    constructor(
	   feedDefKey: any,
	  status:string,
      sourceId:string,
      sourceName: string,
      rootDirectory: string,
      targetSystem: string,
      feedId: string,
      feedName:string,
      feedDescription:string,
      feedTypeKey: string,
      incrementLoadIndicator: string,
      timeZone: string,
      exclRecordCount: string,
      procCalKey: string,
      offset: string,
	  primeIndicator: boolean,
	  xmlPath1: string,
	  xmlPath2: string,
	  entityType: string,
      feedTarget: Array<String>,
	  feedNotificationList: Array<String>

      ) {
        this.feedDefKey = feedDefKey;
        this.sourceId = sourceId;
        this.sourceName = sourceName;
        this.rootDirectory = rootDirectory;
        this.targetSystem = targetSystem;
        this.feedId = feedId;
        this.feedName = feedName;
        this.feedDescription = feedDescription;
        this.feedTypeKey = feedTypeKey;
        this.incrementLoadIndicator = incrementLoadIndicator;
        this.timeZone = timeZone;
        this.exclRecordCount = exclRecordCount;
        this.procCalKey = procCalKey;
        this.offset = offset;
		this.status = status;
		this.primeIndicator = primeIndicator;
		this.xmlPath1 = xmlPath1;
		this.xmlPath2 = xmlPath2;
		this.entityType = entityType;
        this.feedTarget = feedTarget;
		this.feedNotificationList = feedNotificationList;

    }

    clear() {

      this.sourceId = '';
      this.sourceName = '';
      this.rootDirectory = '';
      this.targetSystem = '';
      this.feedId = '';
      this.feedName = '';
      this.feedDescription = '';
      this.incrementLoadIndicator = '';
      this.feedTypeKey = '';
      this.timeZone = '';
      this.exclRecordCount = '';
      this.procCalKey = '';
      this.offset = '';
      this.feedTarget = [];
	  this.status ='';
    }
}
