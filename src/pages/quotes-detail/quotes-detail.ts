import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { SocialSharing, GoogleAnalytics } from 'ionic-native';


/**
 * Generated class for the QuotesDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 @IonicPage()
 @Component({
 	selector: 'page-quotes-detail',
 	templateUrl: 'quotes-detail.html',
 })

 export class QuotesDetailPage {
 	quoteDetail : {quote: '', author: ''};

 	constructor(public navCtrl: NavController, 
 		public navParams: NavParams, public platform: Platform) {
 		this.quoteDetail = navParams.get("quote");
 		platform.ready().then(() => {
 			GoogleAnalytics.trackView("Quotes Detail");
 		});
 	}

 	twitterShare() {
 		console.log("in twitter share");
 		let quote: string = this.quoteDetail.quote;
 		let quoteAuthor: string = this.quoteDetail.author;
 		GoogleAnalytics.trackEvent("Quotes", "Share", quoteAuthor, 1);
 		SocialSharing.shareViaTwitter(quote.substring(0,110)+"..",
 			null /*Image*/,
 			"http://ionicframework.com/img/homepage/ionicview-icon_2x.png")
 		.then((data) => {
 			alert("Success " +data)
 		},
 		(err) => {
 			alert("failed" + err)
 		})
 	}

 	ionViewDidLoad() {
 		console.log('ionViewDidLoad QuotesDetailPage');
 	}

 }
