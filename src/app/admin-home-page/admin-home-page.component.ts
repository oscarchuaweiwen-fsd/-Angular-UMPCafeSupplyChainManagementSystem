import { AngularFirestore } from '@angular/fire/firestore';
import { Component, ViewChild,AfterViewInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { param } from 'jquery';
import { AdminCartPageComponent } from '../admin-cart-page/admin-cart-page.component';
import * as moment from 'moment';
import { ChartDataset, ChartOptions } from 'chart.js';
import { HttpClient } from '@angular/common/http';

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
  compname:any;
  id:any
  quantity:any;
  barChartData:any;
  constructor(private fauth:AngularFireAuth,private router:Router,private af:AngularFirestore,private aR:ActivatedRoute,private http:HttpClient) {
    const time = moment();

    this.barChartData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [{
        label: 'My First Dataset',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }]
    };
this.aR.queryParams.subscribe(params =>{
  this.productname = params['productname'];
  this.productprice = params['amount'];
  this.action = params['action'];
  this.tracking_number = params['trackingnumber'];
  this.compname = params['compname']
  this.quantity = params['quantity']
});

  if(this.action =='success'){

    
    this.af.collection('Admin').doc('oMWhzMQgufX3WpRQs9WsB4JmQFv2').collection('cart').doc(this.productname).delete();
    this.af.collection('Supplier').get().subscribe(res=>{
      res.docs.forEach((res:any)=>{
        if(res.data().compname === this.compname){
          this.id = res.id;
          console.log("asd")
          this.af.collection('Supplier').doc(res.id).collection('menu').get().subscribe(res=>{
            console.log("asd")
            res.docs.forEach(res=>{
              console.log(res.data())
              if(res.data().brand === this.productname){
                console.log("asd")
                let newQuantity = res.data().quantity - this.quantity
                this.af.collection('Supplier').doc(this.id).collection('menu').doc(res.id).update({quantity:newQuantity});
              }
            })
          })
        }
      })
    })
    //Price,Supplier name, product name, quantity, total,status,uid
    // this.af.collection('Admin').doc('oMWhzMQgufX3WpRQs9WsB4JmQFv2').collection('payment').doc(this.productname).set();
    this.af.collection('Admin').doc('oMWhzMQgufX3WpRQs9WsB4JmQFv2').collection('payment').doc(this.tracking_number).update({status:'paid',ordertimestamp:time.format("MMMM Do YYYY, h:mm a")})
  }else if(this.action == "cancel"){
    this.af.collection('Admin').doc('oMWhzMQgufX3WpRQs9WsB4JmQFv2').collection('cart').doc(this.productname).delete();
  }

  }
  ngAfterViewInit(): void {

  }


}

