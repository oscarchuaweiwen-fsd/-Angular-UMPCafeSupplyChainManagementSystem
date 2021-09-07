import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';

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
  constructor(
    private activatedroute: ActivatedRoute,
    private router: Router,
    private fs: AngularFirestore
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
}
