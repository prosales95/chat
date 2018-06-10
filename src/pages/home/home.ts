import { Component } from '@angular/core';
import { NavController, AlertController, Platform } from 'ionic-angular';
import { Camera, NativeStorage } from 'ionic-native';
import  {ChatPage} from '../chat/chat'
import { Slides } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { ImportantPage } from '../../pages/important/important';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  @ViewChild(Slides) slides:Slides;



  username: string='';
  public base64Image: string[];
  public extraOptions: {};

  constructor(public navCtrl: NavController,
    private alertCtrl: AlertController, public platform: Platform) {
    this.base64Image= new Array();
    this.extraOptions = {
      pager:true,
      paginationClickable:true,
      spaceBetween: 30,
      centeredSlides: true,
      autoplay: 2000
    }
    this.platform.ready().then(() => {
      NativeStorage.getItem("photos").then(data => {
        this.base64Image = data.split(",");
      },
      error => {
        console.log("error in getting photos "+error);
      });
    });
  }


  showAlert(title: string, message:string) {
    let alertBox = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['OK']
    });
    alertBox.present();
  }


  loginUser(){
    if (/^[a-zA-Z0-9]+$/.test(this.username)) {
        // code...
        this.navCtrl.push(ChatPage, {
          username:this.username
        })
      } else {
        this.showAlert('Error', 'Invalid Username')
      }
    }

    goToDo(){
      this.navCtrl.push(ImportantPage);
    }

    takePicture() {
      Camera.getPicture({
        quality: 75,
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: Camera.PictureSourceType.CAMERA,
        allowEdit: true,
        encodingType: Camera.EncodingType.JPEG,
        targetHeight: 300,
        targetWidth: 300,
        saveToPhotoAlbum:true,
      }).then((imageUri) => {
        console.log("imageUri is "+imageUri);
        this.base64Image.push(imageUri);
        let imageUris = this.base64Image.map( o => o).join(', ');
        NativeStorage.setItem('photos', imageUris).then(
          () => console.log('Stored item!'),
          error => console.error('Error in storing item', error)
          );
      }, (err) => {
        console.log("camera error is "+err);
      } );
    }

  }
