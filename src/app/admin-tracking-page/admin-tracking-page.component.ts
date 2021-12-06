import { ArrayType } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireFunctions } from '@angular/fire/functions';
import { loadStripe } from '@stripe/stripe-js';
import { map } from 'rxjs/operators';
//BUG PURCHASE HISTORY 
@Component({
  selector: 'app-admin-tracking-page',
  templateUrl: './admin-tracking-page.component.html',
  styleUrls: ['./admin-tracking-page.component.css'],
})
export class AdminTrackingPageComponent implements OnInit {
  toPay: any[] = [];
  toShip: any[] = [];
  toReceived: any[] = [];
  completed: any[] = [];
  isGettingCheckout!: boolean;
  stripe: any;
  id1: any;
  quantity: any = 0;
  displayBasic = false;
  val2 = 0;
  productInfo!: any;
  id: any;
  constructor(private fs: AngularFirestore, private fns: AngularFireFunctions) {
    this.fs
      .collection('Admin')
      .doc('oMWhzMQgufX3WpRQs9WsB4JmQFv2')
      .collection('payment')
      .snapshotChanges()
      .subscribe((res) => {
        this.toPay = [];
        this.toShip = [];
        this.toReceived = [];
        this.completed = [];
        res.map((res) => {
          if (res.payload.doc.data().status === 'unpaid') {
            let obj = {
              id: res.payload.doc.id,
              data: res.payload.doc.data(),
            };
            this.toPay.push(obj);
          }

          if (res.payload.doc.data().status === 'paid') {
            let obj = {
              id: res.payload.doc.id,
              data: res.payload.doc.data(),
            };
            this.toShip.push(obj);
          }

          if (
            res.payload.doc.data().status === 'toship' ||
            res.payload.doc.data().status === 'tocomplete' ||
            res.payload.doc.data().status === 'completed'
          ) {
            let obj = {
              id: res.payload.doc.id,
              data: res.payload.doc.data(),
            };
            this.toReceived.push(obj);
          }

          if (
            res.payload.doc.data().receivedstatus === true &&
            res.payload.doc.data().status === 'finished'
          ) {
            let obj = {
              id: res.payload.doc.id,
              data: res.payload.doc.data(),
            };
            this.completed.push(obj);
          }
        });
      });
  }

  ngOnInit(): void {}

  async pay(uid: any) {
    this.isGettingCheckout = true;

    this.stripe = await loadStripe(
      'pk_test_51JWyo0FAyW0TeHuLxronXkW18xbGcUCeGeOnk0CCq3W6Kl8gZ3OViSOqMctnmuMTptcchsU1ZsieUf4LAMHCfwxu00Hd2Nl8Rz'
    );

    this.stripe.redirectToCheckout({
      sessionId: uid,
    });
  }

  async delete(id: any, uid: any) {
    this.id1 = uid;
    this.stripe = await loadStripe(
      'pk_test_51JWyo0FAyW0TeHuLxronXkW18xbGcUCeGeOnk0CCq3W6Kl8gZ3OViSOqMctnmuMTptcchsU1ZsieUf4LAMHCfwxu00Hd2Nl8Rz'
    );

    const createCheckoutSession = this.fns.httpsCallable('cancelPayment');
    createCheckoutSession({
      uid: id,
    }).subscribe((result) => {
      if (result.status == 'canceled') {
        this.fs
          .collection('Admin')
          .doc('oMWhzMQgufX3WpRQs9WsB4JmQFv2')
          .collection('payment')
          .doc(this.id1)
          .delete();
      }
    });
    console.log(uid);
  }

