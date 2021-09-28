import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-suppliernavbarpage',
  templateUrl: './suppliernavbarpage.component.html',
  styleUrls: ['./suppliernavbarpage.component.css']
})
export class SuppliernavbarpageComponent implements OnInit {
  username$ : Observable<any> |undefined;
  constructor(private fauth:AngularFireAuth,private router:Router,private af:AngularFirestore) {
    this.fauth.authState.subscribe(res=>{
      let uid = res?.uid as string;
        this.username$ = this.af.collection('Supplier').doc(uid).valueChanges();
        this.username$.subscribe(res=>{
          console.log(res)
        })
        
    })
   }

  ngOnInit(): void {
  }


  logout(){
    this.fauth.signOut();
    this.router.navigateByUrl('')
  }
}
