import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireFunctions } from '@angular/fire/functions';
import { loadStripe } from '@stripe/stripe-js';

@Component({
  selector: 'app-student-cart-page',
  templateUrl: './student-cart-page.component.html',
  styleUrls: ['./student-cart-page.component.css']
})
export class StudentCartPageComponent implements OnInit {

  cartItem:any[] = [];
  quantity:any;
  uid:any;
  stripe: any;
  tracking_number:any;
  studentname:any;

  constructor(private fs:AngularFirestore,private fa:AngularFireAuth,private fns:AngularFireFunctions) {

    this.fa.authState.subscribe(res=>{
      this.uid = res?.uid
      this.fs.collection('Student').doc(res?.uid).collection('cart').snapshotChanges().subscribe(res=>{
        this.cartItem = []
        res.map(async res=>{
          let obj={
            id:res.payload.doc.id,
            data:res.payload.doc.data()
          }
          this.cartItem.push(obj)
          console.log(this.cartItem)
        })
      })
    })

    this.fa.authState.subscribe(res=>{
      console.log(res?.uid)
      this.fs.collection('Student').doc(res?.uid).valueChanges().subscribe(async (res:any)=>{
        this.studentname = await res.name;

        console.log(this.studentname,res?.uid)
      })
    })
   }

  ngOnInit(): void {

    
  }


  updateQuantity(quantity:any,data:any){
    console.log(quantity,data)

    this.fs.collection("Student").doc(this.uid).collection('cart').doc(data.id).update({quantity:quantity})
  }


  async payNow(product:any){
    // productname , amount, quantity
    console.log(product.data.data.data.ingredient)
   
    this.stripe = await loadStripe(
      'pk_test_51JWyo0FAyW0TeHuLxronXkW18xbGcUCeGeOnk0CCq3W6Kl8gZ3OViSOqMctnmuMTptcchsU1ZsieUf4LAMHCfwxu00Hd2Nl8Rz'
    );


    const stripeCheckout = this.fns.httpsCallable("stripeCheckout2");

    this.tracking_number = `UMPSCCafe${Math.floor( Math.random() * 19999999 ) + 10000000}MY`;
    stripeCheckout({
        quantity:product.data.quantity,
        productname:product.id,
        amount:product.data.data.data.price,
        trackingnumber:this.tracking_number,
        compname:product.data.data.data.ingredient,
        studentname: this.studentname
    }).subscribe(result=>{
     
      this.stripe
        .redirectToCheckout({
          sessionId: result.session,
        })
        .then(function (result: { error: { message: any } }) {
          console.log(result.error.message);
        });
    })
    
  }
}
