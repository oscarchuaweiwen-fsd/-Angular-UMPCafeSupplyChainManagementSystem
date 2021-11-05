import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
@Component({
  selector: 'app-student-navbar-page',
  templateUrl: './student-navbar-page.component.html',
  styleUrls: ['./student-navbar-page.component.css']
})
export class StudentNavbarPageComponent implements OnInit {
  username$! : Observable<any> ;
  constructor(private fauth:AngularFireAuth,private router:Router,private af:AngularFirestore) {
    this.fauth.authState.subscribe(res=>{
      let uid = res?.uid as string;
        this.username$ = this.af.collection('Student').doc(uid).valueChanges();
        this.username$.subscribe(res=>{

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
