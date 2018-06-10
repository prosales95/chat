import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataserviceProvider } from '../../providers/dataservice/dataservice';

/**
 * Generated class for the AddtodoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addtodo',
  templateUrl: 'addtodo.html',
  providers: [DataserviceProvider]
})
export class AddtodoPage {
todoForm: FormGroup;
  constructor(private navController: NavController, private fb: FormBuilder, private todoService: DataserviceProvider) {
    this.todoForm = fb.group({
      'name': ['', Validators.compose([Validators.required,Validators.pattern('[a-zA-Z, ]*'),Validators.minLength(3),Validators.maxLength(100)])],
      'description':['']
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddtodoPage');
  }

  addToDo() {
    let date= new Date();
    let newDoc = {
      'name':this.todoForm.value.name,
      'description': this.todoForm.value.description,
      'createdTime':date.getTime()
    };

    //addding todo using data srvc
    this.todoService.addToDo(newDoc);
    //after addition nav to list view
    this.navController.popToRoot();
  }

}
