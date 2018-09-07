import {Component, ViewChild, OnInit, AfterViewInit} from '@angular/core';
import {NavController, AlertController, LoadingController} from 'ionic-angular';
import {RegisterPage} from "../register/register";
import {HttpClient, HttpHeaders, HttpRequest} from "@angular/common/http";
import 'rxjs/add/operator/map';
import {FeedPage} from "../feed/feed";
import {FavorietenPage} from "../favorieten/favorieten";


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

    constructor(public navCtrl: NavController, private alertCtrl: AlertController, public loading: LoadingController, public http: HttpClient) {

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

            let alert = this.alertCtrl.create({

                title:"",

            message:"Gebruikersnaam of wachtwoord is niet ingevuld!",

            buttons: ['OK']

        });

            alert.present();

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

                this.http.post('http://localhost/News-App/src/pages/register/login.php',data,options)

                    .subscribe(res => {

                        console.log(res)

                        loader.dismiss()

                        if(res=="Succesfully logged in!"){

                            let alert = this.alertCtrl.create({

                                title:"Geslaagd",

                            message: "U bent ingelogd!",

                                buttons: ['OK']

                        });

                            alert.present();
                            this.navCtrl.setRoot(FeedPage);

                        }else

                        {

                            let alert = this.alertCtrl.create({

                                title:"Mislukt",

                            subTitle:"Uw gegevens zijn onjuist, probeer het nogmaals.",

                            buttons: ['OK']

                        });

                            alert.present();

                        }

                    });

            });

        }

    }
}
