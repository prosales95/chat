import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ImportantPage } from './important';

@NgModule({
  declarations: [
    ImportantPage,
  ],
  imports: [
    IonicPageModule.forChild(ImportantPage),
  ],
})
export class ImportantPageModule {}
