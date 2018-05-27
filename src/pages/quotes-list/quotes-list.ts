import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { QuotesDetailPage } from '../quotes-detail/quotes-detail';


/**
 * Generated class for the QuotesListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 @IonicPage()
 @Component({
 	selector: 'page-quotes-list',
 	templateUrl: 'quotes-list.html',
 })

 export class QuotesListPage {

 	quotesList = [];
 	filteredQuotes = [];
 	isfiltered: boolean;

 	constructor(public navCtrl: NavController, public navParams:
 		NavParams, public http : Http ) {
 		this.isfiltered = false;
 		this.http.get("quotes.json")
 		.map( res => res.json())
 		.subscribe(
 			data =>  {
 				this.quotesList = data.quotes;
 			},
  			  	err => console.log("error is " +err), //error catch
  			  	() => console.log('read quotes Complete '+ this.quotesList) 
  				//finished reading
  				);

 	}

 	searchQuotes(event) {
		if(event.target.value.length > 6) {
      var filteredJson = this.quotesList.filter(function (row) {
        if(row.author.indexOf(event.target.value) != -1) {
          return true
        } else {
          return false;
        }
    });
    this.isfiltered = true;
    this.filteredQuotes = filteredJson;
		}
	}

 	itemTapped (event, quote) {
 		console.log(quote);
 		this.navCtrl.push(QuotesDetailPage, {
 			quote: quote,
 		});
 	}

 	ionViewDidLoad() {
 		console.log('ionViewDidLoad QuotesListPage');
 	}

 }
