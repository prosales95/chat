import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QuotesListPage } from './quotes-list';

@NgModule({
  declarations: [
    QuotesListPage,
  ],
  imports: [
    IonicPageModule.forChild(QuotesListPage),
  ],
})
export class QuotesListPageModule {}
