import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EconomiePage } from './economie';

@NgModule({
  declarations: [
    EconomiePage,
  ],
  imports: [
    IonicPageModule.forChild(EconomiePage),
  ],
})
export class EconomiePageModule {}
