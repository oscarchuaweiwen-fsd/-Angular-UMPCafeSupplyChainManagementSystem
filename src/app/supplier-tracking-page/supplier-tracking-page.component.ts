import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { PrimeIcons } from 'primeng/api';
import { windowWhen } from 'rxjs/operators';

interface Info {
  trackingnumber: string;
}

@Component({
  selector: 'app-supplier-tracking-page',
  templateUrl: './supplier-tracking-page.component.html',
  styleUrls: ['./supplier-tracking-page.component.css'],
})
export class SupplierTrackingPageComponent implements OnInit {
  events!: any[];
  trackingInfo!: any[];
  trackingInfo2!: any[];
  selectedCountry!: any;
  date: string = '15/10/2020 10:30';
  temp:boolean = false;
  temp2:boolean = false;
  temp3:boolean = false;
  temp4:boolean = false;
  time: moment.Moment;
  totalprice: number =0;
  constructor(private fs: AngularFirestore,private router:Router) {
     this.time = moment();

    this.fs
      .collection('Admin')
      .doc('oMWhzMQgufX3WpRQs9WsB4JmQFv2')
      .collection('payment')
      .snapshotChanges()
      .subscribe((res) => {
        this.trackingInfo = [];

        res.map((res) => {
          let obj = {
            trackingnumber: res.payload.doc.id,
            data: res.payload.doc.data(),
          };

          this.trackingInfo.push(obj);
          console.log(this.trackingInfo);
        });
      });
  }

  ngOnInit(): void {
    this.events = [
      {
        status: 'Ordered',
        date: null,
        icon: PrimeIcons.SHOPPING_CART,
        color: '#e0e0e0',
        image: 'game-controller.jpg',
      },
      {
        status: 'Processing',
        date: null,
        icon: PrimeIcons.COG,
        color: '#e0e0e0',
      },
      {
        status: 'Shipped',
        date: null,
        icon: PrimeIcons.ENVELOPE,
        color: '#e0e0e0',
      },
      {
        status: 'Delivered',
        date: null,
        icon: PrimeIcons.CHECK,
        color: '#e0e0e0',
      },
    ];
  }

  submit() {
    console.log(this.selectedCountry)

    this.totalprice = this.selectedCountry.data.quantity * this.selectedCountry.data.amount
    if(this.selectedCountry !== null){

      this.events = [
        {
          status: 'Ordered',
          date: null,
          icon: PrimeIcons.SHOPPING_CART,
          color: '#e0e0e0',
          image: 'game-controller.jpg',
          index:null
        },
        {
          status: 'Processing',
          date: null,
          icon: PrimeIcons.COG,
          color: '#e0e0e0',
          index:null
        },
        {
          status: 'Shipped',
          date: null,
          icon: PrimeIcons.ENVELOPE,
          color: '#e0e0e0',
          index:null
        },
        {
          status: 'Delivered',
          date: null,
          icon: PrimeIcons.CHECK,
          color: '#e0e0e0',
          index:null
        },
      ];

      this.events.forEach((event,index) => {
        if (this.selectedCountry?.data?.ordertimestamp !== null) {
          if (event.status === 'Ordered') {
            event.date = this.selectedCountry?.data?.ordertimestamp;
            event.color = '#2dc258';
            this.events[0].index = true;

          }
        }
  
        if (this.selectedCountry?.data?.preparetimestamp !== null) {
          if (event.status === 'Processing') {
            event.date = this.selectedCountry?.data?.preparetimestamp;
            event.color = '#2dc258';
            this.events[0].index = false;
            this.events[1].index = true;
          }
        }
  
        if (this.selectedCountry?.data?.shiptimestamp !== null) {
          if (event.status === 'Shipped') {
            event.date = this.selectedCountry?.data?.shiptimestamp;
            event.color = '#2dc258';
            this.events[0].index = false;
            this.events[1].index = false;
            this.events[2].index = true;
          }
        }
  
        if (this.selectedCountry?.data?.completetimestamp !== null) {
          if (event.status === 'Delivered') {
            event.date = this.selectedCountry?.data?.completetimestamp;
            event.color = '#2dc258';
            this.events[0].index = false;
            this.events[1].index = false;
            this.events[2].index = false;
            this.events[3].index = true;
          }
        }
      });
    }else{
      this.events = [
        {
          status: 'Ordered',
          date: null,
          icon: PrimeIcons.SHOPPING_CART,
          color: '#e0e0e0',
          image: 'game-controller.jpg',
          index:null
        },
        {
          status: 'Processing',
          date: null,
          icon: PrimeIcons.COG,
          color: '#e0e0e0',
          index:null
        },
        {
          status: 'Shipped',
          date: null,
          icon: PrimeIcons.ENVELOPE,
          color: '#e0e0e0',
          index:null
        },
        {
          status: 'Delivered',
          date: null,
          icon: PrimeIcons.CHECK,
          color: '#e0e0e0',
          index:null
        },
      ];
    }
  
  }

  shipOut(trackingInfo:any){
    this.fs.collection('Admin').doc('oMWhzMQgufX3WpRQs9WsB4JmQFv2').collection('payment').doc(trackingInfo.trackingnumber).update({shiptimestamp:this.time.format("MMMM Do YYYY, h:mm a")});
    this.fs.collection('Admin').doc('oMWhzMQgufX3WpRQs9WsB4JmQFv2').collection('payment').doc(trackingInfo.trackingnumber).update({status:"tocomplete"});
    this.selectedCountry = trackingInfo;
  }

  completeOrder(trackingInfo:any){
    this.fs.collection('Admin').doc('oMWhzMQgufX3WpRQs9WsB4JmQFv2').collection('payment').doc(trackingInfo.trackingnumber).update({completetimestamp:this.time.format("MMMM Do YYYY, h:mm a")});
    this.fs.collection('Admin').doc('oMWhzMQgufX3WpRQs9WsB4JmQFv2').collection('payment').doc(trackingInfo.trackingnumber).update({status:"completed"});
  }
}