  async updateInfoInv(x: any) {
      console.log(x.data);

      this.fs.collection('Supplier').get().subscribe(res=>{

        res.docs.forEach((res:any)=>{
          let id = res.id;
          if(res.data().compname === x.data.compname){
            console.log(id);
            this.fs.collection('Supplier').doc(id).collection('menu').get().subscribe(res=>{
              res.docs.forEach(res=>{
                console.log(res.data())

                if(res.data().category === x.data.category){
                  console.log(res.data());
                  let newTotal = res.data().ratingTotal + 1;
                  this.fs.collection('Supplier').doc(id).collection('menu').doc(res.id).update({totalSale:newTotal})
                }
              })
            })
          }
        })
      })

      this.fs.collection('Admin').doc('oMWhzMQgufX3WpRQs9WsB4JmQFv2').collection('payment').doc(x.id).update({receivedstatus:true,status:"finished"});



    console.log(x);


    this.fs.collection('Admin').doc('oMWhzMQgufX3WpRQs9WsB4JmQFv2').collection('inventory').get().subscribe(res=>{
      if(res.size ===0){
        this.fs.collection('Admin').doc('oMWhzMQgufX3WpRQs9WsB4JmQFv2').collection('inventory').doc(x.data.category).set({quantity:x.data.quantity,lowestmargin:1})
      }else{
        this.fs.collection('Admin').doc('oMWhzMQgufX3WpRQs9WsB4JmQFv2').collection("inventory").doc(x.data.category).get().subscribe(async res=>{
          this.quantity = res.data()?.quantity;
          let newQuantity = this.quantity+x.data.quantity
          await this.fs.collection('Admin').doc('oMWhzMQgufX3WpRQs9WsB4JmQFv2').collection("inventory").doc(x.data.category).update({quantity:newQuantity}).then(res=>{
            console.log("successfully")
          })
        });
      }

      
    })

    let total = x.data.amount * x.data.quantity;
    this.fs
      .collection('Admin')
      .doc('oMWhzMQgufX3WpRQs9WsB4JmQFv2')
      .collection('inventory')
      .doc(x.data.category)
      .collection('purchasehistory')
      .doc()
      .set({trackingnumber:x.id,
      category:x.data.category,
      rating:x.data.ratingstatus,
      status:x.data.status,
      compname:x.data.compname,
      total:total,
        amount:x.data.amount,
        quantity:x.data.quantity,
        productname:x.data.productname,
        ordertimestamp:x.data.ordertimestamp,
        completetimestamp:x.data.completetimestamp,
        preparetimestamp:x.data.preparetimestamp,
        shiptimestamp:x.data.shiptimestamp,
        stockChecking:x.data.quantity,
        trackingTotal:x.data.amount
      });
  }

  async showBasicDialog(x: any) {
    this.productInfo = await x;
    this.displayBasic = !this.displayBasic;
  }

  updateRating(productInfo: any) {
    console.log(this.val2, productInfo);

    this.fs
      .collection('Supplier')
      .snapshotChanges()
      .subscribe((res) => {
        res.map(async (res: any) => {
          console.log(res.payload.doc.id);

          if (res.payload.doc.data().compname === productInfo.data.compname) {
            this.id = await res.payload.doc.id;
            this.fs
              .collection('Supplier')
              .doc(this.id)
              .collection('menu')
              .get()
              .subscribe((res) => {
                res.docs.forEach((res) => {
                  console.log(res.data());

                  if (res.data().category === productInfo.data.category) {
                    if (res.data().rating === 0) {
                      let array: any[] = [];
                      array.push(this.val2);
                      this.fs
                        .collection('Supplier')
                        .doc(this.id)
                        .collection('menu')
                        .doc(res.id)
                        .update({ rating: array, ratingTotal: this.val2 });
                    }

                    let array: any[] = res.data().rating;
                    array.push(this.val2);
                    let average = 0;
                    array.forEach((res) => {
                      average += res;
                    });

                    let newAverage = average / array.length;
                    console.log(newAverage);
                    this.fs
                      .collection('Supplier')
                      .doc(this.id)
                      .collection('menu')
                      .doc(res.id)
                      .update({
                        rating: array,
                        ratingTotal: Math.round(newAverage),
                      });
                  }
                });
              });
          }
        });
      });
  }
}
