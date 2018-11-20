import {Component, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';


@Component({
  selector: 'dqf-modal',
  templateUrl: './dqfmodal.component.html',
  styleUrls: ['./dqfmodal.component.scss']
})
export class DqfmodalComponent implements OnInit {

  @Input('modalSettings') modalSettings: Object;


  @ViewChild('modalTemplate') modalTemplate: TemplateRef<any>;


  @ViewChild('modalCommentTemplate') modalCommentTemplate: TemplateRef<any>;

  modalRef: BsModalRef;

  modalRef2: BsModalRef;

  constructor(private modalService: BsModalService) {}

  openModal(template: TemplateRef<any>, size: string) {
    //console.log(size);
    this.modalRef = this.modalService.show(template, {
      backdrop : 'static',
      keyboard : false,
      class: `modal-${size}`
    });
  }

  closeModal() {
    //console.log('Main Modal closed');
    this.modalRef.hide();
  }

  ngOnInit() {
  }


  openDqfModal() {
    this.openModal(this.modalTemplate, this.modalSettings['modalSize']);
  }

  closeDqfModal() {
    //console.log('Modal closed');
    this.closeModal();
  }


  // comments modal changes

  openCmtModal(template: TemplateRef<any>, size: string) {
    this.modalRef2 = this.modalService.show(template, { backdrop : 'static',
      keyboard : false,
      class: `modal-${size}`});
  }

  closeCmtModal() {
    //console.log('Comment Modal closed');
    this.modalRef2.hide();
  }

  openCmtDqfModal() {
    this.openCmtModal(this.modalCommentTemplate, this.modalSettings['modalSize']);
  }

  closeCmtDqfModal() {
    //console.log('Modal Comment closed');
    this.closeCmtModal();
  }

}
