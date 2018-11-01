
import {IonicPage, NavController, NavParams, LoadingController, ActionSheetController} from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { SettingsPage } from '../settings/settings';
import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
import {FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';


@IonicPage()
@Component({
  selector: 'page-profiel',
  templateUrl: 'profiel.html',
})
export class ProfielPage {
myphoto:any;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private alertCtrl: AlertController,
              private camera: Camera,
              private transfer: FileTransfer,
              private file: File,
              private loadingCtrl: LoadingController,
              public actionSheetCtrl: ActionSheetController) {
  }
    presentActionSheet() {
        let actionSheet = this.actionSheetCtrl.create({
            title: 'Kies een profielfoto!',
            buttons: [
                {
                    text: 'Maak foto',
                    role: 'Maak foto',
                    handler: () => {
                        this.takePhoto();
                    }
                },
                {
                    text: 'Kies uit galerij',
                    handler: () => {
                        this.cropImage();
                    }
                },
                {
                    text: 'Annuleren',
                    role: 'cancel',
                    handler: () => {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });

        actionSheet.present();
    }
    takePhoto(){
        const options: CameraOptions = {
            quality: 70,
            allowEdit:true,
            targetWidth:300,
            targetHeight:300,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
        }

        this.camera.getPicture(options).then((imageData) => {
            // imageData is either a base64 encoded string or a file URI
            // If it's base64:
            this.myphoto = 'data:image/jpeg;base64,' + imageData;
        }, (err) => {
            // Handle error
        });
    }
    onArticlePictureCreated(base64String: string){
        this.myphoto = 'data:image/jpeg;base64,' + base64String;
    }

    // getImage() {
    //     const options: CameraOptions = {
    //         quality: 70,
    //         destinationType: this.camera.DestinationType.DATA_URL,
    //         sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    //         saveToPhotoAlbum:false
    //     }
    //
    //     this.camera.getPicture(options).then((imageData) => {
    //         // imageData is either a base64 encoded string or a file URI
    //         // If it's base64:
    //         this.myphoto = 'data:image/jpeg;base64,' + imageData;
    //     }, (err) => {
    //         // Handle error
    //     });
    // }

    cropImage() {
    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum: false,
      allowEdit:true,
      targetWidth:300,
      targetHeight:300
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.myphoto = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
    });
  }

    uploadImage(){
        //Show loading
        let loader = this.loadingCtrl.create({
            content: "Uploading..."
        });
        loader.present();

        //create file transfer object
        const fileTransfer: FileTransferObject = this.transfer.create();

        //random int
        var random = Math.floor(Math.random() * 100);

        //option transfer
        let options: FileUploadOptions = {
            fileKey: 'photo',
            fileName: "myImage_" + random + ".jpg",
            chunkedMode: false,
            httpMethod: 'post',
            mimeType: "image/jpeg",
            headers: {}
        }

        //file transfer action
        fileTransfer.upload(this.myphoto, 'http://localhost/news-app/src/pages/profiel/uploadFoto.php', options)
            .then((data) => {
                alert("Success");
                loader.dismiss();
            }, (err) => {
                console.log(err);
                alert("Error");
                loader.dismiss();
            });
    }

  wijzigWachtwoord() {
    const prompt = this.alertCtrl.create({
       title: 'Wachtwoord wijzigen',
       inputs: [
         {
           name: 'oudWachtwoord',
           placeholder: 'Oude wachtwoord'
         },
         {
           name: 'NieuweWachtwoord1',
           placeholder: 'Nieuwe wachtwoord'
         },
         {
           name: 'NieuweWachtwoord2',
           placeholder: 'Herhaal wachtwoord'
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
           text: 'Wijzigen',
           handler: data => {
             console.log('Saved clicked');
           }
         }
       ]
     });
     prompt.present();
   }

   goBack() {
     this.navCtrl.push(SettingsPage);
   }

}
