import { Component } from '@angular/core';

import { NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'modal-track',
  templateUrl: 'modal-track.html'
})
export class ModalTrackComponent {

  track: any;

  constructor( private navParams: NavParams, private viewCtrl: ViewController ) {
  }

  ionViewDidLoad() {
    this.track = this.navParams.get("track");
  }

  onCloseModal() {
    // this.viewCtrl.dismiss(data);
  }

}
