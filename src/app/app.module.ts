import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { TabsPage } from '../pages/tabs/tabs';
import { ArtistsPage } from '../pages/artists/artists';
import { TracksPage } from '../pages/tracks/tracks';
import { TrackPage } from '../pages/tracks/track/track';
import { ManageTrack } from '../pages/tracks/track/manage-track/manage-track';
import { AboutPage } from '../pages/about/about';
import { SettingsPage } from '../pages/settings/settings';

import { AccordionComponent } from '../components/accordion/accordion';
import { ProgressBarComponent } from '../components/progress-bar/progress-bar';
import { ModalTrackComponent } from '../components/modal-track/modal-track';

import { NetworkService } from '../services/network';
import { DataService } from '../services/data';
import { AudioPlayerService } from '../services/audio-player';
import { ToastService } from '../services/toast';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {Network} from '@ionic-native/network';

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    ArtistsPage,
    TracksPage,
    TrackPage,
    ManageTrack,
    AboutPage,
    SettingsPage,
    AccordionComponent,
    ProgressBarComponent,
    ModalTrackComponent,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    ArtistsPage,
    TracksPage,
    TrackPage,
    ManageTrack,
    AboutPage,
    SettingsPage,
  ],
  providers: [
    NetworkService,
    Network,
    DataService,
    AudioPlayerService,
    ToastService,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
