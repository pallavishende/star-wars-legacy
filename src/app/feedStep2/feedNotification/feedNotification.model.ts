export class FeedNotificationDetails {
  public notificationId: Number;
  public notificationMapKey: Number;
  public contactRole: string;
  public contactRoleName: string;
  public errorLevel: string;


  constructor(notificationId: Number,
              notificationMapKey: Number,
              contactRole: string,
              contactRoleName: string,
              errorLevel: string) {
    this.notificationId = notificationId;
    this.notificationMapKey = notificationMapKey;
    this.contactRole = contactRole;
    this.contactRoleName = contactRoleName;
    this.errorLevel = errorLevel;
  }


}
