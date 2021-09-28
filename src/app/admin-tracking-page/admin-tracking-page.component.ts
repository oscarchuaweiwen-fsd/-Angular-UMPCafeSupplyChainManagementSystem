import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireFunctions } from '@angular/fire/functions';
import { loadStripe } from '@stripe/stripe-js';

@Component({
  selector: 'app-admin-tracking-page',
  templateUrl: './admin-tracking-page.component.html',
  styleUrls: ['./admin-tracking-page.component.css']
})
export class AdminTrackingPageComponent implements OnInit {

  toPay:any[] = []
  toShip:any[] = []
  isGettingCheckout!: boolean;
  stripe:any;
  id1: any;
  constructor(private fs:AngularFirestore,private fns:AngularFireFunctions) {

    this.fs.collection('Admin').doc('oMWhzMQgufX3WpRQs9WsB4JmQFv2').collection('payment').snapshotChanges().subscribe(res=>{
      this.toPay = [];
      this.toShip = [];
      res.map(res=>{
        if(res.payload.doc.data().status === 'unpaid'){
          let obj = {
            id:res.payload.doc.id,
            data:res.payload.doc.data()
          }
            this.toPay.push(obj);
        }

        if(res.payload.doc.data().status === 'paid'){
          let obj = {
            id:res.payload.doc.id,
            data:res.payload.doc.data()
          }
            this.toShip.push(obj);
        }
      })
    })
   }

  ngOnInit(): void {
  }


  async pay(uid:any) {
    

    this.isGettingCheckout = true;

    this.stripe = await loadStripe(
      'pk_test_51JWyo0FAyW0TeHuLxronXkW18xbGcUCeGeOnk0CCq3W6Kl8gZ3OViSOqMctnmuMTptcchsU1ZsieUf4LAMHCfwxu00Hd2Nl8Rz'
    );


    this.stripe
    .redirectToCheckout({
      sessionId: uid,
    })

   
    
  }

  async delete(id:any,uid:any){
    this.id1 = uid;
    this.stripe = await loadStripe(
      'pk_test_51JWyo0FAyW0TeHuLxronXkW18xbGcUCeGeOnk0CCq3W6Kl8gZ3OViSOqMctnmuMTptcchsU1ZsieUf4LAMHCfwxu00Hd2Nl8Rz'
    );

    const createCheckoutSession = this.fns.httpsCallable('cancelPayment');
    createCheckoutSession({
      uid:id
    }).subscribe(result => {
      if(result.status =='canceled'){
        this.fs.collection('Admin').doc('oMWhzMQgufX3WpRQs9WsB4JmQFv2').collection('payment').doc(this.id1).delete();
      }
    })
    console.log(uid);


  }
}
