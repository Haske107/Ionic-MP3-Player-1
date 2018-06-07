webpackJsonp([1],{

/***/ 149:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TracksPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_network__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_audio_player__ = __webpack_require__(150);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__track_track__ = __webpack_require__(350);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var TracksPage = (function () {
    function TracksPage(networkService, navCtrl, navParams, audioPlayerService) {
        // console.log( this.networkService.connected );
        this.networkService = networkService;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.audioPlayerService = audioPlayerService;
        this.artist = this.navParams.get('artist');
        console.log(this.artist);
    }
    TracksPage.prototype.onPlayTrack = function (this_track) {
        var _this = this;
        this.prevTrack = (this_track.id === 0) ? this.getTrackById(this.artist.tracks.length - 1) : this.getTrackById(this_track.id - 1);
        this.nextTrack = ((this_track.id + 1) === this.artist.tracks.length) ? this.getTrackById(0) : this.getTrackById(this_track.id + 1);
        this.audioPlayerService.playTrack(this_track).then(function (response) {
            if (response === "repeat") {
                _this.onPlayTrack(this_track);
            }
            else if (response === "play_next") {
                _this.onPlayTrack(_this.nextTrack);
            }
        }).catch(function (err) {
            console.error(err);
        });
    };
    TracksPage.prototype.onResumeTrack = function () {
        this.audioPlayerService.resumeTrack();
    };
    TracksPage.prototype.onPauseTrack = function () {
        this.audioPlayerService.pauseTrack();
    };
    TracksPage.prototype.onGoToTrack = function (this_track, this_play_next) {
        this.prevTrack = (this_track.id === 0) ? this.getTrackById(this.artist.tracks.length - 1) : this.getTrackById(this_track.id - 1);
        this.nextTrack = ((this_track.id + 1) === this.artist.tracks.length) ? this.getTrackById(0) : this.getTrackById(this_track.id + 1);
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__track_track__["a" /* TrackPage */], {
            artist: this.artist, track: this_track,
            // pins: this.artist.pins,
            prevTrack: this.prevTrack, nextTrack: this.nextTrack,
            play_next: this_play_next,
        });
    };
    TracksPage.prototype.getTrackById = function (track_id) {
        var this_track;
        this.artist.tracks.forEach(function (track) {
            if (track.id === track_id) {
                this_track = track;
                // console.log(track);
                // alert("found");
            }
        });
        return this_track;
    };
    TracksPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-tracks',template:/*ion-inline-start:"/Users/justinestrada/Sites/ionic-audio-player/src/pages/tracks/tracks.html"*/'<ion-header>\n\n  <ion-navbar>\n    <ion-title>{{ artist.name }}</ion-title>\n  </ion-navbar>\n\n</ion-header>\n<ion-content no-padding [class.trackSelected]="audioPlayerService.selectedTrack" >\n  <ion-grid>\n\n    <!-- <ion-row style="margin-left: -8px; margin-right: -8px; margin-top: -8px;">\n      <ion-col>\n        <img src="https://firebasestorage.googleapis.com/v0/b/audio-guide-b67da.appspot.com/o/Uffizi_Gallery_Florence_2.jpg?alt=media&token=2670cdde-7b55-48c2-b0f6-e94e54c605f3" style="width: 100%;" alt="Uffizi Gallery" />\n      </ion-col>\n    </ion-row> -->\n\n    <ion-row *ngIf="!networkService.connected" padding>\n      <ion-col>\n        <h3>Error</h3>\n        <p>Threre was an error processing that request. Please pull down to refresh, or check your network connection settings.</p>\n      </ion-col>\n    </ion-row>\n\n    <ion-row *ngIf="networkService.connected" padding>\n      <ion-col col-12>\n          <ion-list>\n          <ion-item-divider>Tracks</ion-item-divider>\n            <ion-item *ngFor="let track of artist.tracks">\n              <button ion-button item-start (click)="onPlayTrack(track)" clear >\n                <ion-icon *ngIf="!track.playing" name="ios-play" color="primary" ></ion-icon>\n                <ion-spinner *ngIf="track.playing" name="bubbles" color="primary" ></ion-spinner>\n              </button>\n              <h3 (click)="onPlayTrack(track)" text-wrap>{{ track.title }}</h3>\n              <p (click)="onPlayTrack(track)" >{{ track.artist }}</p>\n              <ion-icon item-end name="ios-information-circle" (click)="onGoToTrack(track, false)" color="primary" ></ion-icon>\n            </ion-item>\n          </ion-list>\n      </ion-col>\n    </ion-row>\n\n  </ion-grid>\n</ion-content>\n<ng-container *ngIf="networkService.connected" >\n  <ion-footer *ngIf="audioPlayerService.selectedTrack" style="background: #fff;" no-padding>\n    <ion-grid>\n      <ion-row class="footer-player-first-row">\n        <ion-col col-2 text-center>\n          <button ion-button clear (click)="onPlayTrack(prevTrack)" ><ion-icon name="ios-skip-backward" color="primary"></ion-icon></button>\n        </ion-col>\n        <ion-col col-2 text-center>\n          <button ion-button color="primary" class="footer-player-play-btn" *ngIf="!audioPlayerService.selectedTrack.playing" (click)="onResumeTrack()" >\n            <ion-icon name="ios-play" color="white"></ion-icon>\n          </button>\n          <button ion-button color="primary" class="footer-player-pause-btn" *ngIf="audioPlayerService.selectedTrack.playing" (click)="onPauseTrack()" >\n            <ion-icon name="ios-pause" color="white"></ion-icon>\n          </button>\n        </ion-col>\n        <ion-col col-6 text-left>\n            <h3 class="footer-player-title ellipsis" (click)="onGoToTrack(audioPlayerService.selectedTrack, false)" >{{ audioPlayerService.selectedTrack.title }}</h3>\n            <p class="footer-player-artist ellipsis" (click)="onGoToTrack(audioPlayerService.selectedTrack, false)" >{{ audioPlayerService.selectedTrack.artist }}</p>\n          <!-- <button ion-button clear (click)="onGoToTrack(audioPlayerService.selectedTrack, false)" >\n          </button> -->\n        </ion-col>\n        <ion-col col-2 text-center>\n          <button ion-button clear (click)="onPlayTrack(nextTrack)" ><ion-icon name="ios-skip-forward" color="primary"></ion-icon></button>\n        </ion-col>\n      </ion-row>\n      <ion-row class="footer-player-second-row">\n        <ion-col col-12 class="footer-player-progress-col">\n            <progress-bar [progress]="audioPlayerService.selectedTrack.progress"></progress-bar>\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n  </ion-footer>\n</ng-container>\n'/*ion-inline-end:"/Users/justinestrada/Sites/ionic-audio-player/src/pages/tracks/tracks.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__services_network__["a" /* NetworkService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__services_audio_player__["a" /* AudioPlayerService */]])
    ], TracksPage);
    return TracksPage;
}());

