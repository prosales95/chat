webpackJsonp([5],{

/***/ 127:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DataserviceProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_pouchdb__ = __webpack_require__(552);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise__ = __webpack_require__(238);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/*
  Generated class for the DataserviceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
  */
var DataserviceProvider = /** @class */ (function () {
    function DataserviceProvider() {
        this.username = 'pablo_25rrs@hotmail.com';
        this.password = 'Pablosky#1995';
        this.dbURL = 'https://865cf92d-ba5f-4c43-9484-7dc33973c1bd-bluemix.cloudant.com/database/tododb/_all_docs';
        this.toDos = [];
        this.db = new __WEBPACK_IMPORTED_MODULE_1_pouchdb__["a" /* default */]('tododb');
        var options = {
            live: true,
            retry: true,
            continous: true,
            auth: {
                username: this.username,
                password: this.password
            }
        };
        //Sync db with cloudant
        this.db.sync(this.dbURL, options);
        console.log('Hello DataserviceProvider Provider');
    }
    DataserviceProvider.prototype.addToDo = function (doc) {
        return this.db.post(doc);
    };
    DataserviceProvider.prototype.deleteToDo = function (doc) {
        return this.db.remove(doc);
    };
    DataserviceProvider.prototype.retrieveToDos = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.db.allDocs({ include_docs: true }).then(function (result) {
                if (result.total_rows > 0) {
                    result.rows.map(function (row) {
                        _this.toDos.push(row.doc);
                        resolve(_this.toDos);
                    }); // code...
                }
                else {
                    resolve(_this.toDos);
                }
                _this.db.changes({ live: true, since: 'now', include_docs: true })
                    .on('change', function (change) {
                    _this.onChange(change);
                });
            }).catch(function (error) {
                console.log(error);
            });
        });
    };
    DataserviceProvider.prototype.onChange = function (change) {
        var changedDoc = null;
        var changedIndex = null;
        this.toDos.forEach(function (doc, index) {
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
            else {
                this.toDos.push(change.doc);
            }
        }
    };
    DataserviceProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [])
    ], DataserviceProvider);
    return DataserviceProvider;
}());

//# sourceMappingURL=dataservice.js.map

/***/ }),

/***/ 169:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChatPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__ = __webpack_require__(512);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/*
*
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
//@IonicPage()
var ChatPage = /** @class */ (function () {
    function ChatPage(db, navCtrl, navParams) {
        var _this = this;
        this.db = db;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.username = '';
        this.message = '';
        this.messages = [];
        this.username = this.navParams.get('username');
        this._chatSubscription = this.db.list('/chat').valueChanges()
            .subscribe(function (data) {
            _this.messages = data;
        });
    }
    ChatPage.prototype.sendMessage = function () {
        this.db.list('/chat').push({
            username: this.username,
            message: this.message
        }).then(function () {
            // message is sent
        });
        this.message = '';
    };
    ChatPage.prototype.ionViewDidLoad = function () {
        this.db.list('/chat').push({
            specialMessage: true,
            message: this.username + " has joined the room"
        });
    };
    ChatPage.prototype.ionViewWillLeave = function () {
        this._chatSubscription.unsubscribe();
        this.db.list('/chat').push({
            specialMessage: true,
            message: this.username + " has left the room"
        });
    };
    ChatPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-chat',template:/*ion-inline-start:"C:\Users\Anwender\Ionic\chat\src\pages\chat\chat.html"*/'<!--\n\nGenerated template for the ChatPage page.\n\nSee http://ionicframework.com/docs/components/#navigation for more info on\n\nIonic pages and navigation.\n\n-->\n\n<ion-header>\n\n\n\n  <ion-navbar color = "primary">\n\n    <button ion-button menuToggle>\n\n      <ion-icon name ="menu"> </ion-icon> </button>\n\n      <ion-title>Chatting time</ion-title>\n\n    </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content padding>\n\n\n\n  <div id="chatMessages">\n\n    <div *ngFor="let message of messages" [class]="message.specialMessage ? \'message special\' : \'message\'">\n\n      <div [class]="message.username == username ? \'innerMessage messageRight\' : \'innerMessage messageLeft\'">\n\n        <div class="username">{{ message.username }}</div>\n\n        <div class="messageContent">{{ message.message }}</div>\n\n      </div>\n\n    </div>\n\n  </div>\n\n\n\n</ion-content>\n\n\n\n<ion-footer>\n\n\n\n    <div id="footer">\n\n      <div class="elem"><ion-input type="text" [(ngModel)]="message"></ion-input></div>\n\n      <div class="elem"><button ion-button icon-only (click)="sendMessage()"><ion-icon name="send"></ion-icon> </button></div>\n\n    </div>\n\n\n\n</ion-footer>'/*ion-inline-end:"C:\Users\Anwender\Ionic\chat\src\pages\chat\chat.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["a" /* AngularFireDatabase */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */]])
    ], ChatPage);
    return ChatPage;
}());

