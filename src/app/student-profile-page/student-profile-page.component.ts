import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-student-profile-page',
  templateUrl: './student-profile-page.component.html',
  styleUrls: ['./student-profile-page.component.css']
})
export class StudentProfilePageComponent implements OnInit {
  updateProfile:any;
  supplierInfo:any;
  uid:any;
  constructor(private fb:FormBuilder,private fs:AngularFirestore,private fa:AngularFireAuth) {  
    this.updateProfile = fb.group({
      studname:[],
      phone:[],
      email:[]
    })

    this.fa.authState.subscribe(res=>{
      this.uid = res?.uid;

      this.fs.collection("Student").doc(res?.uid).valueChanges().subscribe(res=>{
        this.supplierInfo = res
      })
    })

  }

  ngOnInit(): void {
  }


  update(c:any,p:any,e:any){

    console.log(c.value,p.value,e.value)
    this.fs.collection("Student").doc(this.uid).update({name:c.value,phone:p.value,email:e.value})
  }
}
