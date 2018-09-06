import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FavorietenPage } from './favorieten';

@NgModule({
  declarations: [
    FavorietenPage,
  ],
  imports: [
    IonicPageModule.forChild(FavorietenPage),
  ],
})
export class FavorietenPageModule {}
