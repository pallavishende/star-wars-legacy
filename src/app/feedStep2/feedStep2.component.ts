import {
  Component,
  OnInit,
  ViewChild,
  Input,
  Output,
  ViewEncapsulation,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  ElementRef
} from '@angular/core';

import {NgForm} from '@angular/forms';

import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import 'rxjs/add/operator/finally';
import {DatePipe} from '@angular/common';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import {ToastrService} from 'ngx-toastr';

import {HeaderMenuService} from '../../../../core/header-menu/header-menu.service';
import {NotificationService} from '../../../../core/notification/notification.service';

import {FeedTargetDetails} from '../feedStep2/feedTargetDetails/feedTargetDetails.component';
import {FeedTargetDef} from '../feedStep2/feedTargetDetails/feedTarget.model';
import {FeedTargetService} from '../feedStep2/feedTargetDetails/feedTarget.service';

import {FeedNotification} from '../feedStep2/feedNotification/feedNotification.component';
import {FeedNotificationDetails} from '../feedStep2/feedNotification/feedNotification.model';

import {FeedStatusService} from '../../../../core/feedStatus.service';
import {FeedStatus} from '../../../../core/feedStatus.model';

import {FeedStep2Service} from './feedStep2.service';
import {HeaderFooter} from './headerFooter.model';
import {FeedDef} from './feedDefinition.model';
import {FeedDefinitionIndicators} from './feedIndicators.model';

import {FeedStep1Service} from '../feedStep1/feedStep1.service';
import { DqfmodalComponent } from '../../../../shared/dqfmodal/dqfmodal.component';

import {urlList} from '../../../../../assets/constants/url-constants';

declare let $: any;

@Component({
  moduleId: module.id,
  selector: 'feed-step2',
  templateUrl: 'feedStep2.component.html',
  providers: [DatePipe],
  encapsulation: ViewEncapsulation.None
})

export class FeedStep2Component implements OnInit, OnChanges {

  @ViewChild('modal') modal: ElementRef;
  @ViewChild(FeedTargetDetails)
  private feedTargetDetails: FeedTargetDetails;
  @ViewChild('targetFeedForm')
  private targetFeedForm: NgForm;
  @ViewChild(FeedNotification)
  private feedNotification: FeedNotification;

  @ViewChild(DqfmodalComponent) modalComponent: DqfmodalComponent;

  @Input() systemListDef: Array<any>;
  @Input() sourceFeedTypeListDef: Array<any>;
  @Input() sourceFeedListDef: Array<any>;
  @Input() newSourceFeedId: string;


  @Output() onPreviousStep = new EventEmitter<string>();
  @Output() onNextStep = new EventEmitter<string>();
  @Output() onStep2Submitted = new EventEmitter<string>();
  @Output() onStep2CalendarChange = new EventEmitter<boolean>();

//@ViewChild(FeedDetailComponent)

//private feedDetailComponent: FeedDetailComponent;

  isLoading: false;
  title: string;
  hidden: Boolean;
  modalSettings: Object = {
    modalSize: 'xlg'
  };
  mytime: Date = new Date();
  allowMouseWheel = true;

  public srcFeedId: string = '';
  public feedMode: string = '';
  feedStatus: FeedStatus = undefined;
  public feedActiveStatusInd: boolean = false;
  public incrementLoadIndicator: boolean = false;
  public preProcessInd: boolean = false;
  public feedTargetDef: FeedTargetDef;
  public feedDefinition: FeedDef;
  public feedDefIndicator: FeedDefinitionIndicators;
  public feedHeaderFooter: HeaderFooter;
  public feedTargetObj: FeedTargetDef;
  public saveFeed: {};
  public fakeArray = new Array(10);
  public sourceSysObj = {
    sourceSysId: '',
    sourceSysName: ''
  };

  public targetSysObj = {
    targetSysId: '',
    targetSysName: ''
  };

  public sourceFeedObj = {
    sourceSysId: '',
    sourceSysName: ''
  };
  public targetMode = '';

  private disableRoleStep2: Boolean = false;
  public targetFeedList = [];
  public feedNotiList = [];

  public targetComponentMode: boolean = false;
  public calledFromUpdateMode: boolean = false;
  public nextStepNewFeed: boolean = true;
  public saveFeedButton: boolean = false;
  public targetFeedTypeDefault: string = '';

  public systemList = [];
  public sourceFeedTypeList = [];
  public sourceFeedList = [];
  public sourceFeedCalendarList = [];
  public offsetSplit: Array<any> = [];
  public offsetTime = '';
  public offsetHours = '';
  public offsetMins = '';
  public offsetHoursArray: Array<any> = [];
  public offsetMinsArray: Array<any> = [];
  public timeZoneResultArray: Array<any> = [];

  public newSrcFeedId: string = '';

  private urlConstant = urlList[0];

  private value: any = {};
  private _disabledV: string = '0';
  private disabled: boolean = false;
  private items: Array<any> = [];
  private sysitems: Array<any> = [];
  private textQualifierList: Array<any> = [];

