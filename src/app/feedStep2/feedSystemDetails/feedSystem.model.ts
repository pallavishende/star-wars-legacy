export class FeedSystemDef {
    public sourceId: string;
    public sourceName: string;
    public sourceDirectory: string;
    public sourceServerName: string;
    public sourcePort: number;
    public sourceTransportType: string;
    public sourceTransportMethod: string;

    public targetId: string;
    public targetName: string;
    public targetDirectory: string;
    public targetServerName: string;
    public targetPort: number;
    public targetTransportType: string;
    public targetTransportMethod: string;
    public status: boolean;

/*
    static clone(feed: FeedSystemDef): FeedSystemDef {
        return new Feed(feed.name, feed.type, feed.description, feed.reference, feed.status);
    }
*/

    constructor(
      sourceId:string,
      sourceName: string,
      sourceDirectory: string,
      sourceServerName: string,
      sourcePort: number,
      sourceTransportType:string,
      sourceTransportMethod:string,
      targetId: string,
      targetName:string,
      targetDirectory:string,
      targetServerName:string,
      targetPort:number,
      targetTransportType:string,
      targetTransportMethod:string,
      status= false) {
        this.sourceId = sourceId;
        this.sourceName = sourceName;
        this.sourceDirectory = sourceDirectory;
        this.sourceServerName = sourceServerName;
        this.sourcePort = sourcePort;
        this.sourceTransportType = sourceTransportType;
        this.sourceTransportMethod = sourceTransportMethod;

        this.targetId = targetId;
        this.targetName = targetName;
        this.targetDirectory = targetDirectory;
        this.targetServerName = targetServerName;
        this.targetPort = targetPort;
        this.targetTransportType = targetTransportType;
        this.targetTransportMethod = targetTransportMethod;
        this.status = status;
    }

    clear() {
      this.sourceId = '';
      this.sourceName = '';
      this.sourceDirectory = '';
      this.sourceServerName = '';
      this.sourcePort = 0;
      this.sourceTransportType = '';
      this.sourceTransportMethod = '';

      this.targetId = '';
      this.targetName = '';
      this.targetDirectory = '';
      this.targetServerName = '';
      this.targetPort = 0;
      this.targetTransportType = '';
      this.targetTransportMethod = '';

      this.status = false;
    }
}
