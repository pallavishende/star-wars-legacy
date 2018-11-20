import {Component, Input, Output, OnInit, SimpleChanges, OnChanges, EventEmitter} from '@angular/core';
//import { FormArray, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import {HeaderMenuService} from '../../../../../core/header-menu/header-menu.service';
import {FeedTargetDef} from './feedTarget.model';
import {FeedTargetService} from './feedTarget.service';
import {urlList} from '../../../../../../assets/constants/url-constants';
import {FeedStatusService} from '../../../../../core/feedStatus.service';
import {FeedStatus} from '../../../../../core/feedStatus.model';


@Component({
  selector: 'target-detail',
  templateUrl: './feedTargetDetails.component.html'
})

export class FeedTargetDetails implements OnInit, OnChanges {
  @Input() targetFeedList: Array<any>;
  @Input() targetComponentMode: string;
  @Input() feedType: string;
  @Input() feedTargetObj: FeedTargetDef;
  @Input() targetFeedTypeDefault: string;
  @Output() parentModalClose = new EventEmitter<string>();

  feedStatus: FeedStatus = undefined;

  nameChangeLog: string[] = [];
  private editMode = '';
  private editId = 0;

  private feedFormatList: Array<any> = [];

  private urlConstant = urlList[0];
  public transportMethodList = '';
  public targetFeedType = '';
  public disableRoleTarget = false;

  constructor(private headerMenuService: HeaderMenuService,
              private feedTargetService: FeedTargetService,
              private feedStatusService: FeedStatusService) {

  }

  createForm() {
    const random = Math.floor(Math.random() * (999999 - 100000)) + 100000;
    this.feedTargetObj = new FeedTargetDef(random, null, '', '', '', 0, '', '', this.targetFeedTypeDefault, '');
    //this.targetFeedList = this.feedTargetDef;
  }

  getIsRole() {

    //this.isAdmin = this.loginService.getIsAdmin();
    this.disableRoleTarget = this.headerMenuService.getIsAdmin();
    //console.log('disableRoleTarget ' + this.disableRoleTarget);
  }

  ngOnInit() {

    //this.disableRoleTarget = true;
    this.getIsRole();
    this.feedStatus = this.feedStatusService.getFeedDef();

    if (this.feedStatus.trgMode == 'view') {
      this.disableRoleTarget = false;
    }

    let classificationTransportMethod = this.urlConstant.feedModule.classification + 'TransportMethod';
    let FeedFormatUrl = this.urlConstant.feedModule.classification + 'FeedFormat';

    this.feedTargetService.getExistingSystem(classificationTransportMethod).subscribe(
      (transportMethodresult) => {
        this.transportMethodList = transportMethodresult.data;
        //console.log(this.transportMethodList);
      });

    this.feedTargetService.getExistingSystem(FeedFormatUrl).subscribe(
      (feedFormatResponse) => {
        this.feedFormatList = feedFormatResponse.data;
        //console.log(this.transportMethodList);
      });


    //this.editMode = 'add';
    this.createForm();

  }

  ngOnChanges(changes: SimpleChanges) {
    this.editMode = this.targetComponentMode;
    //this.targetFeedList = this.feedTargetDef;
  }

  onSubmitSys() {
    const random = Math.floor(Math.random() * (999999 - 100000)) + 100000;

    if (this.editMode === 'edit') {

      const editObj = Object.assign(this.targetFeedList.find(obj => obj.targetId === this.feedTargetObj.targetId), this.feedTargetObj);

    } else {

      const targetObj = Object.assign({}, this.feedTargetObj);
      this.targetFeedList.push(targetObj);
    }
    this.closeModalWindow('save');
  }

  prepareSaveSystem(): any[] {
    return this.targetFeedList;
  }

  setTargetSystem(targetList: any[]) {

    const random = Math.floor(Math.random() * (999999 - 100000)) + 100000;
    this.editMode = 'edit';
    this.feedTargetObj = new FeedTargetDef(random, null, '', '', '', 0, '', '', this.targetFeedTypeDefault, '');
  }


  goBack() {
    this.closeModalWindow('close');
  }

  closeModalWindow(event) {
    this.parentModalClose.emit(event);
  }

}