  public dateEnabledStep2: boolean = true;
  public minDate = new Date();
  public maxDate = new Date(2040, 0, 1);
  public events: string[] = [];
  public modalTitle: string = '';
  public modalContent: string = '';
  public responseObjId: string = '';
  public primeIndicatorValue: boolean = false;

  xmlFlag: boolean = false;
  srcType: any;
  sourceFeedListForTarget = [];


  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.events.push(`${type}: ${event.value}`);
  }

  constructor(private headerMenuService: HeaderMenuService,
              private feedStep1Service: FeedStep1Service,
              private feedStep2Service: FeedStep2Service,
              private feedTargetService: FeedTargetService,
              private feedStatusService: FeedStatusService,
              private notificationService: NotificationService,
              private datepipe: DatePipe,
              private toastr: ToastrService) {
  }

  sourceFeedEquals(fed1, fed2) {
    if (fed1 && fed2) {
      return fed1 === fed2
    }
  }

  getSourceObj() {

  }

  ngOnChanges(changes: SimpleChanges) {
    for (let propName in changes) {
      let change = changes[propName];

      if (propName == 'systemListDef') {
        this.systemList = this.systemListDef;
      }

      if (propName == 'sourceFeedTypeListDef') {
        this.sourceFeedTypeList = this.sourceFeedTypeListDef;
        this.sourceFeedTypeList = this.sourceFeedTypeList.filter(item => item.feedTypeKey !== 3);
      }

      if (propName == 'sourceFeedListDef') {
        this.sourceFeedList = this.sourceFeedListDef;
        if (this.feedDefinition && this.newSourceFeedId) {

          let editObj = this.sourceFeedList.find(obj => obj.srcFeedDefKey == this.newSourceFeedId);
          //console.log('this.editObj ' + JSON.stringify(editObj));
          if (editObj) {
            this.feedDefinition.sourceName = editObj.srcFeedName;
            this.feedDefinition.sourceId = editObj.srcFeedDefKey;
            if(editObj.srcFeedTypeKey == 3){
              this.xmlFlag = true;
             // this.feedDefinition.primeIndicator = true;
              this.feedDefinition.feedTypeKey = '1';
              this.feedDefinition.exclRecordCount = '0';
              this.feedHeaderFooter.headerNumber = 0;
              this.feedHeaderFooter.headerDelimiter = '|';
              this.feedHeaderFooter.footerNumber = 0;
              this.feedHeaderFooter.footerDelimiter = '|';
              this.feedHeaderFooter.dataDelimiter = '|';
              this.feedHeaderFooter.textQualifier = 'No Quote';
            } else {
              this.xmlFlag = false;
            //  this.feedDefinition.primeIndicator = false;
            }
            //console.log('this.feedDefinition.sourceName 2 ' + JSON.stringify(this.feedDefinition.sourceName));
          }

        }
      }

      if (propName == 'newSourceFeedId') {
        this.srcFeedId = this.newSourceFeedId;
       /* if (this.sourceFeedListDef.length > 0 && this.newSourceFeedId) {
          this.srcType = this.sourceFeedListDef.find(x => x.srcFeedDefKey == this.newSourceFeedId).srcFeedTypeKey;
          console.log(this.srcType);
          if (this.srcType == 3) {
            this.xmlFlag = true;
            this.feedDefinition.primeIndicator = true;
            this.feedDefinition.feedTypeKey = '1';
          } else {
            this.xmlFlag = false;
            this.feedDefinition.primeIndicator = false;
          }
        }*/
        //console.log('this.newSourceFeedId 2 ' + JSON.stringify(this.newSourceFeedId));

      }
    }
   // this.getSourceFeedDetails();
  }

  ngOnInit() {

    this.getIsRole();
    this.feedStatus = this.feedStatusService.getFeedDef();
    if (this.feedStatus.trgMode == 'view') {
      this.disableRoleStep2 = false;
    }

    //console.log('this.feedStatus 2 ' + JSON.stringify(this.feedStatus));

    let url = this.urlConstant.systemModule.systemList;

    let classificationMins = this.urlConstant.feedModule.classification + 'Minutes';
    let classificationHours = this.urlConstant.feedModule.classification + 'Hours';
    let classificationTimeZone = this.urlConstant.feedModule.classification + 'TimeZone';

    this.feedStep2Service.getExistingSystem(classificationHours).subscribe(
      (hoursResult) => {
        this.offsetHoursArray = hoursResult.data;
        //console.log(this.offsetHoursArray);
      });

    this.feedStep2Service.getExistingSystem(classificationMins).subscribe(
      (minsResult) => {
        this.offsetMinsArray = minsResult.data;
        //console.log(this.offsetMinsArray);
      });

    this.feedStep2Service.getExistingSystem(classificationTimeZone).subscribe(
      (timeZoneResult) => {
        this.timeZoneResultArray = timeZoneResult.data;
        //console.log(this.offsetMinsArray);
      });

    let TextQualifierUrl = this.urlConstant.feedModule.classification + 'TextQualifier';

    this.feedStep2Service.getExistingSystem(TextQualifierUrl).subscribe(
      (results) => {

        this.textQualifierList = results.data;
        //console.log('An runttype:  ', JSON.stringify(this.textQualifierList));
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.
          console.log('An error occurred:', err.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          console.log(`Backend returned code ${err.status}, body was: ${err.error}`);


        }
      }
    )


    //this.getData();
    this.getSourceFeedDetails();
    this.getFeedAll();


  }

  getIsRole() {
    //this.isAdmin = this.loginService.getIsAdmin();
    this.disableRoleStep2 = this.headerMenuService.getIsAdmin();
    //console.log('disableRoleStep2 '+this.disableRoleStep2);
  }

  getSourceFeedDetails() {
    let typeUrl = this.urlConstant.feedModule.newSourceFeed;

    this.feedStep1Service.getSourceFeedTypes(typeUrl).subscribe(
      (sourceResults) => {
        // Read the result field from the JSON response.
        //console.log(sourceResults);
        this.sourceFeedListForTarget = sourceResults.data;
      if (this.feedStatus.trgMode == 'New' && this.feedStatus.feedId == undefined) {

          let srcFeedId = '';
          let srcFeedName = '';
          if (this.feedStatus.srcMode == 'ReUse') {
            srcFeedId = this.feedStatus.sourceFeedId ? this.feedStatus.sourceFeedId : '';
            srcFeedName = this.feedStatus.sourceFeedName ? this.feedStatus.sourceFeedName : '';

          }

          this.offsetHours = '00';
          this.offsetMins = '00';

          this.feedDefinition = new FeedDef('', '', srcFeedId, srcFeedName, '', this.feedStatus.targetSysId, '', '', '', '', '', '', '', '', '', this.primeIndicatorValue, '', '', '', [], []);
          this.primeIndicatorValue = false;
          this.feedDefIndicator = new FeedDefinitionIndicators('', '', '', '', '', '', '', '');
          this.feedHeaderFooter = new HeaderFooter(0, '', 0, '', '', '', false);
          this.feedTargetDef = this.feedTargetService.getFeedTargetDef();
          this.feedDefinition.offset = '00:00';
          this.sourceSysObj = {
            sourceSysId: this.feedStatus.sourceSysId,
            sourceSysName: this.feedStatus.sourceSysName
          };

          this.targetSysObj = {
            targetSysId: this.feedStatus.targetSysId,
            targetSysName: this.feedStatus.targetSysName
          };
        if (this.feedStatus.srcMode == 'ReUse') {
          if (this.sourceFeedListForTarget.length > 0) {
            //this.srcType = this.sourceFeedListForTarget.find(obj => obj.srcFeedDefKey == srcFeedId).srcFeedTypeKey;
            this.srcType = this.sourceFeedListForTarget.find(obj => obj.srcFeedDefKey == this.feedStatus.sourceFeedId).srcFeedTypeKey;
            console.log(this.srcType);
            if (this.srcType == 3) {
              this.xmlFlag = true;
              //this.feedDefinition.primeIndicator = true;
              this.feedDefinition.feedTypeKey = '1';
              this.feedDefinition.exclRecordCount = '0';
              this.feedHeaderFooter.headerNumber = 0;
              this.feedHeaderFooter.headerDelimiter = '|';
              this.feedHeaderFooter.footerNumber = 0;
              this.feedHeaderFooter.footerDelimiter = '|';
              this.feedHeaderFooter.dataDelimiter = '|';
              this.feedHeaderFooter.textQualifier = 'No Quote';
            } else {
              this.xmlFlag = false;
            //  this.feedDefinition.primeIndicator = false;
            }
          }
        }
          this.onChangeSystemName({}, this.feedStatus.targetSysId);
        }
      })

  }

  getFeedAll() {

    if ((this.feedStatus.trgMode == 'edit' || this.feedStatus.trgMode == 'Clone' || this.feedStatus.trgMode == 'view') && this.feedStatus.feedId) {
      let feedRetrivalurl = this.urlConstant.feedModule.retriveStep2 + this.feedStatus.feedId;

      this.feedStep2Service.getFeedDef(feedRetrivalurl).subscribe(
        (retrieveResults) => {
          // Read the result field from the JSON response.
          //console.log(retrieveResults);
          //this.sourceFeedList = retrieveResults;
          if (retrieveResults.data) {

            this.targetComponentMode = true;
            let feed = retrieveResults.data;
            let targetFeedList = [];
            let notificationList = [];

            this.targetFeedList = [];

            feed.feedTarget.forEach(value => {

              const random = Math.floor(Math.random() * (999999 - 100000)) + 100000;
              let feedDef = new FeedTargetDef(
                random,
                value.trgtFeedTransfrKey,
                value.targetUserId,
                value.targetDirectory,
                value.targetServerName,
                value.targetPort,
                value.transportType,
                value.transportMethod,
                value.transferFeedFormat,
                value.exceptionDirectory
              );
              const targetObj = Object.assign({}, feedDef);

              targetFeedList.push(targetObj);
            });

            this.targetFeedList = targetFeedList;
            console.log('step2 target feed' + JSON.stringify(targetFeedList));

            if (feed.feedNotificationList) {

              feed.feedNotificationList.forEach(value => {
                const random = Math.floor(Math.random() * (999999 - 100000)) + 100000;
                let feedDef = new FeedNotificationDetails(
                  random,
                  value.notificationMapKey,
                  value.contactRole,
                  value.contactRoleName,
                  value.errorLevel
                );
                const notificationObj = Object.assign({}, feedDef);

                notificationList.push(notificationObj);
              });

              this.feedNotiList = notificationList;
            }

            //console.log('this.feedNotiList' + JSON.stringify(this.feedNotiList));

            //console.log(this.targetFeedList);
            //this.feedTargetDetails.setTargetSystem(this.targetFeedList);
            if (feed.incrementLoadIndicator == 'Y') {
              this.incrementLoadIndicator = true;
            } else {
              this.incrementLoadIndicator = false;
            }


            if (feed.offset) {

              this.offsetSplit = feed.offset.split(":");
              //console.log(this.offsetSplit);

              this.offsetHours = (this.offsetSplit[0] ? this.offsetSplit[0] : 0);
              this.offsetMins = (this.offsetSplit[1] ? this.offsetSplit[1] : 0);
              /*
                                let d = new Date();
                                d.setHours((this.offsetSplit[0] ? this.offsetSplit[0] : 0));
                                d.setMinutes(this.offsetSplit[1] ? this.offsetSplit[1] : 0);
                                this.mytime = d;
                            */

            }
            this.feedDefinition = new FeedDef(
              feed.feedDefKey,
              feed.status,
              feed.sourceId,
              feed.sourceName,
              feed.rootDirectory,
              feed.targetSystem,
              feed.feedId,
              feed.feedName,
              feed.feedDescription,
              feed.feedTypeKey,
              feed.incrementLoadIndicator,
              feed.timeZone,
              feed.exclRecordCount,
              feed.procCalKey,
              feed.offset,
              (feed.primeIndicator ? feed.primeIndicator : false),
              feed.xmlPath1,
              feed.xmlPath2,
              feed.entityType,
              targetFeedList,
              notificationList
            );

            let feedActiveDt = new Date();

            this.feedHeaderFooter = new HeaderFooter(
              feed.headerNumber,
              feed.headerDelimiter,
              feed.footerNumber,
              feed.footerDelimiter,
              feed.textQualifier,
              feed.dataDelimiter,
              false
            );

            if (this.feedStatus.trgMode == 'Clone') {
              this.feedDefinition.feedDefKey = '';
              this.feedDefinition.feedId = '';
              this.feedDefinition.feedName = '';
              this.feedDefinition.feedDescription = '';
              this.feedDefinition.procCalKey = '';
              this.feedDefinition.sourceId = this.feedStatus.sourceFeedId;
              this.feedDefinition.sourceName = this.feedStatus.sourceFeedName;

              feed.targetSystem = this.feedStatus.targetSysId;

              this.sourceSysObj = {
                sourceSysId: this.feedStatus.sourceSysId,
                sourceSysName: this.feedStatus.sourceSysName
              };

              this.targetSysObj = {
                targetSysId: this.feedStatus.targetSysId,
                targetSysName: this.feedStatus.targetSysName
              };
              this.feedDefinition.targetSystem = this.targetSysObj.targetSysId;


              this.minDate = new Date();

              if (this.sourceFeedList.length > 0) {
                //this.srcType = this.sourceFeedListDef.find(obj => obj.srcFeedDefKey == this.feedStatus.sourceFeedId).srcFeedTypeKey;
                this.srcType = this.sourceFeedList.find(obj => obj.srcFeedDefKey == this.feedStatus.sourceFeedId).srcFeedTypeKey;
                console.log(this.srcType);
                if (this.srcType == 3) {
                  this.xmlFlag = true;
                 // this.feedDefinition.primeIndicator = true;
                  this.feedDefinition.feedTypeKey = '1';
                  this.feedDefinition.exclRecordCount = '0';
                  this.feedHeaderFooter.headerNumber = 0;
                  this.feedHeaderFooter.headerDelimiter = '|';
                  this.feedHeaderFooter.footerNumber = 0;
                  this.feedHeaderFooter.footerDelimiter = '|';
                  this.feedHeaderFooter.dataDelimiter = '|';
                  this.feedHeaderFooter.textQualifier = 'No Quote';
                } else {
                  this.xmlFlag = false;
                 // this.feedDefinition.primeIndicator = false;
                }
              }
              /*
              if (feed.feedActiveDt > todaysDate) {
                //console.log('activa greater'+ feedActiveDt);
                feedActiveDt = new Date();

              } else {
                feedActiveDt = new Date(feed.feedActiveDt);
                //console.log('today greater'+ todaysDate);

              }
              */
            } else if (this.feedStatus.trgMode == 'edit' || this.feedStatus.trgMode == 'view') {
              this.nextStepNewFeed = false;
              this.saveFeedButton = false;

              let editObj = this.systemList.find(obj => obj.systemKey == feed.targetSystem);
              //console.log('this.ssys obj in target feed  ' + JSON.stringify(editObj));
              if (editObj) {
                this.targetSysObj = {
                  targetSysId: editObj.systemKey,
                  targetSysName: editObj.systemName
                };

              }

              this.feedStatus.targetSysId = this.targetSysObj.targetSysId;
              this.feedStatus.targetSysName = this.targetSysObj.targetSysName;

              let editObjFeed = this.sourceFeedList.find(obj => obj.srcFeedDefKey == feed.sourceId);
              //console.log('this.editObjFeed ' + JSON.stringify(editObjFeed));
              if (editObjFeed) {
                this.feedDefinition.sourceName = editObjFeed.srcFeedName;
                this.feedDefinition.sourceId = editObjFeed.srcFeedDefKey;
                //console.log('this.feedDefinition.sourceName 2 ' + JSON.stringify(this.feedDefinition.sourceName));

              }
              if (this.sourceFeedList.length > 0) {
                //this.srcType = this.sourceFeedListForTarget.find(obj => obj.srcFeedDefKey == this.feedStatus.sourceFeedId).srcFeedTypeKey;
                this.srcType = this.sourceFeedList.find(obj => obj.srcFeedDefKey == feed.sourceId).srcFeedTypeKey;
                console.log(this.srcType);
                if (this.srcType == 3) {
                  this.xmlFlag = true;
                //  this.feedDefinition.primeIndicator = true;
                  this.feedDefinition.feedTypeKey = '1';
                  this.feedDefinition.exclRecordCount = '0';
                  this.feedHeaderFooter.headerNumber = 0;
                  this.feedHeaderFooter.headerDelimiter = '|';
                  this.feedHeaderFooter.footerNumber = 0;
                  this.feedHeaderFooter.footerDelimiter = '|';
                  this.feedHeaderFooter.dataDelimiter = '|';
                  this.feedHeaderFooter.textQualifier = 'No Quote';
                } else {
                  this.xmlFlag = false;
                //  this.feedDefinition.primeIndicator = false;
                }
              }

              feedActiveDt = new Date(feed.feedActiveDt);
              let todaysDate = new Date();

              if (feedActiveDt > todaysDate) {
                //console.log('activa greater'+ feedActiveDt);
                this.minDate = todaysDate;
              } else {
                //console.log('today greater'+ todaysDate);
                this.minDate = feedActiveDt;
              }


            }
            //console.log('feedDefinition obj in target feed  ' + JSON.stringify(this.feedDefinition));


            if (feed.procCalKey) {

              if (this.feedStatus.trgMode == 'edit' || this.feedStatus.trgMode == 'view') {
                this.calledFromUpdateMode = true;
                this.feedDefinition.procCalKey = feed.procCalKey;
              } else if (this.feedStatus.trgMode == 'Clone') {
                this.feedDefinition.procCalKey = '';
              }

              this.onChangeSystemName({}, feed.targetSystem);
              this.calledFromUpdateMode = false;
            }

            /*this.feedHeaderFooter = new HeaderFooter(
              feed.headerNumber,
              feed.headerDelimiter,
              feed.footerNumber,
              feed.footerDelimiter,
              feed.textQualifier,
              feed.dataDelimiter,
              false
            );*/

            let preProcessFilename = '';
            let preProcessType = '';
            let preProcessDirectory = '';
            let feedActiveStsInd = '';

            this.dateEnabledStep2 = false;

            if (feed.preProcessInd == 'Y') {
              this.preProcessInd = true;
              preProcessFilename = feed.preProcessFilename;
              preProcessType = feed.preProcessType;
              preProcessDirectory = feed.preProcessDirectory;
            } else {
              this.preProcessInd = false;
            }

            this.feedDefIndicator = new FeedDefinitionIndicators(
              feed.preProcessInd,
              preProcessFilename,
              preProcessType,
              preProcessDirectory,
              'false',
              feed.feedActiveStatusInd,
              feedActiveDt,
              'N'
            );

          } else {
            this.sourceSysObj = {
              sourceSysId: this.feedStatus.sourceSysId,
              sourceSysName: this.feedStatus.sourceSysName
            };

            this.targetSysObj = {
              targetSysId: this.feedStatus.targetSysId,
              targetSysName: this.feedStatus.targetSysName
            };
            console.log('An error occurred: should never come here');
            let srcFeedId = this.feedStatus.sourceFeedId ? this.feedStatus.sourceFeedId : '';
            let srcFeedName = this.feedStatus.sourceFeedName ? this.feedStatus.sourceFeedName : '';
            this.offsetHours = '00';
            this.offsetMins = '00';
            this.feedDefinition = new FeedDef('', '', srcFeedId, srcFeedName, '', this.feedStatus.targetSysId,
              '', '', '', '', '', '', '', '', '', this.primeIndicatorValue, '', '', '', [], []);
            this.primeIndicatorValue = false;
            this.feedDefinition.offset = '00:00';
            this.feedDefIndicator = new FeedDefinitionIndicators('', '', '', '', '', '', '', '');
            this.feedHeaderFooter = new HeaderFooter(0, '', 0, '', '', '', false);
            this.feedTargetDef = this.feedTargetService.getFeedTargetDef();
            this.onChangeSystemName({}, this.feedStatus.targetSysId);
          }

        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            // A client-side or network error occurred. Handle it accordingly.
            console.log('An error occurred:', err.error.message);
          } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
          }
        });

    } /*else if (this.feedStatus.trgMode == 'New' && this.feedStatus.feedId == undefined) {

      let srcFeedId = '';
      let srcFeedName = '';
      if (this.feedStatus.srcMode == 'ReUse') {
        srcFeedId = this.feedStatus.sourceFeedId ? this.feedStatus.sourceFeedId : '';
        srcFeedName = this.feedStatus.sourceFeedName ? this.feedStatus.sourceFeedName : '';
        if(this.sourceFeedListForTarget.length > 0) {
          //this.srcType = this.sourceFeedListForTarget.find(obj => obj.srcFeedDefKey == srcFeedId).srcFeedTypeKey;
          this.srcType = this.sourceFeedListForTarget.find(obj => obj.srcFeedDefKey == this.feedStatus.sourceFeedId).srcFeedTypeKey;
          console.log(this.srcType);
          if (this.srcType == 3) {
            this.xmlFlag = true;
            this.feedDefinition.primeIndicator = true;
            this.feedDefinition.feedTypeKey = '1';
            this.feedDefinition.exclRecordCount = '0';
            this.feedHeaderFooter.headerNumber = 0;
            this.feedHeaderFooter.headerDelimiter = '|';
            this.feedHeaderFooter.footerNumber = 0;
            this.feedHeaderFooter.footerDelimiter = '|';
            this.feedHeaderFooter.dataDelimiter = '|';
            this.feedHeaderFooter.textQualifier = 'No Quote';
          } else {
            this.xmlFlag = false;
            this.feedDefinition.primeIndicator = false;
          }
        }
      }

      this.offsetHours = '00';
      this.offsetMins = '00';

      this.feedDefinition = new FeedDef('', '', srcFeedId, srcFeedName, '', this.feedStatus.targetSysId, 0, '', '', '', '', '', '', '', '', this.primeIndicatorValue, '', '', '', [], []);
      this.primeIndicatorValue = false;
      this.feedDefIndicator = new FeedDefinitionIndicators('', '', '', '', '', '', '', '');
      this.feedHeaderFooter = new HeaderFooter(0, '', 0, '', '', '', false);
      this.feedTargetDef = this.feedTargetService.getFeedTargetDef();
      this.feedDefinition.offset = '00:00';
      this.sourceSysObj = {
        sourceSysId: this.feedStatus.sourceSysId,
        sourceSysName: this.feedStatus.sourceSysName
      };

      this.targetSysObj = {
        targetSysId: this.feedStatus.targetSysId,
        targetSysName: this.feedStatus.targetSysName
      };
      this.onChangeSystemName({}, this.feedStatus.targetSysId);
    }*/
  }

  onChangeSystemName(event, value) {
    //console.log('  inside onChangeSystemName  the component step1 1 :  '+ value);
    this.feedDefinition.targetSystem = value;

    if (!this.calledFromUpdateMode && this.targetFeedForm.controls.calendarTime) {
      //console.log('proc cal  calledFromUpdateMode :  '+ value);
      this.feedDefinition.procCalKey = '';
      this.targetFeedForm.controls.calendarTime.markAsPristine();
    }

    let url = this.urlConstant.feedModule.calendarList + '/' + value;
    this.feedStep2Service.getCalendar(url).subscribe(
      (calendarResults) => {
        // Read the result field from the JSON response.
        //console.log(calendarResults);
        this.sourceFeedCalendarList = calendarResults.data;
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.
          console.log('An error occurred:', err.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
        }
      });

  }

  onChangeFeedType(event, value) {
    if (value == 2) {
      this.feedHeaderFooter.headerDelimiter = '';
      this.feedHeaderFooter.footerDelimiter = '';
    } else if (this.feedDefinition.feedTypeKey == '5') {
      this.feedHeaderFooter.headerDelimiter = '';
      this.feedHeaderFooter.footerDelimiter = '';
      this.feedHeaderFooter.footerNumber = 0;
      this.feedHeaderFooter.headerNumber = 0;

      //this.feedHeaderFooter = new HeaderFooter(0 , '' , 0 , '' , '', '', false);
    } /*else if (this.feedDefinition.feedTypeKey == '3') {
      this.feedDefinition.primeIndicator = true;


    }*/ else if (this.feedDefinition.feedTypeKey != '1') {
      this.feedDefinition.xmlPath1 = '';
      this.feedDefinition.xmlPath2 = '';
      //this.feedDefinition.entityType = '';

    }

  }

  onChangeCalendarName(event, value) {
    //this.onStep2CalendarChange.emit(value);

  }

  onChangeFeedName(event, value) {
    //console.log(' value ');
    //console.log(value);
    //console.log('even value');
    //console.log(event.target.value);

    if (this.sourceFeedList) {
      this.sourceFeedList.forEach(sourceFeedListvalue => {
        if (sourceFeedListvalue.srcFeedDefKey == value) {

          this.feedDefinition.sourceName = sourceFeedListvalue.srcFeedName;
          this.feedDefinition.sourceId = sourceFeedListvalue.srcFeedDefKey;
        }
      });
    }

    //this.feedDefinition.sourceName = value.srcFeedName;
    //this.feedDefinition.sourceId = value.srcFeedDefKey;
  }

  onSubmit(targetFeedForm, status) {
    //console.log('submit 2 inside the component step2 ');
    //console.log(this.sourceObj);


    if (this.preProcessInd === true) {
      this.feedDefIndicator.preProcessInd = 'Y';
    } else {
      this.feedDefIndicator.preProcessInd = 'N';
    }

    if (this.incrementLoadIndicator === true) {
      this.feedDefinition.incrementLoadIndicator = 'Y';
    } else {
      this.feedDefinition.incrementLoadIndicator = 'N';
    }

    this.feedDefinition.offset = this.offsetHours + ':' + this.offsetMins;
    this.feedDefinition.status = status;

    if (this.feedDefinition.feedTypeKey == '2') {
      this.feedHeaderFooter.headerDelimiter = '';
      this.feedHeaderFooter.footerDelimiter = '';
    } else if (this.feedDefinition.feedTypeKey == '5') {
      this.feedHeaderFooter.headerDelimiter = '';
      this.feedHeaderFooter.footerDelimiter = '';
      this.feedHeaderFooter.footerNumber = 0;
      this.feedHeaderFooter.headerNumber = 0;

      //this.feedHeaderFooter = new HeaderFooter(0 , '' , 0 , '' , '', '', false);
    }/* else if (this.feedDefinition.feedTypeKey != '3') {
      this.feedDefinition.xmlPath1 = '';
      this.feedDefinition.xmlPath2 = '';
      //this.feedDefinition.entityType = '';

    }*/
    else if (this.feedDefinition.feedTypeKey != '1') {
      this.feedDefinition.xmlPath1 = '';
      this.feedDefinition.xmlPath2 = '';
      //this.feedDefinition.entityType = '';

    }


    let postUrl = this.urlConstant.feedModule.feedStep2Post;
    const saveFeedTargetDef = this.targetFeedList;
    const saveFeedNotification = this.feedNotification.prepareSaveSystem();
    this.feedDefinition.feedTarget = saveFeedTargetDef;
    this.feedDefinition.feedNotificationList = saveFeedNotification;

    const saveFeedDefinition = Object.assign({}, this.feedDefinition);
    let saveFeedDefinitionIndicator = Object.assign({}, this.feedDefIndicator);
    saveFeedDefinitionIndicator.feedActiveDt = this.datepipe.transform(this.feedDefIndicator.feedActiveDt, 'MM/dd/yyyy');
    const saveHeaderFooter = Object.assign({}, this.feedHeaderFooter);
    const feedDefCombined = Object.assign({}, saveFeedDefinition, saveFeedDefinitionIndicator, saveHeaderFooter);
    //feedDefCombined.feedTarget = saveFeedTargetDef;
    //feedDefCombined.feedNotificationList = saveFeedNotification;

    // console.log(feedDefCombined);

    const saveFeed = feedDefCombined;
    //console.log(saveFeed);
    this.saveFeed = saveFeed;

    this.feedStep2Service.postFeed(postUrl, saveFeed).subscribe(
      (results) => {
        // Read the result field from the JSON response.
        let responseObj = results;
        this.clear();
        if (responseObj.success) {

          this.responseObjId = responseObj.data;
          //this.modalTitle = 'Success !!';
          //this.modalContent = 'Feed was saved successfully';
          this.nextStepNewFeed = false;

          if (this.feedStatus.trgMode == 'New' || this.feedStatus.trgMode == 'Clone') {
            this.saveFeedButton = true;
          } else if(this.feedStatus.trgMode == 'edit') {
            this.getFeedAll();
          }

          this.onStep2Submitted.emit(this.responseObjId);
          this.onStep2CalendarChange.emit(true);
          this.toastr.success( 'Data saved successfully' ,  'DQF-SUCCESS');
          //this.openModal();

          //this.success('Success !!!', false);


          this.feedStatus.feedId = responseObj.data;
          this.feedStatus.feedName = this.feedDefinition.feedName;
          this.feedStatusService.setFeedDef(this.feedStatus);

        } else {
          this.error(responseObj.message, false);
        }


      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.
          console.log('An error occurred:', err.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          console.log(`Backend returned code ${err.status}, body was: ${err.error}`);

          this.modalTitle = 'Error !!';
          this.modalContent = JSON.stringify(err);
          }
      }
    );
  }

  openNewTargetFeedModal () {
    this.targetMode = 'add';

    const random = Math.floor(Math.random() * (999999 - 100000)) + 100000;
    this.feedTargetObj = new FeedTargetDef(random, null, '', '', '', 0, '', '', '', '');

    this.getTargetFeedType();
    this.modalComponent.openDqfModal();
  }

  closeChild(event) {
    //this.targetFeedList = this.feedTargetDetails.prepareSaveSystem();
    console.log('targetFeedList ' + JSON.stringify(this.targetFeedList));
    this.modalComponent.closeDqfModal();
    this.targetMode = undefined;
    //this.feedTargetObj = undefined;
    const random = Math.floor(Math.random() * (999999 - 100000)) + 100000;
    this.feedTargetObj = new FeedTargetDef(random, null, '', '', '', 0, '', '', '', '');
  }

  editSystem(id) {
    this.targetMode = 'edit';
    this.feedTargetObj = Object.assign({}, this.targetFeedList.find(obj => obj.targetId === id));
    this.modalComponent.openDqfModal();
  }

  deleteSystem(id) {

    const feedTargetObj = Object.assign({},  this.targetFeedList.find(obj => obj.targetId === id));

    if (feedTargetObj.trgtFeedTransfrKey != null) {
      const url = this.urlConstant.feedModule.deleteFeedtargetDetails + feedTargetObj.trgtFeedTransfrKey;
      this.feedTargetService.deleteFeedTarget(url, feedTargetObj).subscribe(
        (deleteResponse) => {
          this.targetFeedList.splice(this.targetFeedList.findIndex(obj => obj.targetId === id), 1);
        });
    } else {
      this.targetFeedList.splice(this.targetFeedList.findIndex(obj => obj.targetId === id), 1);
    }

  }

  getTargetFeedType() {
    let targetFeedTypeDefault = '';
    if (this.feedDefinition && this.feedDefinition.feedTypeKey) {
      if (this.feedDefinition.feedTypeKey == '2' || this.feedDefinition.feedTypeKey == '1') {
        this.feedTargetObj.transferFeedFormat = 'Original';
        targetFeedTypeDefault = 'Original';
      } else if (this.feedDefinition.feedTypeKey == '3') {
        this.feedTargetObj.transferFeedFormat = 'xml';
        targetFeedTypeDefault = 'xml';
      } else {
        this.feedTargetObj.transferFeedFormat = '';
        targetFeedTypeDefault = '';
      }
    } else {
      if (this.feedDefinition.feedTypeKey == '2' || this.feedDefinition.feedTypeKey == '1') {
        targetFeedTypeDefault = 'Original';
        this.feedTargetObj.transferFeedFormat = 'Original';
      } else if (this.feedDefinition.feedTypeKey == '3') {
        targetFeedTypeDefault = 'xml';
      } else {
        this.feedTargetObj.transferFeedFormat = '';
        //this.feedTargetObj.transferFeedFormat = '';
        targetFeedTypeDefault = '';
      }
    }
    this.targetFeedTypeDefault = targetFeedTypeDefault;

  }

  public modalClose() {
    //console.log('modal closed');

  }

  public openModal() {
    $(this.modal.nativeElement).modal('show');
  }

  public onNextClick() {

    //console.log('on next click');
    const random = Math.floor(Math.random() * (999999 - 100000)) + 100000;
    this.onNextStep.emit('step2' + random);
  }

  public onPreviousClick() {
    const random = Math.floor(Math.random() * (999999 - 100000)) + 100000;
    this.onPreviousStep.emit('step2' + random);
  }

  cancel() {
    //let url = this.urlConstant.systemModule.systemList;
    //let feedObj = this.feedStep2Service.getFeedDef(url);
    let srcFeedId = this.feedStatus.sourceFeedId ? this.feedStatus.sourceFeedId : '';
    let srcFeedName = this.feedStatus.sourceFeedName ? this.feedStatus.sourceFeedName : '';
    this.primeIndicatorValue = false;
    this.feedDefinition = new FeedDef('', '', srcFeedId, srcFeedName, '', this.feedStatus.targetSysId, '', '', '', '', '', '', '', '', '', this.primeIndicatorValue, '', '', '', [], []);
    this.feedDefIndicator = new FeedDefinitionIndicators('', '', '', '', '', '', '', '');
    this.feedHeaderFooter = new HeaderFooter(0, '', 0, '', '', '', false);
    this.feedTargetDef = this.feedTargetService.getFeedTargetDef();
    this.targetFeedList = [];
    this.dateEnabledStep2 = true;
    this.incrementLoadIndicator = false;
    this.preProcessInd = false;
    this.offsetHours = '00';
    this.offsetMins = '00';
    this.feedDefinition.offset = '00:00';
    this.targetFeedForm.form.markAsPristine();
  }


  success(message: string, keepAfterRouteChange = false) {
    this.notificationService.success(message, keepAfterRouteChange);
  }

  error(message: string, keepAfterRouteChange = false) {
    this.notificationService.error(message, keepAfterRouteChange);
  }

  info(message: string, keepAfterRouteChange = false) {
    this.notificationService.info(message, keepAfterRouteChange);
  }

  warn(message: string, keepAfterRouteChange = false) {
    this.notificationService.warn(message, keepAfterRouteChange);
  }

  clear() {
    this.notificationService.clear();
  }

  private get disabledV(): string {
    return this._disabledV;
  }

  private set disabledV(value: string) {
    this._disabledV = value;
    this.disabled = this._disabledV === '1';
  }

  public selected(value: any): void {
    //console.log('Selected value is: ', value);
    //this.sourceObj = {
    //	id: value.id,
    //	text: value.text
    // };
  }

  public removed(value: any): void {
    //console.log('Removed value is: ', value);
  }

  public typed(value: any): void {
    //console.log('New search input: ', value);
  }

  public refreshValue(value: any): void {
    this.value = value;
  }


}

