import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { QuotesDetailPage } from '../quotes-detail/quotes-detail';
import { GoogleAnalytics } from 'ionic-native';

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
 		NavParams, public http : Http, public platform:Platform ) {
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
     platform.ready().then(() => {
       GoogleAnalytics.trackView("Quotes List");
     });


 	}

 	searchQuotes(event) {
		if(event.target.value.length > 2) {
      var filteredJson = this.quotesList.filter(function (row) {

        if(row.author.toLowerCase().indexOf(event.target.value.
          toLowerCase()) != -1) {
          
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
