import { Component } from '@angular/core';
import {NavController, Platform} from 'ionic-angular';
import {DataserviceProvider} from '../../providers/dataservice/dataservice';
import {AddtodoPage} from '../addtodo/addtodo';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [DataserviceProvider]
})
export class ImportantPage {

  public toDos : any[];
  public noToDo : boolean;
  constructor(private todoService: DataserviceProvider, private navController: NavController, private platform: Platform) {
    this.navController = navController;
    this.platform.ready().then(() => {
      this.todoService.retrieveToDos().then(data => {
        this.toDos = data;
        if(this.toDos.length > 0 ) {
          this.noToDo = false;
        }
        else {
          this.noToDo = true;
        }
      })
        .catch(console.error.bind(console));
    });
  }

  showToDoPage() {
    this.navController.push(AddtodoPage);
  }

  delete(item) {
    this.todoService.deleteToDo(item);
  }


}