//# sourceMappingURL=tracks.js.map

/***/ }),

/***/ 150:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AudioPlayerService; });
var AudioPlayerService = (function () {
    function AudioPlayerService() {
        this.audioPlayer = [];
        this.repeatTrack = false;
    }
    AudioPlayerService.prototype.toggleRepeat = function () {
        this.repeatTrack = !this.repeatTrack;
    };
    AudioPlayerService.prototype.playTrack = function (track) {
        var _this = this;
        this.stopAllTracks();
        this.selectedTrack = track;
        this.audio = new Audio(this.selectedTrack.src);
        this.audioPlayer.push(this.audio);
        this.audioPlayer[0].play();
        this.selectedTrack.playing = true;
        return new Promise(function (resolve, reject) {
            _this.calculateTrackProgress().then(function (track_finished) {
                if (_this.repeatTrack) {
                    resolve("repeat");
                }
                else {
                    resolve("play_next");
                }
            }).catch(function (err) {
                console.error(err);
                reject(err);
            });
        });
    };
    AudioPlayerService.prototype.resumeTrack = function () {
        this.audioPlayer[0].play();
        this.selectedTrack.playing = true;
        this.calculateTrackProgress();
    };
    AudioPlayerService.prototype.calculateTrackProgress = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.progressInterval = setInterval(function () {
                if (_this.audioPlayer[0].currentTime < _this.audioPlayer[0].duration) {
                    _this.selectedTrack.progress = (_this.audioPlayer[0].currentTime / _this.audioPlayer[0].duration) * 100;
                }
                else if (_this.audioPlayer[0].currentTime >= _this.audioPlayer[0].duration) {
                    // alert('true')
                    _this.selectedTrack.playing = false;
                    _this.selectedTrack.progress = 0;
                    clearInterval(_this.progressInterval);
                    resolve(true);
                }
                // console.log( this.selectedTrack.progress );
            }, 250); // .25 secs
        });
    };
    AudioPlayerService.prototype.pauseTrack = function () {
        this.audioPlayer[0].pause();
        this.selectedTrack.playing = false;
        clearInterval(this.progressInterval);
    };
    AudioPlayerService.prototype.rewind = function () {
        // this.audio.playbackRate = -2.0;    
    };
    AudioPlayerService.prototype.fastFwd = function () {
        this.audio.playbackRate = 2.0;
    };
    AudioPlayerService.prototype.skipTo = function (percent_to_skip_to) {
        var new_current_time = percent_to_skip_to * this.audioPlayer[0].duration;
        this.audioPlayer[0].currentTime = new_current_time;
        this.selectedTrack.progress = (this.audioPlayer[0].currentTime / this.audioPlayer[0].duration) * 100;
    };
    AudioPlayerService.prototype.stopAllTracks = function () {
        if (this.selectedTrack !== undefined) {
            this.selectedTrack.playing = false;
        }
        if (this.audioPlayer[0] !== undefined) {
            this.audioPlayer[0].pause();
            clearInterval(this.progressInterval);
        }
        this.audioPlayer = [];
    };
    return AudioPlayerService;
}());

//# sourceMappingURL=audio-player.js.map

/***/ }),

/***/ 151:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingsPage; });
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
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SettingsPage = (function () {
    function SettingsPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    SettingsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SettingsPage');
    };
    SettingsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-settings',template:/*ion-inline-start:"/Users/justinestrada/Sites/ionic-audio-player/src/pages/settings/settings.html"*/'<ion-header>\n\n  <ion-navbar>\n    <ion-buttons start>\n      <button ion-button icon-only\n        menuToggle >\n        <ion-icon name="menu"></ion-icon>\n      </button>\n    </ion-buttons>\n    <ion-title>Settings</ion-title>\n  </ion-navbar>\n\n</ion-header>\n<ion-content padding>\n  <ion-grid>\n\n    <ion-row>\n      <ion-col>\n        <ion-list>\n          <ion-item>\n            <ion-label floating>Language</ion-label>\n            <ion-select interface="popover">\n              <ion-option>English</ion-option>\n              <ion-option>Spanish</ion-option>\n              <ion-option>Japanese</ion-option>\n              <ion-option>Chinese</ion-option>\n            </ion-select>\n          </ion-item>\n          <ion-item></ion-item>\n        </ion-list>\n      </ion-col>\n    </ion-row>\n    \n  </ion-grid>\n</ion-content>\n'/*ion-inline-end:"/Users/justinestrada/Sites/ionic-audio-player/src/pages/settings/settings.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */]])
    ], SettingsPage);
    return SettingsPage;
}());

