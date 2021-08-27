import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-adminnavbarpage',
  templateUrl: './adminnavbarpage.component.html',
  styleUrls: ['./adminnavbarpage.component.css']
})
export class AdminnavbarpageComponent implements OnInit {
  username$ : Observable<any> |undefined;
  constructor(private fauth:AngularFireAuth,private router:Router,private af:AngularFirestore) {
    this.fauth.authState.subscribe(res=>{
      let uid = res?.uid as string;
        this.username$ = this.af.collection('Admin').doc(uid).valueChanges();
      
        
    })
   }

  ngOnInit(): void {
  }


  logout(){
    this.fauth.signOut();
    localStorage.removeItem('admin');
    this.router.navigateByUrl('');
  }
}