//# sourceMappingURL=chat.js.map

/***/ }),

/***/ 171:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ImportantPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_dataservice_dataservice__ = __webpack_require__(127);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__addtodo_addtodo__ = __webpack_require__(177);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ImportantPage = /** @class */ (function () {
    function ImportantPage(todoService, navController, platform) {
        var _this = this;
        this.todoService = todoService;
        this.navController = navController;
        this.platform = platform;
        this.navController = navController;
        this.platform.ready().then(function () {
            _this.todoService.retrieveToDos().then(function (data) {
                _this.toDos = data;
                if (_this.toDos.length > 0) {
                    _this.noToDo = false;
                }
                else {
                    _this.noToDo = true;
                }
            })
                .catch(console.error.bind(console));
        });
    }
    ImportantPage.prototype.showToDoPage = function () {
        this.navController.push(__WEBPACK_IMPORTED_MODULE_3__addtodo_addtodo__["a" /* AddtodoPage */]);
    };
    ImportantPage.prototype.delete = function (item) {
        this.todoService.deleteToDo(item);
    };
    ImportantPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',
            templateUrl: 'home.html',
            providers: [__WEBPACK_IMPORTED_MODULE_2__providers_dataservice_dataservice__["a" /* DataserviceProvider */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__providers_dataservice_dataservice__["a" /* DataserviceProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */]])
    ], ImportantPage);
    return ImportantPage;
}());

//# sourceMappingURL=important.js.map

/***/ }),

/***/ 176:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AboutPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(22);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the AboutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var AboutPage = /** @class */ (function () {
    function AboutPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    AboutPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad AboutPage');
    };
    AboutPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-about',template:/*ion-inline-start:"C:\Users\Anwender\Ionic\chat\src\pages\about\about.html"*/'<!--\n\n  Generated template for the AboutPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n\n\n<ion-navbar color = "danger">\n\n		<button ion-button menuToggle>\n\n			<ion-icon name ="menu"> </ion-icon> </button>\n\n			<ion-title>About Us</ion-title>\n\n		</ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content padding>\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\Anwender\Ionic\chat\src\pages\about\about.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */]])
    ], AboutPage);
    return AboutPage;
}());

//# sourceMappingURL=about.js.map

/***/ }),

