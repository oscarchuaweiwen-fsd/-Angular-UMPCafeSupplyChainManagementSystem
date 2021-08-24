import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-home-page',
  templateUrl: './admin-home-page.component.html',
  styleUrls: ['./admin-home-page.component.css']
})
export class AdminHomePageComponent implements OnInit {

  constructor(private fauth:AngularFireAuth,private router:Router) { }

  ngOnInit(): void {
  }

  logout(){
    this.fauth.signOut();
    localStorage.removeItem('admin');
    this.router.navigateByUrl('');
  }
}
