import {Component, ViewChild, OnInit, AfterViewInit} from '@angular/core';
import {NavController, AlertController, LoadingController} from 'ionic-angular';
import {RegisterPage} from "../register/register";
import {HttpClient, HttpHeaders, HttpRequest} from "@angular/common/http";
import 'rxjs/add/operator/map';
import {FeedPage} from "../feed/feed";
import {FavorietenPage} from "../favorieten/favorieten";
import {ToastController} from 'ionic-angular';
import {Keyboard} from '@ionic-native/keyboard';
import { MenuController } from "ionic-angular";

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})

export class HomePage {

    username:string;
    password:string;

    FavorietenPage = FavorietenPage;
    FeedPage = FeedPage;


    data:string;

    constructor(
                public navCtrl: NavController,
                private alertCtrl: AlertController,
                public loading: LoadingController,
                public http: HttpClient,
                private toastCtrl: ToastController,
                private keyboard: Keyboard,
                public menuCtrl: MenuController) {

        this.menuCtrl.enable(false, 'myMenu');
        keyboard.disableScroll(true);
    }

    // Console log die username en password terug geeft.
    login() {

        console.log("Username: " + this.username);

        console.log("Password: " + this.password);
    }

    // Push naar de register pagina
    goRegister() {
        this.navCtrl.push(RegisterPage);
    }

    signIn(){

//// check to confirm the username and password fields are filled

        if(this.username == null || this.password  == null ){

            let toast = this.toastCtrl.create({
                message: 'Niet alle velden zijn ingevuld!',
                duration: 3000,
                position: 'top'
            });

            toast.present();
        }

    else

        {

            var headers = new HttpHeaders();

            headers.append("Accept", 'application/json');

            headers.append('Content-Type', 'application/json' );

            let options = { headers: headers };

            let data = {

                username: this.username,

                password: this.password

            };

            let loader = this.loading.create({

                content: 'Aan het inloggen...',

        });

            loader.present().then(() => {

                this.http.post('http://www.gazoh.net/login.php' ,data,options)

                    .subscribe(res => {

                        console.log(res);

                        loader.dismiss();

                        if(res=="Succesfully logged in!"){

                            let toast = this.toastCtrl.create({
                            message: "U bent ingelogd!",
                                duration: 2500,
                                position: "top"
                        });

                            toast.present();
                            this.navCtrl.setRoot(FeedPage);

                        }else

                        {

                            let toast = this.toastCtrl.create({

                            message:"Uw gegevens zijn onjuist, probeer het nogmaals.",
                                showCloseButton: true,
                                closeButtonText: "OK",
                                position: "top"

                        });

                            toast.present();

                        }

                    });

            });

        }

    }
}
