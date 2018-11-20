import { Component, Input, OnInit, SimpleChanges, OnChanges }       from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { HeaderMenuService } from '../../../../../core/header-menu/header-menu.service';
import { FeedNotificationDetails } from './feedNotification.model';
import { FeedNotificationService } from './feedNotification.service';
import { urlList } from '../../../../../../assets/constants/url-constants';
import { FeedStatusService } from '../../../../../core/feedStatus.service';
import { FeedStatus } from '../../../../../core/feedStatus.model';


@Component({
  selector: 'notfication-detail',
  templateUrl: './feedNotification.component.html'
})

export class FeedNotification implements OnInit, OnChanges {
  @Input() feedNotiList: Array<any>;
  @Input() targetSystemId: string;


  feedStatus: FeedStatus = undefined;
  feedNotificationObj: FeedNotificationDetails;
  nameChangeLog: string[] = [];
  private editMode: string = 'add';
  private editId = 0;
  private notificationList:Array<any> = [];
  public severtiyList:Array<any> = [];
  public contactList:Array<any> = [];
  public contactListSelect:Array<any> = [];

  private urlConstant = urlList[0];
  public transportMethodList: string = '';
  public disableRoleTarget: boolean = false;
  public targetSystem: string = '';

  constructor(
    private headerMenuService: HeaderMenuService,
    private feedNotificationService: FeedNotificationService, private feedStatusService: FeedStatusService) {

  }

  createForm() {
    const random = Math.floor(Math.random() * (999999 - 100000)) + 100000;
    this.feedNotificationObj = new FeedNotificationDetails(random, null, '','','');
    this.notificationList = this.feedNotiList;
  }

  ngOnChanges(changes: SimpleChanges) {
    for (let propName in changes) {

      if (propName == 'feedNotiList') {
        this.notificationList = this.feedNotiList;

      }

      if (propName == 'targetSystemId') {
        this.targetSystem = this.targetSystemId;
        //console.log('targetSystemId ' + this.targetSystemId);
        this.getContactRoles();

      }

    }
  }

  getIsRole() {

    //this.isAdmin = this.loginService.getIsAdmin();
    this.disableRoleTarget =  this.headerMenuService.getIsAdmin();
    //console.log('disableRoleTarget '+this.disableRoleTarget);
  }

  ngOnInit() {

    //this.disableRoleTarget = true;
    this.getIsRole();
    this.feedStatus = this.feedStatusService.getFeedDef();

    if (this.feedStatus.trgMode == 'view') {
      this.disableRoleTarget = false;
    }

    this.getContactRoles();


    let contactRole = this.urlConstant.feedModule.contactRole;
    let severityUrl = this.urlConstant.feedModule.classification + 'Severity';

    this.feedNotificationService.getExistingSystem(severityUrl).subscribe(
      (transportMethodresult) => {
        this.severtiyList = transportMethodresult.data;
        //console.log(this.transportMethodList);
      });
    this.editMode = 'add';
    this.createForm();

  }

  getContactRoles() {

    if (this.targetSystemId != '') {
      let contactRole = this.urlConstant.feedModule.contactRole + this.targetSystemId;
      this.feedNotificationService.getExistingSystem(contactRole).subscribe(
        (contactResult) => {
          this.contactList = Object.assign([], contactResult.data);
          this.contactListSelect = Object.assign([], contactResult.data);
          this.notificationList.forEach(value => {
            this.contactListSelect.splice(this.contactListSelect.findIndex(obj => obj.contactRoleKey == value.contactRole), 1);
          });
        });
    }
  }


  findTargetObj(obj): any {
    return this.editId === obj.targetId;
  }

  onSubmitSys() {
    const random = Math.floor(Math.random() * (999999 - 100000)) + 100000;

    if ( this.editMode === 'edit') {

      this.contactListSelect.splice(this.contactListSelect.findIndex(obj => obj.contactRoleKey == this.feedNotificationObj.contactRole), 1);
      let editObj = Object.assign(this.notificationList.find(obj => obj.notificationId === this.editId), this.feedNotificationObj);

      //console.log('this.contactListSelect if : ' + JSON.stringify(this.contactListSelect));

      this.feedNotificationObj = new FeedNotificationDetails(random, null, '' , '' , '');
      this.editMode = 'add';

    } else {

      this.contactListSelect.splice(this.contactListSelect.findIndex(obj => obj.contactRoleKey == this.feedNotificationObj.contactRole), 1);
      let addContactName = this.contactList.find(obj => obj.contactRoleKey == this.feedNotificationObj.contactRole);
      if (addContactName) {
        this.feedNotificationObj.contactRoleName = addContactName.contactRole;
      }

      const targetObj = Object.assign({}, this.feedNotificationObj);
      this.notificationList.push(targetObj);

      this.feedNotificationObj = new FeedNotificationDetails(random, null, '', '', '');
    }
  }

  prepareSaveSystem(): any[] {
    return this.notificationList;
  }

  setTargetSystem(targetList: any[]) {
    const random = Math.floor(Math.random() * (999999 - 100000)) + 100000;
    this.editMode = 'edit';
    this.feedNotificationObj = new FeedNotificationDetails(random, null, '', '', '');
  }


  editSystem(id) {
    this.editMode = 'edit';
    this.editId = id;
    const contactBackupList = Object.assign([], this.contactList);
    const notiBackupList = Object.assign([], this.notificationList);
    const notObj = Object.assign({}, notiBackupList.find(obj => obj.notificationId === id));
    const contactObj = Object.assign({}, contactBackupList.find(obj => obj.contactRoleKey == notObj.contactRole));
    this.contactListSelect.push(contactObj);
    this.feedNotificationObj = Object.assign({}, this.notificationList.find(obj => obj.notificationId === id));
    //console.log(this.feedTargetObj);
  }

  deleteSystem(id) {
    const contactBackupList = Object.assign([], this.contactList);
    const notiBackupList = Object.assign([], this.notificationList);
    const notObj = Object.assign({}, notiBackupList.find(obj => obj.notificationId === id));
    const contactObj = Object.assign({}, contactBackupList.find(obj => obj.contactRoleKey == notObj.contactRole));
    this.contactListSelect.push(contactObj);


    if (notObj.notificationMapKey != null) {
      const url = this.urlConstant.feedModule.deleteNotifications + notObj.notificationMapKey;
      this.feedNotificationService.deleteNotification(url, notObj).subscribe(
        (deleteResponse) => {
          this.notificationList.splice(this.notificationList.findIndex(obj => obj.notificationId === id), 1);
        });
    } else {
      this.notificationList.splice(this.notificationList.findIndex(obj => obj.notificationId === id), 1);

    }

  }

  cancel() {
    this.editMode = 'add';
    const random = Math.floor(Math.random() * (999999 - 100000)) + 100000;
    this.feedNotificationObj = new FeedNotificationDetails(random, null, '', '', '');
  }


  revert() { this.ngOnInit(); }
  /*
    logNameChange() {
      const nameControl = this.systemForm.get('sourceName');
      nameControl.valueChanges.forEach(
        (value: string) => this.nameChangeLog.push(value)
      );
    }
  */
}

