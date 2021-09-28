import { AngularFirestore } from '@angular/fire/firestore';
import { Component, ViewChild,AfterViewInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { param } from 'jquery';
import { AdminCartPageComponent } from '../admin-cart-page/admin-cart-page.component';


@Component({
  selector: 'app-admin-home-page',
  templateUrl: './admin-home-page.component.html',
  styleUrls: ['./admin-home-page.component.css']
})
export class AdminHomePageComponent implements AfterViewInit {

  productname:any;
  productprice:any;
  action:any;
  username$ : Observable<any> |undefined;
  tracking_number:any;

  constructor(private fauth:AngularFireAuth,private router:Router,private af:AngularFirestore,private aR:ActivatedRoute) {
    
this.aR.queryParams.subscribe(params =>{
  this.productname = params['productname'];
  this.productprice = params['amount'];
  this.action = params['action'];
  this.tracking_number = params['trackingnumber'];
});

  if(this.action =='success'){

    
    this.af.collection('Admin').doc('oMWhzMQgufX3WpRQs9WsB4JmQFv2').collection('cart').doc(this.productname).delete();

    //Price,Supplier name, product name, quantity, total,status,uid
    // this.af.collection('Admin').doc('oMWhzMQgufX3WpRQs9WsB4JmQFv2').collection('payment').doc(this.productname).set();
    this.af.collection('Admin').doc('oMWhzMQgufX3WpRQs9WsB4JmQFv2').collection('payment').doc(this.tracking_number).update({status:'paid'})
  }else if(this.action == "cancel"){
    this.af.collection('Admin').doc('oMWhzMQgufX3WpRQs9WsB4JmQFv2').collection('cart').doc(this.productname).delete();
  }


  }
  ngAfterViewInit(): void {

  }

}

