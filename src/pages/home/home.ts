import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { RegisterPage } from "../register/register";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import 'rxjs/add/operator/map';
import { CategoryPage } from "../category/category";
import { ToastController } from 'ionic-angular';
import { Keyboard } from '@ionic-native/keyboard';
import { MenuController } from "ionic-angular";
import { FeedPage } from "../feed/feed";
import { Events } from 'ionic-angular';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { Platform } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
    CategoryPage: any;

    dataUser:any;
    username: string;
    email: string;
    password: string;
    id:any;
    emailVerified: any;
    rol: any;
    creationdate:any;
    token = Math.random().toString(36).substring(7);

    rootPage: any = HomePage;

    FeedPage = FeedPage;
    data: string;


    constructor(
    public navCtrl: NavController,
    public loading: LoadingController,
    public http: HttpClient,
    private toastCtrl: ToastController,
    public menuCtrl: MenuController,
    public events: Events,
    private screenOrientation: ScreenOrientation,
    public platform: Platform,
    private keyboard: Keyboard) {


    if (this.platform.is('cordova')) {
      this.platform.ready().then(() => {
        this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
      })
    }

    this.menuCtrl.enable(false, 'myMenu');
    keyboard.disableScroll(true);

  }

  //
  // Buttons met Push
  //

  // Push naar de register pagina
  goRegister() {
    this.navCtrl.push(RegisterPage);
  }
  signIn() {
    // Controleert of de velden wel zijn ingevuld
    if (this.email == null || this.password == null) {
      let toast = this.toastCtrl.create({
        message: 'Niet alle velden zijn ingevuld!',
        duration: 3000,
        position: 'top'
      });
      toast.present();
    }
    else {
        var headers = new HttpHeaders();
        headers.append("Accept", 'application/json');
        headers.append('Content-Type', 'application/json');
        let options = { headers: headers };
        let data = {
            email: this.email,
            password: this.password
        };
        let loader = this.loading.create({
            content: 'Aan het inloggen...',
        });
        loader.present().then(() => {
            // Maakt verbinding met login.php en checkt of gegevens kloppen
            this.http.post('http://www.gazoh.net/getgebruiker.php', data, options)
                .subscribe(data => {this.dataUser = data});
            this.http.post('http://www.gazoh.net/login.php', data, options)
                .subscribe(res => {
                    console.log(res);
                    loader.dismiss();
                    if (res == "Succesfully logged in!") {
                        //Connectie met database
                        let toast = this.toastCtrl.create({
                            message: "U bent ingelogd!",
                            duration: 2500,
                            position: "top",
                            showCloseButton: true,
                            closeButtonText: "OK"
                        });

                        // Localstorage Gebruikersdetails
                        localStorage.setItem("userId", this.dataUser.id);
                        localStorage.setItem("userName", this.dataUser.username);
                        localStorage.setItem("userEmail", this.dataUser.email);
                        localStorage.setItem("userEmailVerified", this.dataUser.emailVerified);
                        localStorage.setItem("userRole", this.dataUser.rol);
                        localStorage.setItem("userCreationDate", this.dataUser.creationdate);
                        localStorage.setItem("sessionToken", this.token);

                        // Localstorage Email
                        localStorage.setItem("email", this.email);
                        this.navCtrl.setRoot(CategoryPage);



                        toast.present();
                    }
            else {
              let toast = this.toastCtrl.create({
                message: "Uw gegevens zijn onjuist, probeer het nogmaals.",
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
