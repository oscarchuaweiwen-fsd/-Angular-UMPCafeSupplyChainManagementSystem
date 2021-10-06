import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-supplier-profile-page',
  templateUrl: './supplier-profile-page.component.html',
  styleUrls: ['./supplier-profile-page.component.css']
})
export class SupplierProfilePageComponent implements OnInit {
  updateProfile:any;
  supplierInfo:any;
  compname:any;
  phone:any;
  email:any;
  uid:any;
  constructor(private fb:FormBuilder,private fs:AngularFirestore,private fa:AngularFireAuth) { 
    this.fa.authState.subscribe(async res=>{
      this.uid =res?.uid;
   this.fs.collection('Supplier').doc(res?.uid).valueChanges().subscribe(res => {
       this.supplierInfo = res;
      });
    })

    this.updateProfile = this.fb.group({
      compname:[],
      phone:[],
      email:[]
    })
  }

  ngOnInit(): void {
   
  }

  update(c:any,p:any,e:any){
    console.log(c.value,p.value,e.value)
    this.fa.authState.subscribe( res=>{
      this.fs.collection('Supplier').doc(this.uid).update({compname:c.value,phone:p.value,email:e.value})
       })
  }

}