/***/ 177:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddtodoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_dataservice_dataservice__ = __webpack_require__(127);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the AddtodoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var AddtodoPage = /** @class */ (function () {
    function AddtodoPage(navController, fb, todoService) {
        this.navController = navController;
        this.fb = fb;
        this.todoService = todoService;
        this.todoForm = fb.group({
            'name': ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].pattern('[a-zA-Z, ]*'), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].minLength(3), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["f" /* Validators */].maxLength(100)])],
            'description': ['']
        });
    }
    AddtodoPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad AddtodoPage');
    };
    AddtodoPage.prototype.addToDo = function () {
        var date = new Date();
        var newDoc = {
            'name': this.todoForm.value.name,
            'description': this.todoForm.value.description,
            'createdTime': date.getTime()
        };
        //addding todo using data srvc
        this.todoService.addToDo(newDoc);
        //after addition nav to list view
        this.navController.popToRoot();
    };
    AddtodoPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-addtodo',template:/*ion-inline-start:"C:\Users\Anwender\Ionic\chat\src\pages\addtodo\addtodo.html"*/'<!--\n  Generated template for the AddtodoPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Add priorities for the day</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <form [formGroup]="todoForm" (ngSubmit)="addToDo()">\n    <ion-list>\n\n      <ion-item>\n        <ion-label color="primary">Name\n        </ion-label>\n        <ion-input placeholder="Name" [formControlName]="name"> </ion-input>\n      </ion-item>\n\n      <ion-item>\n        <ion-label color="primary"> Description\n        </ion-label>\n        <ion-input placeholder="Description" [formControlName]="description"> </ion-input>\n      </ion-item>\n\n      <ion-item>\n        <button ion-button block [disabled]="!todoForm.valid"\n                type="submit">\n          form Add to Do\n        </button>\n      </ion-item>\n    </ion-list>\n  </form>\n</ion-content>\n'/*ion-inline-end:"C:\Users\Anwender\Ionic\chat\src\pages\addtodo\addtodo.html"*/,
            providers: [__WEBPACK_IMPORTED_MODULE_3__providers_dataservice_dataservice__["a" /* DataserviceProvider */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_3__providers_dataservice_dataservice__["a" /* DataserviceProvider */]])
    ], AddtodoPage);
    return AddtodoPage;
}());

//# sourceMappingURL=addtodo.js.map

/***/ }),

/***/ 178:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return QuotesListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(835);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__quotes_detail_quotes_detail__ = __webpack_require__(98);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_native__ = __webpack_require__(80);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 * Generated class for the QuotesListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var QuotesListPage = /** @class */ (function () {
    function QuotesListPage(navCtrl, navParams, http, platform) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.platform = platform;
        this.quotesList = [];
        this.filteredQuotes = [];
        this.isfiltered = false;
        this.http.get("quotes.json")
            .map(function (res) { return res.json(); })
            .subscribe(function (data) {
            _this.quotesList = data.quotes;
        }, function (err) { return console.log("error is " + err); }, //error catch
        function () { return console.log('read quotes Complete ' + _this.quotesList); }
        //finished reading
        );
        platform.ready().then(function () {
            __WEBPACK_IMPORTED_MODULE_5_ionic_native__["b" /* GoogleAnalytics */].trackView("Quotes List");
        });
    }
    QuotesListPage.prototype.searchQuotes = function (event) {
        if (event.target.value.length > 2) {
            var filteredJson = this.quotesList.filter(function (row) {
                if (row.author.toLowerCase().indexOf(event.target.value.
                    toLowerCase()) != -1) {
                    return true;
                }
                else {
                    return false;
                }
            });
            this.isfiltered = true;
            this.filteredQuotes = filteredJson;
        }
    };
    QuotesListPage.prototype.itemTapped = function (event, quote) {
        console.log(quote);
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__quotes_detail_quotes_detail__["a" /* QuotesDetailPage */], {
            quote: quote,
        });
    };
    QuotesListPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad QuotesListPage');
    };
    QuotesListPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-quotes-list',template:/*ion-inline-start:"C:\Users\Anwender\Ionic\chat\src\pages\quotes-list\quotes-list.html"*/'<!--\n\n  Generated template for the QuotesListPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n\n\n	<ion-navbar color = "accent">\n\n		<button ion-button menuToggle>\n\n			<ion-icon name ="menu"> </ion-icon> </button>\n\n			<ion-title>Quotes List</ion-title>\n\n		</ion-navbar>\n\n\n\n	</ion-header>\n\n\n\n\n\n	<ion-content padding>\n\n\n\n		<ion-content padding>\n\n	<ion-item>\n\n		<ion-input type="text" placeholder="Search Quotes..." (input)="searchQuotes($event)"></ion-input>\n\n	</ion-item>\n\n\n\n	<ion-list *ngIf = "!isfiltered">\n\n		<ion-item *ngFor = "let quote1 of quotesList" (click)="itemTapped($event, quote1)">\n\n			<h2> {{quote1.author}} </h2>\n\n			<p class="item-description"> {{quote1.quote}} </p>\n\n		</ion-item>\n\n	</ion-list>\n\n\n\n	<ion-list *ngIf = "isfiltered">\n\n		<ion-item *ngFor = "let quote of filteredQuotes" (click)="itemTapped($event, quote)">\n\n			<h2> {{quote.author}} </h2>\n\n			<p class="item-description"> {{quote.quote}} </p>\n\n		</ion-item>\n\n	</ion-list>\n\n\n\n\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\Anwender\Ionic\chat\src\pages\quotes-list\quotes-list.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */]])
    ], QuotesListPage);
    return QuotesListPage;
}());

