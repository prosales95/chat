import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import PouchDB from 'pouchdb';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';


/*
  Generated class for the DataserviceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
  */
@Injectable()
export class DataserviceProvider {
//cloudant uname, pw, dbUrl, todo array
  private db: any;
  private username = 'pablo_25rrs@hotmail.com';
  private password = 'Pablosky#1995';
  private dbURL = 'https://865cf92d-ba5f-4c43-9484-7dc33973c1bd-bluemix.cloudant.com/database/tododb/_all_docs';
  private toDos = [];

  constructor() {
    this.db = new PouchDB('tododb');
    let options = {
      live: true,
      retry: true,
      continous: true,
      auth: {
        username: this.username,
        password: this.password
      }
    }
    //Sync db with cloudant
    this.db.sync(this.dbURL, options);
    console.log('Hello DataserviceProvider Provider');
  }


  addToDo(doc) {
    return this.db.post(doc);
  }

  deleteToDo(doc) {
    return this.db.remove(doc);
  }


  retrieveToDos() {
    return new Promise<any>(resolve => {
      this.db.allDocs({include_docs: true}).then((result) => {
        if (result.total_rows > 0) {
          result.rows.map((row) => {
            this.toDos.push(row.doc);
            resolve(this.toDos);
          });	// code...
        }
        else {
          resolve(this.toDos);
        }
        this.db.changes({live: true, since: 'now', include_docs: true})
          .on('change', (change) => {
            this.onChange(change);
          });
      }).catch((error) => {
        console.log(error);
      });
    });
  }

  onChange(change) {
    let changedDoc = null;
    let changedIndex = null;
    this.toDos.forEach((doc, index) => {
      if (doc._id === change.id) {
        changedDoc = doc;
        changedIndex = index;
      }
    });

//Handle doc deleted
    if (change.deleted) {
      this.toDos.splice(changedIndex, 1);
      // code...
    }
    else {
      //Handle updates
      if (changedDoc) {
        this.toDos[changedIndex] = change.doc;
        // code...
      }
      //Handle additions
      else {
        this.toDos.push(change.doc);
      }
    }
  }

}
