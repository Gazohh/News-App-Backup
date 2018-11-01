import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HttpClient, HttpHeaders} from "@angular/common/http";


/**
 * Generated class for the AdminPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin',
  templateUrl: 'admin.html',
})
export class AdminPage {

  checklist:any;
  gebruikers:any;
  artikelen:any;
  gebruikerslijst:any;
  artikelenlijst:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminPage');
  }

  selectGebruikers()
  {
    this.checklist = "gebruikers";
      this.http
          .get('http://gazoh.net/getuser.php')
          .subscribe((data : any) =>
              {
                  this.gebruikerslijst = data;
              },
              (error : any) =>
              {
                  console.dir(error);
              });
  }

  ionViewWillEnter()
  {
      this.checklist = "artikelen";
      this.selectArtikelen();
  }

  selectArtikelen()
  {
    this.checklist = "artikelen";
      this.http
          .get('http://gazoh.net/getverborgen.php')
          .subscribe((data : any) =>
              {
                  this.artikelenlijst = data;
              },
              (error : any) =>
              {
                  console.dir(error);
              });
  }

    htmlToPlaintext(text) {
        return text ? String(text).replace(/<[^>]+>/gm, '') : '';
    }

    viewEntry(param: any): void {
        this.navCtrl.push('NieuwsPage', param);
    }

}
