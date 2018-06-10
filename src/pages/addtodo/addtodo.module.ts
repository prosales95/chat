import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddtodoPage } from './addtodo';

@NgModule({
  declarations: [
    AddtodoPage,
  ],
  imports: [
    IonicPageModule.forChild(AddtodoPage),
  ],
})
export class AddtodoPageModule {}
