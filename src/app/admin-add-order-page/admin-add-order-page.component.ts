import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'jquery';
import { Observable,merge } from 'rxjs';


@Component({
  selector: 'app-admin-add-order-page',
  templateUrl: './admin-add-order-page.component.html',
  styleUrls: ['./admin-add-order-page.component.css']
})
export class AdminAddOrderPageComponent implements OnInit {
  supplierid:object[]= [];
  overallmenu:any []= [];
  supplier:Observable<any>[] = []
  constructor(private fs:AngularFirestore) {
    this.fs.collection('Supplier').snapshotChanges().subscribe(res=>{
      console.log("Most OUtiside")
      
      let x = merge(res);
      x.subscribe(res=>{

        console.log(typeof(res.payload.doc.id));
        this.fs.collection('Supplier').doc(res.payload.doc.id).collection('Menu').snapshotChanges().subscribe(res=>{
          res.map(res=>{
            if(res.type =="added"){
              console.log(res.payload.doc.id );
              console.log(res.payload.doc.data())


                this.overallmenu.push(res.payload.doc.data())
            }
          })
        })
      })
   
      
  
    })
   
  
    

  
  }

  ngOnInit(): void {
  }


  getInfo(){
    console.log(this.overallmenu);
  }
}
