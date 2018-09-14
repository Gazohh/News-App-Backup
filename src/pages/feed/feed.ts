import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {RssProvider} from "../../providers/rss/rss";
import { MenuController } from "ionic-angular";
/**
 * Generated class for the FeedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html',
})
export class FeedPage {

    rssDataArray: any = [];

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public rssProvider: RssProvider,
        public menuCtrl: MenuController) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad FeedPage');
        this.Get_RSS_Data();
        this.menuCtrl.enable (true, 'myMenu');
    }


    Get_RSS_Data() {
        this.rssProvider.getRSS().subscribe(data => {
            this.rssDataArray = data;
            console.log(data)
        });


    }
}
