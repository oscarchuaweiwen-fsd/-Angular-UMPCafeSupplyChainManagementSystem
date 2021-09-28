import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { loadStripe } from '@stripe/stripe-js';
import { AngularFireFunctions } from '@angular/fire/functions';


@Component({
  selector: 'app-admin-check-out-page',
  templateUrl: './admin-check-out-page.component.html',
  styleUrls: ['./admin-check-out-page.component.css'],
})
export class AdminCheckOutPageComponent implements OnInit {
  checkoutInfo: any;
  checkoutInfoarray: any[] = [];
  compname: any[] = [];
  sortedCheckoutInfo: any[] | undefined;
  x1: any[];
  x2: any[] = [];
  x = 0;
  obj: Object[] = [];
  x3: any[] = [];
  obj2: any[] = [];
  x4: any[] = [];
  x5: any[] = [];
  stripe: any;
  donationAmount = 5.0;
  isGettingCheckout = false;
  finalPrice:any =0;
  finalQuantity: any=0;
  finalProduct: any[]= [];


  constructor(
    private activatedroute: ActivatedRoute,
    private router: Router,
    private fs: AngularFirestore,
    private fns: AngularFireFunctions
  ) {
    this.fs
      .collection('Supplier')
      .snapshotChanges()
      .toPromise()
      .then((res) => {
        console.log(res);
      });

    this.checkoutInfo = this.router.getCurrentNavigation()?.extras.state;

    this.checkoutInfoarray = this.checkoutInfo;
    if (this.checkoutInfo == null) {
      this.router.navigateByUrl('/admincartpage');
    }

    this.x1 = this.checkoutInfoarray?.sort(compare);

    this.x1.filter((data, index) => {
      this.x2.push(data.compname);
    });

    this.compname.filter((res) => {});
    this.x3 = [...new Set(this.x2)];

    function compare(a: any, b: any) {
      if (a.compname < b.compname) {
        return -1;
      }
      if (a.compname > b.compname) {
        return 1;
      }
      return 0;
    }

    this.checkoutInfo.filter((x: any) => {
      if (x.compname === 'Oscar Food Sdn Bhd') {
      
        let totalprice = 0;
        totalprice += +x.totalprice;
        let totalquantity=0;
        totalquantity += x.quantity;
    
        this.x4.push({ brand:x.brand,tp: totalprice,quantity:totalquantity });
      } else if (x.compname === 'Fanny Food Sdn Bhd') {
        let totalprice = 0;
        totalprice += +x.totalprice;
        let totalquantity=0;
        totalquantity += x.quantity;
        this.x5.push({ brand:x.brand,tp: totalprice,quantity:totalquantity });
      }
    });

    this.x4.forEach(res=>{
      console.log(res);
      this.finalProduct.push(res.brand);
      this.finalPrice+= res.tp;
      this.finalQuantity+= res.quantity;
      console.log(this.finalQuantity);
    })

    this.x5.forEach(res=>{
      console.log(res);
      this.finalProduct.push(res.brand);
      this.finalPrice+= res.tp;
      this.finalQuantity+= res.quantity;
      console.log(this.finalQuantity);
    })
  }

  ngOnInit(): void {}

  async pay(compname1:any,finalPrice:any,finalProduct:any) {
    this.fs.collection('Admin').doc('oMWhzMQgufX3WpRQs9WsB4JmQFv2').collection('payment').doc(finalProduct).set({status:'unpaid',id:"result"});
    console.log(compname1,finalProduct,finalPrice)
    this.isGettingCheckout = true;

    // this.stripe = await loadStripe(
    //   'pk_test_51JWyo0FAyW0TeHuLxronXkW18xbGcUCeGeOnk0CCq3W6Kl8gZ3OViSOqMctnmuMTptcchsU1ZsieUf4LAMHCfwxu00Hd2Nl8Rz'
    // );

    // const createCheckoutSession = this.fns.httpsCallable('stripeCheckout');
    //  createCheckoutSession({
    //   productname: finalProduct,
    //   quantity:1,
    //   amount:finalPrice,
    //   compname:compname1
    // }).subscribe((result) => {
    //   console.log({ result });
    //   console.log(finalProduct,result);
    //   this.paymentDb(finalProduct,result);
    //   localStorage.setItem('stripeCheckout', result);
    //   this.stripe
    //     .redirectToCheckout({
    //       sessionId: result,
    //     })
    //     .then(function (result: { error: { message: any } }) {
    //       console.log(result.error.message);
    //     });
    // });
  }


}
