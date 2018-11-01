import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FeedPage } from "../feed/feed";
import { SportPage } from "../sport/sport";
import { MenuController } from "ionic-angular";
import { EconomiePage } from "../economie/economie";
import { ToastController } from 'ionic-angular';
import { AutoPage } from "../auto/auto";
import { MisdaadPage } from "../misdaad/misdaad";
import { TechPage } from "../tech/tech";
import { VermaakPage } from "../vermaak/vermaak";
import {HttpClient} from "@angular/common/http";
@IonicPage()
@Component({
  selector: 'page-category',
  templateUrl: 'category.html',
})
export class CategoryPage {

    aantalartikelen: any;

    constructor(public navCtrl: NavController, public navParams: NavParams, public menuCtrl: MenuController, public toastCtrl: ToastController, public http: HttpClient) {
    this.menuCtrl.enable(true, 'myMenu');

  }

    ionViewWillEnter()
    {
        this.getArtikelen();
    }

  goFeed() {
    this.navCtrl.setRoot(FeedPage);
  }

  goSport() {
    this.navCtrl.setRoot(SportPage);
  }

  goEconomie() {
    this.navCtrl.setRoot(EconomiePage);
  }

  goMisdaad() {
      this.navCtrl.setRoot(MisdaadPage);
  }

  goTech() {
      this.navCtrl.setRoot(TechPage);
  }

  goAuto() {
    this.navCtrl.setRoot(AutoPage);
  }

  goVermaak() {
      this.navCtrl.setRoot(VermaakPage);
  }

    getArtikelen()
    {
        this.http
            .get('http://gazoh.net/aantalvandaag.php')
            .subscribe((data : any) =>
                {
                    this.aantalartikelen = data;
                },
                (error : any) =>
                {
                    console.dir(error);
                });
    }

  newMenu() {
    const toast = this.toastCtrl.create({
      message: 'Test',
      cssClass: 'backgroundToastMenu',
      showCloseButton: true,
      closeButtonText: "OK"

    });
    toast.present();
  }


}