//# sourceMappingURL=quotes-list.js.map

/***/ }),

/***/ 179:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegisterPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(22);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var RegisterPage = /** @class */ (function () {
    function RegisterPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    RegisterPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad RegisterPage');
    };
    RegisterPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-register',template:/*ion-inline-start:"C:\Users\Anwender\Ionic\chat\src\pages\register\register.html"*/'<!--\n\n  Generated template for the RegisterPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n\n\n <ion-navbar color = "light">\n\n		<button ion-button menuToggle>\n\n			<ion-icon name ="menu"> </ion-icon> </button>\n\n			<ion-title>Register Now</ion-title>\n\n		</ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content padding>\n\n\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\Anwender\Ionic\chat\src\pages\register\register.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */]])
    ], RegisterPage);
    return RegisterPage;
}());

//# sourceMappingURL=register.js.map

/***/ }),

/***/ 190:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 190;

/***/ }),

/***/ 234:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/about/about.module": [
		876,
		4
	],
	"../pages/addtodo/addtodo.module": [
		877,
		3
	],
	"../pages/quotes-detail/quotes-detail.module": [
		878,
		2
	],
	"../pages/quotes-list/quotes-list.module": [
		879,
		1
	],
	"../pages/register/register.module": [
		880,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 234;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 511:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_native__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__chat_chat__ = __webpack_require__(169);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_important_important__ = __webpack_require__(171);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, alertCtrl, platform) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.platform = platform;
        this.username = '';
        this.base64Image = new Array();
        this.extraOptions = {
            pager: true,
            paginationClickable: true,
            spaceBetween: 30,
            centeredSlides: true,
            autoplay: 2000
        };
        this.platform.ready().then(function () {
            __WEBPACK_IMPORTED_MODULE_2_ionic_native__["c" /* NativeStorage */].getItem("photos").then(function (data) {
                _this.base64Image = data.split(",");
            }, function (error) {
                console.log("error in getting photos " + error);
            });
        });
    }
    HomePage.prototype.showAlert = function (title, message) {
        var alertBox = this.alertCtrl.create({
            title: title,
            subTitle: message,
            buttons: ['OK']
        });
        alertBox.present();
    };
    HomePage.prototype.loginUser = function () {
        if (/^[a-zA-Z0-9]+$/.test(this.username)) {
            // code...
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__chat_chat__["a" /* ChatPage */], {
                username: this.username
            });
        }
        else {
            this.showAlert('Error', 'Invalid Username');
        }
    };
    HomePage.prototype.goToDo = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__pages_important_important__["a" /* ImportantPage */]);
    };
    HomePage.prototype.takePicture = function () {
        var _this = this;
        __WEBPACK_IMPORTED_MODULE_2_ionic_native__["a" /* Camera */].getPicture({
            quality: 75,
            destinationType: __WEBPACK_IMPORTED_MODULE_2_ionic_native__["a" /* Camera */].DestinationType.FILE_URI,
            sourceType: __WEBPACK_IMPORTED_MODULE_2_ionic_native__["a" /* Camera */].PictureSourceType.CAMERA,
            allowEdit: true,
            encodingType: __WEBPACK_IMPORTED_MODULE_2_ionic_native__["a" /* Camera */].EncodingType.JPEG,
            targetHeight: 300,
            targetWidth: 300,
            saveToPhotoAlbum: true,
        }).then(function (imageUri) {
            console.log("imageUri is " + imageUri);
            _this.base64Image.push(imageUri);
            var imageUris = _this.base64Image.map(function (o) { return o; }).join(', ');
            __WEBPACK_IMPORTED_MODULE_2_ionic_native__["c" /* NativeStorage */].setItem('photos', imageUris).then(function () { return console.log('Stored item!'); }, function (error) { return console.error('Error in storing item', error); });
        }, function (err) {
            console.log("camera error is " + err);
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Slides */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Slides */])
    ], HomePage.prototype, "slides", void 0);
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"C:\Users\Anwender\Ionic\chat\src\pages\home\home.html"*/'<ion-header>\n\n  <ion-navbar color = "secondary">\n\n    <button ion-button menuToggle>\n\n      <ion-icon name ="menu"> </ion-icon> </button>\n\n      <ion-title>Home</ion-title>\n\n\n\n      <ion-buttons  end>\n\n        <button (click) = "takePicture()" class = "custom-icon">  \n\n          <ion-icon name="camera" color = "primary"></ion-icon>\n\n        </button>\n\n      </ion-buttons>\n\n      <ion-title *ngIf="base64Image.length == 0" center-right > <br/>  <br/> &nbsp; &nbsp; &nbsp; Click & take pics!</ion-title>\n\n    </ion-navbar>\n\n  </ion-header>\n\n\n\n  <ion-content padding>\n\n    <p>\n\n      Enter your username\n\n    </p>\n\n\n\n    <ion-list>\n\n\n\n      <ion-item>\n\n        <ion-label floating>Username</ion-label>\n\n        <ion-input type="text" [(ngModel)] ="username" ></ion-input>\n\n      </ion-item>\n\n\n\n\n\n\n\n    </ion-list>\n\n\n\n    <button ion-button block outline (click)="loginUser()" > Login </button>\n\n\n\n    <button ion-button round icon-start (click) = "goToDo()" > <ion-icon name="star"></ion-icon> > Add MUST List</button>\n\n\n\n    <ion-slides pager autoplay = "true" pager= "true" [options] ="extraOptions" *ngIf ="base64Image.lenght > 0 ">\n\n      <ion-slide *ngFor = "let image of base64Image">\n\n        <img [src]="image" />\n\n      </ion-slide>\n\n    </ion-slides>\n\n\n\n\n\n\n\n  </ion-content>\n\n'/*ion-inline-end:"C:\Users\Anwender\Ionic\chat\src\pages\home\home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 527:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(528);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(532);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 532:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(507);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(510);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_common_http__ = __webpack_require__(856);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_component__ = __webpack_require__(857);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_home_home__ = __webpack_require__(511);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_chat_chat__ = __webpack_require__(169);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_about_about__ = __webpack_require__(176);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_important_important__ = __webpack_require__(171);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_register_register__ = __webpack_require__(179);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_addtodo_addtodo__ = __webpack_require__(177);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_quotes_list_quotes_list__ = __webpack_require__(178);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_quotes_detail_quotes_detail__ = __webpack_require__(98);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_angularfire2__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_angularfire2_storage__ = __webpack_require__(867);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17_angularfire2_database__ = __webpack_require__(512);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18_angularfire2_firestore__ = __webpack_require__(871);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__providers_dataservice_dataservice__ = __webpack_require__(127);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





















// Initialize Firebase
var config = {
    apiKey: "AIzaSyBBrevlEQ70c4PapdyVRZ5tusJSHGNuZTA",
    authDomain: "test-project-d2fcc.firebaseapp.com",
    databaseURL: "https://test-project-d2fcc.firebaseio.com",
    projectId: "test-project-d2fcc",
    storageBucket: "test-project-d2fcc.appspot.com",
    messagingSenderId: "616288344012"
};
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_7__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_chat_chat__["a" /* ChatPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_about_about__["a" /* AboutPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_register_register__["a" /* RegisterPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_quotes_detail_quotes_detail__["a" /* QuotesDetailPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_quotes_list_quotes_list__["a" /* QuotesListPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_important_important__["a" /* ImportantPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_addtodo_addtodo__["a" /* AddtodoPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/about/about.module#AboutPageModule', name: 'AboutPage', segment: 'about', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/addtodo/addtodo.module#AddtodoPageModule', name: 'AddtodoPage', segment: 'addtodo', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/quotes-detail/quotes-detail.module#QuotesDetailPageModule', name: 'QuotesDetailPage', segment: 'quotes-detail', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/quotes-list/quotes-list.module#QuotesListPageModule', name: 'QuotesListPage', segment: 'quotes-list', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/register/register.module#RegisterPageModule', name: 'RegisterPage', segment: 'register', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_18_angularfire2_firestore__["a" /* AngularFirestoreModule */],
                __WEBPACK_IMPORTED_MODULE_15_angularfire2__["a" /* AngularFireModule */].initializeApp(config),
                __WEBPACK_IMPORTED_MODULE_16_angularfire2_storage__["a" /* AngularFireStorageModule */],
                __WEBPACK_IMPORTED_MODULE_17_angularfire2_database__["b" /* AngularFireDatabaseModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_common_http__["a" /* HttpClientModule */],
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_7__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_chat_chat__["a" /* ChatPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_about_about__["a" /* AboutPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_register_register__["a" /* RegisterPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_quotes_list_quotes_list__["a" /* QuotesListPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_quotes_detail_quotes_detail__["a" /* QuotesDetailPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_important_important__["a" /* ImportantPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_addtodo_addtodo__["a" /* AddtodoPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["j" /* Slides */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_17_angularfire2_database__["a" /* AngularFireDatabase */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_19__providers_dataservice_dataservice__["a" /* DataserviceProvider */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 857:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_native__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_status_bar__ = __webpack_require__(510);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_splash_screen__ = __webpack_require__(507);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_home_home__ = __webpack_require__(511);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_about_about__ = __webpack_require__(176);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_register_register__ = __webpack_require__(179);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_chat_chat__ = __webpack_require__(169);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_important_important__ = __webpack_require__(171);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_quotes_list_quotes_list__ = __webpack_require__(178);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_quotes_detail_quotes_detail__ = __webpack_require__(98);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};












var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_5__pages_home_home__["a" /* HomePage */];
        this.initializeApp();
        //used for ex of ngFor and nav
        this.pages = [
            { title: 'Home', icon: 'home', component: __WEBPACK_IMPORTED_MODULE_5__pages_home_home__["a" /* HomePage */] },
            { title: 'Chat', icon: 'star', component: __WEBPACK_IMPORTED_MODULE_8__pages_chat_chat__["a" /* ChatPage */] },
            { title: 'Register', icon: 'heart', component: __WEBPACK_IMPORTED_MODULE_7__pages_register_register__["a" /* RegisterPage */] },
            { title: 'About Us', icon: 'information-circle', component: __WEBPACK_IMPORTED_MODULE_6__pages_about_about__["a" /* AboutPage */] },
            { title: 'Tasks & Duties', icon: 'ios-clock', component: __WEBPACK_IMPORTED_MODULE_9__pages_important_important__["a" /* ImportantPage */] },
            { title: 'Quotes-Detail', icon: 'contact', component: __WEBPACK_IMPORTED_MODULE_11__pages_quotes_detail_quotes_detail__["a" /* QuotesDetailPage */] },
            { title: 'Quotes-List', icon: 'list-box', component: __WEBPACK_IMPORTED_MODULE_10__pages_quotes_list_quotes_list__["a" /* QuotesListPage */] }
        ];
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        //platf ready and plugins availab
        //here for any high level native process
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            __WEBPACK_IMPORTED_MODULE_2_ionic_native__["b" /* GoogleAnalytics */].startTrackerWithId("UA-120265140-1");
            __WEBPACK_IMPORTED_MODULE_2_ionic_native__["b" /* GoogleAnalytics */].enableUncaughtExceptionReporting(true).then(function (_success) {
                console.log("Successful enabling of uncaught exception reporting " +
                    _success);
            }).catch(function (_error) {
                console.log("error occured " + _error);
            });
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
        });
    };
    MyApp.prototype.openPage = function (page) {
        //reset content nav to just this page
        // no need back button to show in screen
        this.nav.setRoot(page.component);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"C:\Users\Anwender\Ionic\chat\src\app\app.html"*/'	<ion-menu [content] ="content">\n\n		<ion-header>\n\n			<ion-toolbar color = "primary">\n\n				<ion-title> Chatting Time </ion-title>\n\n			</ion-toolbar>\n\n		</ion-header>\n\n\n\n	<ion-content>\n\n		<ion-list>\n\n			<button color= "secondary" menuClose ion-item *ngFor = "let p of pages" (click)="openPage(p)" >\n\n				<ion-icon [name]="p.icon" item-left> </ion-icon>\n\n				 {{p.title}}\n\n			</button> \n\n		</ion-list>\n\n	</ion-content>\n\n\n\n</ion-menu>\n\n\n\n//Disable swipe to fo baCK cause poor UX combining STGB\n\n		<ion-nav [root]="rootPage" #content \n\n		swipeBackEnabled = "false"></ion-nav>'/*ion-inline-end:"C:\Users\Anwender\Ionic\chat\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 98:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return QuotesDetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_native__ = __webpack_require__(80);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the QuotesDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var QuotesDetailPage = /** @class */ (function () {
    function QuotesDetailPage(navCtrl, navParams, platform) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.platform = platform;
        this.quoteDetail = navParams.get("quote");
        platform.ready().then(function () {
            __WEBPACK_IMPORTED_MODULE_2_ionic_native__["b" /* GoogleAnalytics */].trackView("Quotes Detail");
        });
    }
    QuotesDetailPage.prototype.twitterShare = function () {
        console.log("in twitter share");
        var quote = this.quoteDetail.quote;
        var quoteAuthor = this.quoteDetail.author;
        __WEBPACK_IMPORTED_MODULE_2_ionic_native__["b" /* GoogleAnalytics */].trackEvent("Quotes", "Share", quoteAuthor, 1);
        __WEBPACK_IMPORTED_MODULE_2_ionic_native__["d" /* SocialSharing */].shareViaTwitter(quote.substring(0, 110) + "..", null /*Image*/, "http://ionicframework.com/img/homepage/ionicview-icon_2x.png")
            .then(function (data) {
            alert("Success " + data);
        }, function (err) {
            alert("failed" + err);
        });
    };
    QuotesDetailPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad QuotesDetailPage');
    };
    QuotesDetailPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-quotes-detail',template:/*ion-inline-start:"C:\Users\Anwender\Ionic\chat\src\pages\quotes-detail\quotes-detail.html"*/'<!--\n\n  Generated template for the QuotesDetailPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n\n\n	<ion-navbar color = "cool">\n\n		<button ion-button menuToggle>\n\n			<ion-icon name ="menu"> </ion-icon> </button>\n\n			<ion-title>Quotes Detail</ion-title>\n\n		</ion-navbar>\n\n\n\n	</ion-header>\n\n\n\n\n\n	<ion-content padding>\n\n		<h5> {{quoteDetail.quote}} </h5>\n\n		<h3> -  {{quoteDetail.author}} </h3>\n\n		<ion-item (click)= "twitterShare()">\n\n			<ion-icon name = "logo-twitter"> Share on Twitter </ion-icon>\n\n		</ion-item>\n\n		\n\n	</ion-content>\n\n'/*ion-inline-end:"C:\Users\Anwender\Ionic\chat\src\pages\quotes-detail\quotes-detail.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */]])
    ], QuotesDetailPage);
    return QuotesDetailPage;
}());

//# sourceMappingURL=quotes-detail.js.map

/***/ })

},[527]);
//# sourceMappingURL=main.js.map