//# sourceMappingURL=settings.js.map

/***/ }),

/***/ 164:
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
webpackEmptyAsyncContext.id = 164;

/***/ }),

/***/ 210:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/settings/settings.module": [
		686,
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
webpackAsyncContext.id = 210;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 255:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ArtistsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_data__ = __webpack_require__(256);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__tracks_tracks__ = __webpack_require__(149);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ArtistsPage = (function () {
    function ArtistsPage(navCtrl, navParams, dataService, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.dataService = dataService;
        this.loadingCtrl = loadingCtrl;
        this.artists = [];
        this.allArtists = [];
        this.showSearch = false;
    }
    ArtistsPage.prototype.ionViewDidLoad = function () {
        this.getArtists();
    };
    ArtistsPage.prototype.getArtists = function () {
        var _this = this;
        this.onLoading('Loading Artists...');
        this.dataService.fetchArtists().subscribe(function (this_data) {
            // if ( this_data !== null) {
            _this.artists = this_data;
            _this.allArtists = this_data;
            console.log(_this.artists);
            // }
            _this.loading.dismiss();
        });
    };
    ArtistsPage.prototype.onLoading = function (message) {
        this.loading = this.loadingCtrl.create({
            content: message
        });
        this.loading.present();
    };
    // onSortUsers( asc: boolean ) {
    //   this.users.sort( (a, b) => {
    //     if ( a.username === undefined ) {
    //       a.username = "New User";
    //     }
    //     if ( b.username === undefined ) {
    //       b.username = "New User";
    //     }
    //     return ( a.username.toLowerCase() > b.username.toLowerCase() ) ? 1: -1;
    //   });
    //   this.filterableCopyOfUsers = this.users;
    //   // console.log( this.users );
    //   console.log('loaded users');
    // }
    ArtistsPage.prototype.onFilterUsers = function () {
        var _this = this;
        this.artists = this.allArtists.filter(function (artist) {
            return (artist.name.toLowerCase().indexOf(_this.searchQuery.toLowerCase()) > -1) ? true : false;
        });
    };
    ArtistsPage.prototype.onCancelSearch = function () {
        if (this.searchQuery !== "") {
            this.searchQuery = "";
            this.onFilterUsers();
        }
        this.showSearch = false;
    };
    ArtistsPage.prototype.onGoToTracks = function (this_artist) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__tracks_tracks__["a" /* TracksPage */], { artist: this_artist });
    };
    ArtistsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-artists',template:/*ion-inline-start:"/Users/justinestrada/Sites/ionic-audio-player/src/pages/artists/artists.html"*/'<ion-header>\n\n  <ion-navbar>\n    <ion-buttons start>\n      <button ion-button icon-only\n        menuToggle >\n        <ion-icon name="menu" color="white" ></ion-icon>\n      </button>\n    </ion-buttons>\n    <ion-title *ngIf="!showSearch" color="white" >Music Library</ion-title>\n    <ion-buttons end>\n      <button ion-button icon-only (click)="showSearch = !showSearch" >\n        <ion-icon name="ios-search-outline"></ion-icon>\n      </button>\n    </ion-buttons>    \n    <ion-searchbar *ngIf="showSearch" [(ngModel)]="searchQuery" (ionInput)="onFilterUsers()" [showCancelButton]="true" (ionCancel)="onCancelSearch()"\n      placeholder="Search Artists..." class="artists-searchbar" >\n    </ion-searchbar>\n  </ion-navbar>\n\n</ion-header>\n<ion-content padding>\n  <ion-grid>\n    <!-- <ion-row>\n      <ion-col no-padding>\n        <img src="https://firebasestorage.googleapis.com/v0/b/audio-guide-b67da.appspot.com/o/Uffizi_Gallery_Florence_1.jpg?alt=media&token=658a541f-9896-4109-b919-c063f4c01723" style="width: 100%;" alt="Uffizi Gallery" />\n      </ion-col>\n    </ion-row> -->\n    <ion-row no-padding>\n      <ion-col>\n        <!-- <h3>Select an artist to listen to.</h3> -->\n        <ion-list>\n          <ion-item-divider>Artists</ion-item-divider>\n          <button ion-item *ngFor="let artist of artists"\n            (click)="onGoToTracks(artist)">\n            <ion-icon name="ios-musical-note-outline" item-start></ion-icon>\n            <h3>{{ artist.name }}</h3>\n          </button>\n        </ion-list>\n      </ion-col>\n    </ion-row>\n    <!-- <ion-row>\n      <ion-col>\n        <a ion-button block href="http://www.uffizi.com/online-ticket-booking-uffizi-gallery.asp" target="_blank" title="Buy Tickets Uffizi Gallery">Buy Tickets</a>\n      </ion-col>\n    </ion-row> -->\n  </ion-grid>\n</ion-content>\n'/*ion-inline-end:"/Users/justinestrada/Sites/ionic-audio-player/src/pages/artists/artists.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__services_data__["a" /* DataService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* LoadingController */]])
    ], ArtistsPage);
    return ArtistsPage;
}());

//# sourceMappingURL=artists.js.map

/***/ }),

/***/ 256:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DataService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(165);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__ = __webpack_require__(402);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



