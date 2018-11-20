import { Component, Input, OnChanges }       from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { FeedSystemDef } from './feedSystem.model';
import { FeedSystemService } from './feedSystem.service';

@Component({
  selector: 'system-detail',
  templateUrl: './feedSystemDetails.component.html'
})

export class SystemDefDetailComponent implements OnChanges {
  @Input() feedSystemDef: FeedSystemDef;

  systemForm: FeedSystemDef;
  nameChangeLog: string[] = [];

  constructor(
    private fb: FormBuilder,
    private feedSystemService: FeedSystemService) {

    this.createForm();
    //this.logNameChange();
  }

  createForm() {
    this.systemForm = new FeedSystemDef('','','','',0,'','','','','','',0,'','',false);
  }

  ngOnChanges() {


  }

  onSubmitSys() {
    //this.feedSystemDef = this.prepareSaveSystem();
    this.feedSystemService.updateSystem(this.feedSystemDef);
    this.ngOnChanges();
  }

  prepareSaveSystem(): FeedSystemDef {
    const formModel = this.systemForm;

    // return new `system detail` object containing form system value(s)

    let saveSystem = new FeedSystemDef(

      formModel.sourceId,
      formModel.sourceName,
      formModel.sourceDirectory,
      formModel.sourceServerName,
      formModel.sourcePort,
      formModel.sourceTransportType,
      formModel.sourceTransportMethod,
      formModel.targetId,
      formModel.targetName,
      formModel.targetDirectory,
      formModel.targetServerName,
      formModel.targetPort,
      formModel.targetTransportType,
      formModel.targetTransportMethod,
      formModel.status
    );

    return saveSystem;
  }

  revert() { this.ngOnChanges(); }
/*
  logNameChange() {
    const nameControl = this.systemForm.get('sourceName');
    nameControl.valueChanges.forEach(
      (value: string) => this.nameChangeLog.push(value)
    );
  }
*/
}
