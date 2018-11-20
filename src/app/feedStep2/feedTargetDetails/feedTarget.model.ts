export class FeedTargetDef {
  public targetId: Number;
  public trgtFeedTransfrKey: Number;
  public targetUserId: string;
  public targetDirectory: string;
  public targetServerName: string;
  public targetPort: number;
  public targetTransportType: string;
  public transportMethod: string;
  public transferFeedFormat: string;
  public exceptionDirectory: string;


  constructor(targetId: Number,
              trgtFeedTransfrKey: Number,
              targetUserId: string,
              targetDirectory: string,
              targetServerName: string,
              targetPort: number,
              targetTransportType: string,
              transportMethod: string,
              transferFeedFormat: string,
              exceptionDirectory: string) {

                  this.targetId = targetId;
                  this.trgtFeedTransfrKey = trgtFeedTransfrKey;
                  this.targetUserId = targetUserId;
                  this.targetDirectory = targetDirectory;
                  this.targetServerName = targetServerName;
                  this.targetPort = targetPort;
                  this.targetTransportType = targetTransportType;
                  this.transportMethod = transportMethod;
                  this.transferFeedFormat = transferFeedFormat;
                  this.exceptionDirectory = exceptionDirectory;

  }

  clear() {
    this.targetId = 0;
    this.targetUserId = '';
    this.targetDirectory = '';
    this.targetServerName = '';
    this.targetPort = 0;
    this.targetTransportType = '';
    this.transportMethod = '';

  }
}