// import { AuthService } from './auth';
var DataService = (function () {
    function DataService(http) {
        this.http = http;
    }
    DataService.prototype.fetchExhibits = function () {
        var endpoint = 'https://audio-guide-b67da.firebaseio.com/exhibits.json';
        // let endpoint: string = 'https://jsonplaceholder.typicode.com/users/' + exhibitId;
        // .do() runs on the result of an observable
        return this.http.get(endpoint)
            .map(function (response) {
            // console.log( response.json() );
            return response.json();
        });
    };
    DataService.prototype.fetchBuildings = function () {
        var endpoint = 'https://audio-guide-b67da.firebaseio.com/exhibits/0/buildings.json';
        return this.http.get(endpoint)
            .map(function (response) {
            return response.json();
        });
        // .catch( (error) => {
        //   console.error(error);
        //   return error;
        // });
    };
    DataService.prototype.fetchArtists = function () {
        var endpoint = 'https://ionic-audio-player.firebaseio.com/artists.json';
        return this.http.get(endpoint)
            .map(function (response) {
            return response.json();
        });
    };
    DataService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]])
    ], DataService);
    return DataService;
}());

//# sourceMappingURL=data.js.map

/***/ }),

/***/ 349:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ToastService; });
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


var ToastService = (function () {
    function ToastService(toastCtrl) {
        this.toastCtrl = toastCtrl;
    }
    ToastService.prototype.showBasicToast = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'bottom'
        });
        toast.onDidDismiss(function () {
            // console.log('Dismissed toast');
        });
        toast.present();
    };
    ToastService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ToastController */]])
    ], ToastService);
    return ToastService;
}());

//# sourceMappingURL=toast.js.map

/***/ }),

