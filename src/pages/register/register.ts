import {Component, OnInit} from '@angular/core';
import {IonicPage, NavController, NavParams, AlertController, LoadingController} from 'ionic-angular';
import {HomePage} from '../home/home';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import 'rxjs/add/operator/map';
import {FormGroup, FormControl, Validators} from '@angular/forms';


@IonicPage()
@Component({
    selector: 'page-register',
    templateUrl: 'register.html',
})


export class RegisterPage implements OnInit {

    username: string;
    password: string;
    email: string;

    form: FormGroup;


    // Construtor hiermee roep je alles aan
    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public alertCtrl: AlertController,
                private http: HttpClient,
                public loading: LoadingController) {}

    ngOnInit() {
        this.form = new FormGroup({
            username: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-z ]+')/*, Validators.minLength(3)*/]),
            password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$')]),
            email: new FormControl('', [Validators.required, Validators.email])
        })
    }



    // Push terug naar home button
    validateAllFormFields(formGroup: FormGroup) {         //{1}
        Object.keys(formGroup.controls).forEach(field => {  //{2}
            const control = formGroup.get(field);             //{3}
            if (control instanceof FormControl) {             //{4}
                control.markAsTouched({onlySelf: true});
            } else if (control instanceof FormGroup) {        //{5}
                this.validateAllFormFields(control);            //{6}
            }
        });
    }

    onSubmit() {
        if (this.form.invalid) {
            this.validateAllFormFields(this.form); //{7}
        } else{
            const headers = new HttpHeaders();

            headers.append("Accept", 'application/json');

            headers.append('Content-Type', 'application/json');

            const options = {headers: headers};


            const data = {

                username: this.username,

                password: this.password,

                email: this.email

            };
            let loader = this.loading.create({

                content: 'Aan het registreren..',

            });

            loader.present().then(() => {

                this.http.post('http://gazoh.net/register.php', data, options)

                    .map(res => res)

                    .subscribe(res => {

                        loader.dismiss();

                        if (res == "Registration successfull") {

                            let alert = this.alertCtrl.create({

                                title: "Registreren geslaagd",

                                subTitle: "U kunt nu gaan inloggen",

                                buttons: ['OK']

                            });

                            alert.present();

                            this.navCtrl.push(HomePage);
                        }
                        else if(res == "already in use")
                        {
                            let alert = this.alertCtrl.create({

                                title: "Registreren mislukt",

                                subTitle: "Er bestaat al een gebruiker met het zelfde email of gebruikersnaam!",

                                buttons: ['OK']

                            });

                            alert.present();
                        }
                        else {

                            let alert = this.alertCtrl.create({

                                title: "Mislukt",

                                subTitle: "Er is iets mis gegaan tijdens het registeren probeert u het opnieuw.",

                                buttons: ['OK']

                            });

                            alert.present();

                        }
                    });
            });
        }
    }

// Push terug naar home button
    terug() {
        this.navCtrl.push(HomePage);
    }

}
