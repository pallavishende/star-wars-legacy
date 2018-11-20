import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DqfmodalComponent } from './dqfmodal.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  exports: [DqfmodalComponent],
  declarations: [DqfmodalComponent]
})
export class DqfmodalModule {

}
