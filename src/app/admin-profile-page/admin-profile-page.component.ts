import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { AdminServiceService } from '../admin-service.service';

@Component({
  selector: 'app-admin-profile-page',
  templateUrl: './admin-profile-page.component.html',
  styleUrls: ['./admin-profile-page.component.css']
})
export class AdminProfilePageComponent implements OnInit {
  hide:any;
  form:any;
  data:any;
  name:any;
  phone:any;
  email:any;
  constructor(public asS:AdminServiceService,private fb:FormBuilder,private fs:AngularFirestore) {
    this.form = this.fb.group({
      name:[''],
      email:[''],
      phone:['',]
    })
  
  
   this.getInfo();  
 
   }

  ngOnInit(): void {
  }

  update(){
    this.asS.updateInfo(this.form.get('name').value,this.form.get('email').value,this.form.get('phone').value);

  }

  async getInfo():Promise<any>{
    this.data = await this.asS.getAdminInfo();
 
  
  }
}
