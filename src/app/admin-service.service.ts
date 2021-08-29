
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


}