/***/ 350:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TrackPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_network__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_audio_player__ = __webpack_require__(150);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__manage_track_manage_track__ = __webpack_require__(351);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var TrackPage = (function () {
    function TrackPage(networkService, navCtrl, navParams, audioPlayerService, popoverCtrl, modalCtrl) {
        this.networkService = networkService;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.audioPlayerService = audioPlayerService;
        this.popoverCtrl = popoverCtrl;
        this.modalCtrl = modalCtrl;
        // private repeat: boolean = false;
        this.shuffle = false;
        this.artist = this.navParams.get('artist');
        this.track = this.navParams.get('track');
        // this.pins = this.navParams.get('pins');
        this.prevTrack = this.navParams.get('prevTrack');
        this.nextTrack = this.navParams.get('nextTrack');
        // this.locatePin( this.track.id );
        if (this.navParams.get('play_track')) {
            this.onPlayTrack(this.track);
        }
    }
    TrackPage_1 = TrackPage;
    TrackPage.prototype.ionViewDidLoad = function () {
    };
    // locatePin( track_id: number ) {
    //   this.pins.forEach( (pin) => {
    //     if (pin.id === track_id) {
    //       this.locatedPin = pin;
    //     }
    //   });
    // }
    TrackPage.prototype.presentPopover = function (myEvent) {
        var popover = this.popoverCtrl.create(__WEBPACK_IMPORTED_MODULE_4__manage_track_manage_track__["a" /* ManageTrack */]);
        popover.present({
            ev: myEvent
        });
    };
    TrackPage.prototype.precisionRound = function (number, precision) {
        var factor = Math.pow(10, precision);
        return Math.round(number * factor) / factor;
    };
    TrackPage.prototype.convertToHHMMSS = function (these_seconds) {
        var sec_num = parseInt(these_seconds, 10); // don't forget the second param
        var hours = Math.floor(sec_num / 3600);
        var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
        var seconds = sec_num - (hours * 3600) - (minutes * 60);
        var seconds_str = "";
        var minutes_str = "";
        var hours_str = "";
        seconds_str = (seconds < 10) ? "0" + seconds : seconds.toString();
        minutes_str = (minutes < 10) ? "0" + minutes : minutes.toString();
        hours_str = (hours < 10) ? "0" + hours : hours.toString();
        if (hours === 0) {
            return minutes_str + ':' + seconds_str;
        }
        else {
            return hours_str + ':' + minutes_str + ':' + seconds_str;
        }
    };
    TrackPage.prototype.onSkipTo = function (event) {
        // console.log( event );
        console.log(event.skip_to);
        this.audioPlayerService.skipTo(event.skip_to);
    };
    // onToggleRepeat() {
    //   this.repeat = !this.repeat;
    // }
    TrackPage.prototype.onToggleShuffle = function () {
        this.shuffle = !this.shuffle;
    };
    TrackPage.prototype.onPlayTrack = function (this_track) {
        var _this = this;
        this.audioPlayerService.playTrack(this_track).then(function (response) {
            if (response === "repeat") {
                _this.onPlayTrack(this_track);
            }
            else if (response === "play_next") {
                _this.onGoToTrack(_this.nextTrack, true);
            }
        }).catch(function (err) {
            console.error(err);
        });
    };
    TrackPage.prototype.onResumeTrack = function () {
        this.audioPlayerService.resumeTrack();
    };
    TrackPage.prototype.onPauseTrack = function () {
        this.audioPlayerService.pauseTrack();
    };
    TrackPage.prototype.onGoToTrack = function (this_track, this_play_track) {
        this.prevTrack = (this_track.id === 0) ? this.getTrackById(this.artist.tracks.length - 1) : this.getTrackById(this_track.id - 1);
        this.nextTrack = ((this_track.id + 1) === this.artist.tracks.length) ? this.getTrackById(0) : this.getTrackById(this_track.id + 1);
        this.navCtrl.push(TrackPage_1, {
            artist: this.artist,
            track: this_track,
            // pins: this.artist.pins,
            prevTrack: this.prevTrack,
            nextTrack: this.nextTrack,
            play_track: this_play_track,
        });
    };
    TrackPage.prototype.onRewind = function () {
        this.audioPlayerService.rewind();
    };
    TrackPage.prototype.onFastFwd = function () {
        this.audioPlayerService.fastFwd();
    };
    TrackPage.prototype.getTrackById = function (track_id) {
        var this_track;
        this.artist.tracks.forEach(function (track) {
            if (track.id === track_id) {
                this_track = track;
                // console.log(track);
                // alert("found");
            }
        });
        return this_track;
    };
    TrackPage.prototype.onShowInfo = function () {
        // let modalDetails = {
        //   track: this.track,
        // };
        // const modal = this.modalCtrl.create(ModalTrackComponent, modalDetails, {cssClass: 'modal-track'});
        // modal.present();
        // modal.onDidDismiss((response) => {
        //   if (response != null) {
        //     console.log("Response", response);
        //   }
        // }); 
        alert('test');
    };
    TrackPage.prototype.onGoBack = function () {
        this.navCtrl.pop();
    };
    TrackPage = TrackPage_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-track',template:/*ion-inline-start:"/Users/justinestrada/Sites/ionic-audio-player/src/pages/tracks/track/track.html"*/'<ion-header>\n\n  <ion-navbar>\n    <ion-title>{{ track.title }}</ion-title>\n    <ion-buttons end>\n      <button ion-button icon-only (click)="presentPopover($event)" >\n        <ion-icon name="md-more"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n\n</ion-header>\n<ion-content no-padding [class.trackSelected]="audioPlayerService.selectedTrack && audioPlayerService.selectedTrack === track" >\n  <div [style.backgroundImage]="\'url(\'+ track.img +\')\'" class="track-img-bg"></div>\n  <ion-grid>\n\n    <ion-row *ngIf="!networkService.connected" padding>\n      <ion-col>\n        <h3>Error</h3>\n        <p>Threre was an error processing that request. Please pull down to refresh, or check your network connection settings.</p>\n      </ion-col>\n    </ion-row>\n\n    <ng-container *ngIf="networkService.connected" >\n      <div class="track-img-wrapper" >\n        <img [src]="track.img" class="track-img" [alt]="track.title" />\n      </div>\n\n      <!-- <ion-fab top right *ngIf="!audioPlayerService.selectedTrack || audioPlayerService.selectedTrack !== track" class="track-play-fab" >\n        <button ion-fab (click)="onPlayTrack(track)" >\n        <ion-icon name="ios-play"></ion-icon>\n        </button>\n      </ion-fab> -->\n\n    </ng-container>\n\n  </ion-grid>\n</ion-content>\n<ion-footer no-padding>\n  <div class="track-player-wrapper">\n    <ion-row class="track-player-row" *ngIf="audioPlayerService.selectedTrack === track">\n      <ion-col col-12>\n          <progress-bar [progress]="audioPlayerService.selectedTrack.progress" (skipTo)="onSkipTo($event)" ></progress-bar>\n      </ion-col>\n    </ion-row>\n    <ion-row class="track-player-row" *ngIf="audioPlayerService.selectedTrack === track">\n      <ion-col col-6 no-padding>\n          <p style="margin: 0; color: white;">{{ convertToHHMMSS(audioPlayerService.audioPlayer[0].currentTime) }}</p>\n      </ion-col>\n      <ion-col col-6 text-right no-padding>\n          <p style="margin: 0; color: white;">{{ convertToHHMMSS(audioPlayerService.audioPlayer[0].duration) }}</p>\n      </ion-col>\n    </ion-row>\n\n    <ion-row class="track-player-row track-player-top-btns-row" >\n      <ion-col col-4 text-center>\n        <button ion-button clear class="track-btn" [class.active]="audioPlayerService.repeatTrack" (tap)="audioPlayerService.toggleRepeat()" >\n          <ion-icon name="ios-repeat" color="white"></ion-icon>\n        </button>            \n      </ion-col>\n      <ion-col offset-4 col-4 text-center>\n        <button ion-button clear class="track-btn" [class.active]="shuffle" (tap)="onToggleShuffle()" >\n          <ion-icon name="ios-shuffle" color="white"></ion-icon>\n        </button>            \n      </ion-col>\n    </ion-row>\n\n    <ion-row class="track-player-row" style="margin-bottom: 16px;">\n      <ion-col col-5 text-center style="padding-right: 0;" >\n         <!-- [disabled]=""  -->\n        <button ion-button clear class="track-prev-btn" (click)="onGoToTrack(prevTrack, true)" (press)="onRewind()" >\n          <ion-icon name="ios-skip-backward" color="white"></ion-icon>\n        </button>\n      </ion-col>\n      <ion-col col-2 text-center no-padding>\n        <button ion-button class="track-play-btn" *ngIf="audioPlayerService.selectedTrack !== track" (click)="onPlayTrack(track)" >\n          <ion-icon name="ios-play" color="primary"></ion-icon>\n        </button>\n        <ng-container *ngIf="audioPlayerService.selectedTrack === track">\n          <button ion-button class="track-play-btn" *ngIf="!audioPlayerService.selectedTrack.playing" (click)="onResumeTrack()" >\n            <ion-icon name="ios-play" color="primary"></ion-icon>\n          </button>\n          <button ion-button class="track-play-btn" *ngIf="audioPlayerService.selectedTrack.playing" (click)="onPauseTrack()" >\n            <ion-icon name="ios-pause" color="primary"></ion-icon>\n          </button>            \n        </ng-container>\n      </ion-col>\n      <ion-col col-5 text-center style="padding-left: 0;" >\n        <button ion-button clear class="track-next-btn" (click)="onGoToTrack(nextTrack, true)" (press)="onFastFwd()" >\n          <ion-icon name="ios-skip-forward" color="white"></ion-icon>\n        </button>\n      </ion-col>\n    </ion-row>\n\n    <ion-row class="track-player-row track-player-bottom-btns-row">\n      <ion-col col-4 text-center>\n        <button ion-button clear class="track-btn" (click)="onShowInfo()" >\n          <ion-icon name="ios-information-outline" color="white"></ion-icon>\n        </button>            \n      </ion-col>\n      <ion-col offset-4 col-4 text-center>\n        <button ion-button clear class="track-btn" (click)="onGoBack()" >\n          <ion-icon name="ios-list-box-outline" color="white"></ion-icon>\n        </button>            \n      </ion-col>\n    </ion-row>\n  </div>\n</ion-footer>\n\n'/*ion-inline-end:"/Users/justinestrada/Sites/ionic-audio-player/src/pages/tracks/track/track.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__services_network__["a" /* NetworkService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__services_audio_player__["a" /* AudioPlayerService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* PopoverController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* ModalController */]])
    ], TrackPage);
    return TrackPage;
    var TrackPage_1;
}());

