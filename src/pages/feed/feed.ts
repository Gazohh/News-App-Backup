import {Component, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
import {MenuController} from "ionic-angular";
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Network} from "@ionic-native/network";
import {ToastController} from 'ionic-angular';
import {HomePage} from "../home/home";
import {NieuwsPage} from "../nieuws/nieuws";
import {LoadingController} from 'ionic-angular';
import {Searchbar} from 'ionic-angular';


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
    @ViewChild('searchbar') searchbar: Searchbar;
    public items: any = 0;
    public data: any;
    public artikelen: any;
    public key: string = "items";
    public isSearchbaropened = false;
    public datepicker: any;
    public vandaag: any;
    public gisteren: any;
    public driedagengeleden: any;
    public itemempty: boolean;
    public rol:any;


    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public menuCtrl: MenuController,
        public http: HttpClient,
        public network: Network,
        private toastCtrl: ToastController,
        public loadingCtrl: LoadingController,
        public platform: Platform) {
        if (this.network.type != "none") {
            //this.getData();
            this.datepicker = "vandaag";
            if (this.datepicker == "vandaag") {
                this.load();
            }
            else if (this.datepicker == "gisteren") {
                this.loadYesterday();
            }
            else if (this.datepicker == "driedagengeleden") {
                this.load3DaysAgo();
            }
        }
        else {
            this.loadData();
            let toast = toastCtrl.create({
                message: "Geen internet verbinding, opgeslagen artikelen worden ingeladen.",
                duration: 2500,
                position: "top",
                showCloseButton: true,
                closeButtonText: "OK"
            });
            toast.present();
        }
        let toastinlog = toastCtrl.create({
            message: "Geen sessie gevonden, log opnieuw in.",
            duration: 2500,
            position: "top",
            showCloseButton: true,
            closeButtonText: "OK"
        });

        // Sessie Token
        if (!localStorage.getItem("sessionToken")) {
            this.navCtrl.setRoot(HomePage);
            toastinlog.present();
        }

        // User role
        if(localStorage.getItem("userRole"))
        {
          this.rol = localStorage.getItem("userRole");
        }
        /* //this.GetNews()
         this.presentLoadingCustom();*/
    }

    presentLoadingCustom() {

        let loading = this.loadingCtrl.create({
            spinner: 'hide',
            content: `
     <div class="custom-spinner-container"><img src="http://gazoh.net/images/spinner.svg"><br> <p>Laden...</p>
     </div>`,
            duration: 1200
        });

        loading.present();
    }

    ionViewDidLoad() {
        this.menuCtrl.enable(true, 'myMenu');
    }

    /*getData() {
        let url = "http://api.jsonbin.io/b/5bab4b98a97c597b3c591b93";
        var headers = new HttpHeaders();
        headers.append('Access-Control-Allow-Origin', '*');

        headers.append("Accept", 'application/json');

        headers.append('Content-Type', 'application/json');

        let options = {headers: headers};
        let data: Observable<any> = this.http.get(url, options);
        data.subscribe(result => {
            this.items = result;
        });
        localStorage.setItem(this.key, JSON.stringify(this.items));
    }*/

    loadData() {
        localStorage.getItem(this.key);
        if (this.key != null && this.key != undefined) {
            this.items = JSON.parse(this.key);
        }
    }

    htmlToPlaintext(text) {
        return text ? String(text).replace(/<[^>]+>/gm, '') : '';
    }

    // Redirect to NieuwsPage
    viewEntry(param: any): void {
        this.navCtrl.push('NieuwsPage', param);
    }

    search(event) {
        let serVal = event.target.value;
        if (serVal && serVal.trim() != '') {
            this.items = this.items.filter((item) => {
                return (item.title.toLowerCase().indexOf(serVal.toLowerCase()) > -1);
            })
        }
    }

    resetChanges() {
        this.http
            .get('http://gazoh.net/getdata.php')
            .subscribe((data: any) => {
                    this.items = data;
                },
                (error: any) => {
                    console.dir(error);
                });
        this.isSearchbaropened = false;
    }

    // setFocus() {
    //     this.searchbar.setFocus();
    // }

    load() {
        this.datepicker = "vandaag";
        this.http
            .get('http://gazoh.net/getdata.php')
            .subscribe((data: any) => {
                    this.items = data;
                    this.artikelen = data;
                },
                (error: any) => {
                    console.dir(error);
                });
        this.presentLoadingCustom();
    }

    loadYesterday() {
        this.datepicker = "gisteren";
        this.http
            .get('http://gazoh.net/getyesterday.php')
            .subscribe((data: any) => {
                    this.items = data;
                    this.artikelen = data;
                },
                (error: any) => {
                    console.dir(error);
                });
        this.presentLoadingCustom();
    }

    load3DaysAgo() {
        this.datepicker = "driedagengeleden";
        this.http
            .get('http://gazoh.net/get3daysago.php')
            .subscribe((data: any) => {
                    this.items = data;
                    this.artikelen = data;
                },
                (error: any) => {
                    console.dir(error);
                });
        this.presentLoadingCustom();

    }

    doRefresh(refresher) {
        if (this.datepicker == "vandaag") {
            this.http
                .get('http://gazoh.net/getdata.php')
                .subscribe((data: any) => {
                        this.items = data;
                        this.artikelen = data;
                    },
                    (error: any) => {
                        console.dir(error);
                    });
        }
        else if (this.datepicker == "gisteren") {
            this.http
                .get('http://gazoh.net/getyesterday.php')
                .subscribe((data: any) => {
                        this.items = data;
                        this.artikelen = data;
                    },
                    (error: any) => {
                        console.dir(error);
                    });
        }
        else if (this.datepicker == "driedagengeleden") {
            this.http
                .get('http://gazoh.net/get3daysago.php')
                .subscribe((data: any) => {
                        this.items = data;
                        this.artikelen = data;
                    },
                    (error: any) => {
                        console.dir(error);
                    });
        }

        setTimeout(() => {
            console.log('Async operation has ended');
            refresher.complete();
        }, 2000);
    }

    doInfinite(infiniteScroll) {
        this.http
            .get('http://gazoh.net/getdata.php')
            .subscribe((data: any) => {
                    this.items = this.items.push(data);
                    infiniteScroll.complete();
                },
                (error: any) => {
                    console.dir(error);
                });
        console.log('Begin async operation');
    }

    setHideArticle(postId)
    {
        console.log("Hide " + postId);
        var headers = new HttpHeaders();
        headers.append("Accept", 'application/json');
        headers.append('Content-Type', 'application/json');
        let options = { headers: headers };
        this.http.post('http://gazoh.net/hidearticle.php', postId, options).subscribe(res => {
            if(res == "hidden")
            {let toast = this.toastCtrl.create({
                message: "Artikel " + postId + " verborgen",
                duration: 2500,
                position: "top",
                showCloseButton: true,
                closeButtonText: "OK"
            });
                toast.present();}
        });
    }
}
