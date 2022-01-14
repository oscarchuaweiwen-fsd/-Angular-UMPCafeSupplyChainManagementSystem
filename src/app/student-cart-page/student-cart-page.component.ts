import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireFunctions } from '@angular/fire/functions';
import { Router } from '@angular/router';
import { loadStripe } from '@stripe/stripe-js';

@Component({
  selector: 'app-student-cart-page',
  templateUrl: './student-cart-page.component.html',
  styleUrls: ['./student-cart-page.component.css'],
})
export class StudentCartPageComponent implements OnInit {
  cartItem: any[] = [];
  quantity: any;
  uid: any;
  stripe: any;
  tracking_number: any;
  studentname: any;

  constructor(
    private fs: AngularFirestore,
    private fa: AngularFireAuth,
    private fns: AngularFireFunctions,
    private http: HttpClient,
    private router: Router
  ) {
    this.fa.authState.subscribe((res) => {
      this.uid = res?.uid;
      this.fs
        .collection('Student')
        .doc(res?.uid)
        .collection('cart')
        .snapshotChanges()
        .subscribe((res) => {
          this.cartItem = [];
          res.map(async (res) => {
            let obj = {
              id: res.payload.doc.id,
              data: res.payload.doc.data(),
            };
            this.cartItem.push(obj);
          });

          console.log(this.cartItem)

          if(this.cartItem.length===0){
            this.router.navigateByUrl('/studentpage')
          }
          
          this.cartItem.forEach((res,index) => {
            console.log(res.id)
            this.fs.collection('Admin').doc('oMWhzMQgufX3WpRQs9WsB4JmQFv2').collection('menu').doc(res.id).snapshotChanges().subscribe((res)=>{
              console.log(res.payload.data()?.stock);

              console.log(this.cartItem)
              this.cartItem[index].max = parseInt(res.payload.data()?.stock);
              console.log(this.cartItem)
            })
          })
        });
    });

    this.fa.authState.subscribe((res) => {
      console.log(res?.uid);
      this.fs
        .collection('Student')
        .doc(res?.uid)
        .valueChanges()
        .subscribe(async (res: any) => {
          this.studentname = await res.name;

          console.log(this.studentname, res?.uid);
        });
    });
 
    console.log(this.cartItem.length)

    
  }

  ngOnInit(): void {}

  updateQuantity(quantity: any, data: any) {
    console.log(quantity, data);

    this.fs
      .collection('Student')
      .doc(this.uid)
      .collection('cart')
      .doc(data.id)
      .update({ quantity: quantity });
  }

  delete(product:any){
    console.log(product)

    this.fa.authState.subscribe((res)=>{
      this.fs.collection('Student').doc(res?.uid).collection('cart').doc(product.id).delete();
    })

   
  }

  async payNow(product: any) {
    // productname , amount, quantity
    console.log(product.data.data.data.ingredient);

    this.stripe = await loadStripe(
      'pk_test_51JWyo0FAyW0TeHuLxronXkW18xbGcUCeGeOnk0CCq3W6Kl8gZ3OViSOqMctnmuMTptcchsU1ZsieUf4LAMHCfwxu00Hd2Nl8Rz'
    );

    this.tracking_number = `UMPSCCafe${Math.floor( Math.random() * 19999999 ) + 10000000}MY`;
    this.http.post('https://UMP-Supply-Chain.cb-1-8-1-4-0-os.repl.co/student-create-checkout-payment', {
      quantity: product.data.quantity,
      productname: product.id,
      amount: product.data.data.data.price,
      trackingnumber:this.tracking_number,
      compname:product.data.data.data.compname,
      studentname:this.studentname
    }).subscribe((res:any)=>{

      this.stripe
        .redirectToCheckout({
          sessionId: res.session,
        })
        .then(function (result: { error: { message: any } }) {
          console.log(result.error.message);
        });
    });

    // const stripeCheckout = this.fns.httpsCallable("stripeCheckout2");

    // this.tracking_number = `UMPSCCafe${Math.floor( Math.random() * 19999999 ) + 10000000}MY`;
    // stripeCheckout({
    //     quantity:product.data.quantity,
    //     productname:product.id,
    //     amount:product.data.data.data.price,
    //     trackingnumber:this.tracking_number,
    //     compname:product.data.data.data.ingredient,
    //     studentname: this.studentname
    // }).subscribe(result=>{

    //   this.stripe
    //     .redirectToCheckout({
    //       sessionId: result.session,
    //     })
    //     .then(function (result: { error: { message: any } }) {
    //       console.log(result.error.message);
    //     });
    // })
  }
}