//# sourceMappingURL=track.js.map

/***/ }),

/***/ 351:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ManageTrack; });
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


var ManageTrack = (function () {
    function ManageTrack(viewCtrl) {
        this.viewCtrl = viewCtrl;
    }
    ManageTrack.prototype.close = function () {
        this.viewCtrl.dismiss();
    };
    ManageTrack = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            template: "\n    <ion-list style=\"margin-bottom: 0;\">\n      <button ion-item (click)=\"close()\">Add to playlist</button>\n    </ion-list>\n  "
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ViewController */]])
    ], ManageTrack);
    return ManageTrack;
}());

//# sourceMappingURL=manage-track.js.map

/***/ }),

/***/ 352:
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


var AboutPage = (function () {
    function AboutPage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    AboutPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-about',template:/*ion-inline-start:"/Users/justinestrada/Sites/ionic-audio-player/src/pages/about/about.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-buttons start>\n      <button ion-button icon-only\n        menuToggle >\n        <ion-icon name="menu"></ion-icon>\n      </button>\n    </ion-buttons>\n    <ion-title>About Audio Guide</ion-title>\n  </ion-navbar>\n</ion-header>\n<ion-content padding>\n  <ion-grid>\n    <ion-row>\n      <ion-col col-12>\n        <accordion name="About" >\n          <p>About this awesome app.</p>\n          <p style="margin-bottom: 0;">This app is perfect for muscicians, radio stations, music labels and anyone who wants to provide an app for their music to people on Google Play or Apple Store.</p>\n        </accordion>\n        <ion-list>\n          <ion-item-divider>Version</ion-item-divider>\n          <ion-item>\n            <ion-icon name="md-git-commit" item-right></ion-icon>\n            <p>V 1.0</p>\n          </ion-item>\n          <ion-item-divider>This app is sponsored by:</ion-item-divider>\n          <ion-item>\n            <a href="https://mydigitalsauce.com/" title="MyDigitalSauce" target="_blank">MyDigitalSauce</a>\n              <ion-thumbnail item-right>\n                  <ion-img src="https://mydigitalsauce.com/wp-content/themes/mydigitalsauce/img/icon/code-brackets-sauce-bottle.svg" alt="MyDigitalSauce" ></ion-img>\n              </ion-thumbnail>\n          </ion-item>\n        </ion-list>\n      </ion-col>\n      <ion-col>\n\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n</ion-content>\n'/*ion-inline-end:"/Users/justinestrada/Sites/ionic-audio-player/src/pages/about/about.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */]])
    ], AboutPage);
    return AboutPage;
}());

//# sourceMappingURL=about.js.map

/***/ }),

/***/ 353:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(354);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(358);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 358:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(165);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_component__ = __webpack_require__(395);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_tabs_tabs__ = __webpack_require__(682);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_artists_artists__ = __webpack_require__(255);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_tracks_tracks__ = __webpack_require__(149);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_tracks_track_track__ = __webpack_require__(350);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_tracks_track_manage_track_manage_track__ = __webpack_require__(351);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_about_about__ = __webpack_require__(352);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_settings_settings__ = __webpack_require__(151);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__components_accordion_accordion__ = __webpack_require__(683);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__components_progress_bar_progress_bar__ = __webpack_require__(684);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__components_modal_track_modal_track__ = __webpack_require__(685);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__services_network__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__services_data__ = __webpack_require__(256);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__services_audio_player__ = __webpack_require__(150);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__services_toast__ = __webpack_require__(349);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__ionic_native_status_bar__ = __webpack_require__(250);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__ionic_native_splash_screen__ = __webpack_require__(254);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__ionic_native_network__ = __webpack_require__(348);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






















