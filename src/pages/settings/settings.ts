import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { SettingsProvider } from "../../providers/settings/settings";
import { Nav, Platform } from 'ionic-angular';
import { HomePage } from '../home/home';
import {AdminPage} from "../admin/admin";
import { AlertController } from 'ionic-angular';
import { ProfielPage } from "../profiel/profiel";

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
  providers: [Nav]
})
export class SettingsPage {
  @ViewChild(Nav) nav: Nav;

  selectedTheme: string;
  setActiveTheme: string;


  constructor(private settings: SettingsProvider, platform: Platform, public navCtrl: NavController, private alertCtrl: AlertController) {
    this.settings.getActiveTheme().subscribe(val => this.selectedTheme = val);

  }

  toggleAppTheme() {
    if (this.selectedTheme == 'light-theme') {

      this.settings.setActiveTheme('dark-theme');
      localStorage.setItem("themeColor", this.selectedTheme);

    }
    else if (this.selectedTheme == 'dark-theme') {

      this.settings.setActiveTheme('light-theme');
      localStorage.setItem("themeColor", this.selectedTheme);

    }
  }

  openAdmin()
  {
    this.navCtrl.push(AdminPage);
  }

  uitloggen() {
    localStorage.clear( );
    this.navCtrl.setRoot(HomePage);
  }

  RaporteerProbleem() {
    const prompt = this.alertCtrl.create({
       title: 'Raporteer een probleem',
       inputs: [
         {
           name: 'Typ je bericht hier..',
           placeholder: 'Typ je bericht hier..'
         },
       ],
       buttons: [
         {
           text: 'Cancel',
           handler: data => {
             console.log('Cancel clicked');
           }
         },
         {
           text: 'Opsturen',
           handler: data => {
             console.log('Saved clicked');
           }
         }
       ]
     });
     prompt.present();
   }

bewerkProfiel() {
  this.navCtrl.push(ProfielPage);
}







}
