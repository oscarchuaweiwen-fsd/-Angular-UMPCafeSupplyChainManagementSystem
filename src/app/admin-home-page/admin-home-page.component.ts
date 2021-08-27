import { AngularFirestore } from '@angular/fire/firestore';
import { Component, ViewChild,AfterViewInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-admin-home-page',
  templateUrl: './admin-home-page.component.html',
  styleUrls: ['./admin-home-page.component.css']
})
export class AdminHomePageComponent implements AfterViewInit {


  username$ : Observable<any> |undefined;

  constructor(private fauth:AngularFireAuth,private router:Router,private af:AngularFirestore) {
    

  }
  ngAfterViewInit(): void {

  }

}

