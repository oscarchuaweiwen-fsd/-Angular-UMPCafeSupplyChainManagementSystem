
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminServiceService {
  tableinfo$: Observable<any> | undefined;
  data: object[] = [];
  temp:any = true;
  index:number = 1;
  name:any;
  uid:any;
  
  public isLoading:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.temp);

  constructor(private fs: AngularFirestore,private auth:AngularFireAuth) {
    this.auth.authState.subscribe(res=>{
      this.uid = res?.uid;
      
      this.fs.collection('Admin').doc(res?.uid).valueChanges().subscribe(res=>{
        this.name =res;
        console.log(this.name);
       this.isLoading = new BehaviorSubject<boolean>(false);
       
      })
    })
    
  }

  async getAdminInfo():Promise<any> {
    return new Promise((resolve, reject) => {
      this.auth.authState.subscribe(res=>{
        let x = this.fs.collection('Admin').doc(res?.uid).valueChanges();
      x.subscribe(res=>{
        console.log(res);
       resolve(res);
      })
      })
      
    })
  
  }


  updateInfo(un:any,e:any,p:any){
   
    this.fs.collection('Admin').doc(this.uid).update({username:un,email:e,phone:p});
    this.auth.authState.subscribe(res=>{
      res?.updateEmail(e);
    })
  }

  async getPurchaseHistory(category:any):Promise<any>{
    return new Promise((resolve, reject) => {
      
    })
    
    
  }

  async getcartInfo():Promise<any>{

    return new Promise((resolve, reject) => {
      let customer:any[] = []
      this.fs.collection('Admin').doc('oMWhzMQgufX3WpRQs9WsB4JmQFv2').collection('cart').snapshotChanges().subscribe(res=>{
  
        res.map(res=>{
          console.log(res);
          let obj = {
            brand:res.payload.doc.data().brand,
            compname:res.payload.doc.data().compname,
            price:res.payload.doc.data().price,
            quantity:res.payload.doc.data().quantity,
            totalprice:res.payload.doc.data().totalprice
          }
  
          customer.push(obj)
          resolve(customer) 
        
        })
      })
    })
 
  }

  async getSupplierInfo(){
    return new Promise((resolve, reject) =>{
      let compname:any[];
      this.fs
      .collection('Supplier')
      .snapshotChanges()
      .subscribe((data) => {
        data.map((data: any) => {
          let obj = {
          compname : data.payload.doc.data().compname,
           shippingfee : data.payload.doc.data().shippingfee
          }
          
          compname.push(obj);

          resolve(compname);
        });
      });
    })
  }


}