var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_5__pages_tabs_tabs__["a" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_artists_artists__["a" /* ArtistsPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_tracks_tracks__["a" /* TracksPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_tracks_track_track__["a" /* TrackPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_tracks_track_manage_track_manage_track__["a" /* ManageTrack */],
                __WEBPACK_IMPORTED_MODULE_10__pages_about_about__["a" /* AboutPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_settings_settings__["a" /* SettingsPage */],
                __WEBPACK_IMPORTED_MODULE_12__components_accordion_accordion__["a" /* AccordionComponent */],
                __WEBPACK_IMPORTED_MODULE_13__components_progress_bar_progress_bar__["a" /* ProgressBarComponent */],
                __WEBPACK_IMPORTED_MODULE_14__components_modal_track_modal_track__["a" /* ModalTrackComponent */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["c" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/settings/settings.module#SettingsPageModule', name: 'SettingsPage', segment: 'settings', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* HttpModule */],
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["a" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_5__pages_tabs_tabs__["a" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_artists_artists__["a" /* ArtistsPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_tracks_tracks__["a" /* TracksPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_tracks_track_track__["a" /* TrackPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_tracks_track_manage_track_manage_track__["a" /* ManageTrack */],
                __WEBPACK_IMPORTED_MODULE_10__pages_about_about__["a" /* AboutPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_settings_settings__["a" /* SettingsPage */],
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_15__services_network__["a" /* NetworkService */],
                __WEBPACK_IMPORTED_MODULE_21__ionic_native_network__["a" /* Network */],
                __WEBPACK_IMPORTED_MODULE_16__services_data__["a" /* DataService */],
                __WEBPACK_IMPORTED_MODULE_17__services_audio_player__["a" /* AudioPlayerService */],
                __WEBPACK_IMPORTED_MODULE_18__services_toast__["a" /* ToastService */],
                __WEBPACK_IMPORTED_MODULE_19__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_20__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["b" /* IonicErrorHandler */] }
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 395:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(250);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(254);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_artists_artists__ = __webpack_require__(255);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_about_about__ = __webpack_require__(352);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_settings_settings__ = __webpack_require__(151);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__services_network__ = __webpack_require__(82);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





// import { TracksPage } from '../pages/tracks/tracks';



var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen, menuCtrl, networkService) {
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.menuCtrl = menuCtrl;
        this.networkService = networkService;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_artists_artists__["a" /* ArtistsPage */];
        this.aboutPage = __WEBPACK_IMPORTED_MODULE_5__pages_about_about__["a" /* AboutPage */];
        this.settingsPage = __WEBPACK_IMPORTED_MODULE_6__pages_settings_settings__["a" /* SettingsPage */];
        this.initializeApp();
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.statusBar.styleDefault();
            _this.statusBar.backgroundColorByHexString('#488aff');
            _this.splashScreen.hide();
            _this.networkService.onWatchNetworkConnection();
        });
    };
    MyApp.prototype.onGoTo = function (page) {
        this.activePage = page;
        this.nav.setRoot(page);
        // this.nav.setRoot(this.rootPage);
        // this.nav.setPages( [ page ] );
        this.menuCtrl.close();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('nav'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/Users/justinestrada/Sites/ionic-audio-player/src/app/app.html"*/'<ion-menu [content]="nav">\n  <ion-header>\n    <ion-toolbar>\n      <ion-title>Menu</ion-title>\n    </ion-toolbar>\n  </ion-header>\n  <ion-content>\n    <ion-list class="sidebar-ion-list">\n      <button ion-item icon-left\n        (click)="onGoTo(rootPage)" >\n        <ion-icon name="ios-headset"></ion-icon>\n        Music Library\n      </button>\n      <button ion-item icon-left\n        (click)="onGoTo(aboutPage)" >\n        <ion-icon name="ios-information-circle-outline"></ion-icon>\n        About\n      </button>\n      <!-- <button ion-item icon-left\n        (click)="onGoTo(exhibitPage)" >\n        <ion-icon name="ios-home"></ion-icon>\n        Uffizi Gallery\n      </button> -->\n      <button ion-item icon-left\n        (click)="onGoTo(settingsPage)" >\n        <ion-icon name="ios-settings"></ion-icon>\n        Settings\n      </button>\n    </ion-list>\n  </ion-content>\n</ion-menu>\n<ion-nav [root]="rootPage" #nav swipeBackEnabled="false"></ion-nav>\n'/*ion-inline-end:"/Users/justinestrada/Sites/ionic-audio-player/src/app/app.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* MenuController */],
            __WEBPACK_IMPORTED_MODULE_7__services_network__["a" /* NetworkService */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 682:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__tracks_tracks__ = __webpack_require__(149);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var TabsPage = (function () {
    function TabsPage() {
        this.tracksRoot = __WEBPACK_IMPORTED_MODULE_1__tracks_tracks__["a" /* TracksPage */];
    }
    TabsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/Users/justinestrada/Sites/ionic-audio-player/src/pages/tabs/tabs.html"*/'<ion-tabs>\n  <ion-tab [root]="roomsRoot" tabTitle="Rooms" tabIcon="ios-home"></ion-tab>\n  <ion-tab [root]="tracksRoot" tabTitle="Tracks" tabIcon="ios-map"></ion-tab>\n</ion-tabs>\n'/*ion-inline-end:"/Users/justinestrada/Sites/ionic-audio-player/src/pages/tabs/tabs.html"*/
        }),
        __metadata("design:paramtypes", [])
    ], TabsPage);
    return TabsPage;
}());

//# sourceMappingURL=tabs.js.map

/***/ }),

