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
  obj:Object[] = [];
  x3: any[] = [];
  obj2: any[]=[];
  x4:any[]=[];
  x5:any[]=[];
  stripe:any;
  donationAmount = 5.00;
  isGettingCheckout = false;

  constructor(
    private activatedroute: ActivatedRoute,
    private router: Router,
    private fs: AngularFirestore,
    private fns: AngularFireFunctions
  ) {
    

    this.checkoutInfo = this.router.getCurrentNavigation()?.extras.state;

    this.checkoutInfoarray = this.checkoutInfo;
    if (this.checkoutInfo == null) {
      this.router.navigateByUrl('/admincartpage');
    }

   
 
    console.log(this.compname);
    this.x1 = this.checkoutInfoarray?.sort(compare);

    this.x1.filter((data,index)=>{
     this.x2.push(data.compname)


    })


    this.compname.filter(res=>{
      console.log(res);
    })
    this.x3 = [...new Set(this.x2)];
    
    console.log(this.x1)

  
  
    function compare(a: any, b: any) {
      if (a.compname < b.compname) {
        return -1;
      }
      if (a.compname > b.compname) {
        return 1;
      }
      return 0;
    }


  }



  ngOnInit(): void {
  
  }

  hello(change:any){
    console.log(change);
  }


  async donate() {
    this.isGettingCheckout = true;
    this.stripe = await loadStripe('pk_test_51JWyo0FAyW0TeHuLxronXkW18xbGcUCeGeOnk0CCq3W6Kl8gZ3OViSOqMctnmuMTptcchsU1ZsieUf4LAMHCfwxu00Hd2Nl8Rz');
    const createCheckoutSession = this.fns.httpsCallable('createCheckoutSession');
    createCheckoutSession({
      product_name: 'Glass of Whiskey',
      quantity: 1,
      unit_amount: this.donationAmount
    })
      .toPromise()
      // Make the id field from the Checkout Session creation API response available to this file, so you can provide it as argument here
      // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
      // If `redirectToCheckout` fails due to a browser or network error, display the localized error message to your customer using `error.message`.
      .then((sessionId: string) => this.stripe.redirectToCheckout({sessionId}))
      .catch((e) => console.log('Error Buying a glass of whiskey', e))
      .finally(() => this.isGettingCheckout = false);
  }

}