/***/ 683:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AccordionComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AccordionComponent = (function () {
    // constructor is loaded before view of application is loaded
    function AccordionComponent(renderer) {
        this.renderer = renderer;
        this.accordionExpanded = false;
        this.accordionIcon = "ios-arrow-down";
        // console.log(this.name);
    }
    // executes after view is completely initialized
    AccordionComponent.prototype.ngOnInit = function () {
        this.renderer.setElementStyle(this.cardContent.nativeElement, "webkitTransition", "height: 500ms, padding: 500ms");
    };
    AccordionComponent.prototype.onToggleAccordion = function () {
        if (this.accordionExpanded) {
            this.renderer.setElementStyle(this.cardContent.nativeElement, "height", "0");
            this.renderer.setElementStyle(this.cardContent.nativeElement, "padding", "0");
        }
        else {
            this.renderer.setElementStyle(this.cardContent.nativeElement, "height", "auto");
            this.renderer.setElementStyle(this.cardContent.nativeElement, "padding", "16px");
        }
        this.accordionExpanded = !this.accordionExpanded;
        this.accordionIcon = (this.accordionIcon === "ios-arrow-down") ? "ios-arrow-up" : "ios-arrow-down";
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])("name"),
        __metadata("design:type", String)
    ], AccordionComponent.prototype, "name", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])("cardContent"),
        __metadata("design:type", Object)
    ], AccordionComponent.prototype, "cardContent", void 0);
    AccordionComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'accordion',template:/*ion-inline-start:"/Users/justinestrada/Sites/ionic-audio-player/src/components/accordion/accordion.html"*/'<ion-card>\n  <ion-card-header>\n    <ion-list>\n      <ion-item style="border: none;">\n        <h3 (click)="onToggleAccordion()">{{ name }}</h3>\n        <button ion-button item-right color="primary" (click)="onToggleAccordion()">\n          <ion-icon [name]="accordionIcon"></ion-icon>\n        </button>\n      </ion-item>\n    </ion-list>\n  </ion-card-header>\n  <ion-card-content #cardContent>\n    <ng-content></ng-content>\n  </ion-card-content>\n</ion-card>\n'/*ion-inline-end:"/Users/justinestrada/Sites/ionic-audio-player/src/components/accordion/accordion.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["V" /* Renderer */]])
    ], AccordionComponent);
    return AccordionComponent;
}());

//# sourceMappingURL=accordion.js.map

/***/ }),

/***/ 684:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProgressBarComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ProgressBarComponent = (function () {
    function ProgressBarComponent() {
        this.skipTo = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* EventEmitter */]();
    }
    ProgressBarComponent.prototype.onSkipTo = function ($event) {
        // console.log("Progress Skip To:", $event);
        var layerX = $event.layerX;
        var elementWidth = 335;
        var skipToPercent = +(layerX / elementWidth).toFixed(2);
        // console.log("Percent To Skip To", skipToPercent);
        this.skipTo.emit({ skip_to: skipToPercent });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])('progress'),
        __metadata("design:type", Object)
    ], ProgressBarComponent.prototype, "progress", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Output */])(),
        __metadata("design:type", Object)
    ], ProgressBarComponent.prototype, "skipTo", void 0);
    ProgressBarComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'progress-bar',template:/*ion-inline-start:"/Users/justinestrada/Sites/ionic-audio-player/src/components/progress-bar/progress-bar.html"*/'<div class="progress-outer" (click)="onSkipTo($event)" >\n    <div class="progress-inner" [style.width]="progress + \'%\'">\n    </div>\n</div>\n'/*ion-inline-end:"/Users/justinestrada/Sites/ionic-audio-player/src/components/progress-bar/progress-bar.html"*/
        }),
        __metadata("design:paramtypes", [])
    ], ProgressBarComponent);
    return ProgressBarComponent;
}());

//# sourceMappingURL=progress-bar.js.map

/***/ }),

/***/ 685:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ModalTrackComponent; });
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


var ModalTrackComponent = (function () {
    function ModalTrackComponent(navParams, viewCtrl) {
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
    }
    ModalTrackComponent.prototype.ionViewDidLoad = function () {
        this.track = this.navParams.get("track");
    };
    ModalTrackComponent.prototype.onCloseModal = function () {
        // this.viewCtrl.dismiss(data);
    };
    ModalTrackComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'modal-track',template:/*ion-inline-start:"/Users/justinestrada/Sites/ionic-audio-player/src/components/modal-track/modal-track.html"*/'<ion-grid class="modal-grid" padding>\n	<ion-row>\n		<ion-col col-12>\n			Modal Track\n		</ion-col>\n	</ion-row>\n</ion-grid>'/*ion-inline-end:"/Users/justinestrada/Sites/ionic-audio-player/src/components/modal-track/modal-track.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ViewController */]])
    ], ModalTrackComponent);
    return ModalTrackComponent;
}());

//# sourceMappingURL=modal-track.js.map

/***/ }),

/***/ 82:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NetworkService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_network__ = __webpack_require__(348);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__toast__ = __webpack_require__(349);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


// import {Observable} from 'rxjs';

var NetworkService = (function () {
    function NetworkService(network, toastService) {
        this.network = network;
        this.toastService = toastService;
        this.connected = true;
    }
    NetworkService.prototype.onWatchNetworkConnection = function () {
        var _this = this;
        this.network.onDisconnect().subscribe(function () {
            console.log('Network disconnected.');
            _this.toastService.showBasicToast('Disconnected from network.');
            _this.connected = false;
        });
        this.network.onConnect().subscribe(function () {
            console.log('Network connected.');
            _this.toastService.showBasicToast('Connected to network.');
            _this.connected = true;
        });
    };
    NetworkService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__ionic_native_network__["a" /* Network */], __WEBPACK_IMPORTED_MODULE_2__toast__["a" /* ToastService */]])
    ], NetworkService);
    return NetworkService;
}());

//# sourceMappingURL=network.js.map

/***/ })

},[353]);
//# sourceMappingURL=main.js.map