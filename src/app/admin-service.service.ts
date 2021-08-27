import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminServiceService {
  tableinfo$: Observable<any> | undefined;
  data: object[] = [];
  temp:any = false;
  index:number = 1;
  public isLoading:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.temp);

  constructor(private fs: AngularFirestore) {}

  async getInventoryInfo():Promise<any> {
    return new Promise((resolve, reject) => {
      
       
        

    })
  
  }

  // getInfo2():any{
  //   let x;
  //   this.tableinfo$ = this.fs
  //   .collection('Admin')
  //   .doc('oMWhzMQgufX3WpRQs9WsB4JmQFv2')
  //   .collection('inventory')
  //   .snapshotChanges();

  // this.tableinfo$.subscribe((res) => {
  //   this.data = [];
    
  //   res.map((data: any) => {
  //     let obj = {
  //       x:this.index++ + ".",
  //       id: data.payload.doc.id,
  //       key: data.payload.doc.data().quantity,
  //       lowestmargin:data.payload.doc.data().lowestmargin
  //     };

  //      this.data.push(obj);
  //   x = this.data
  //     console.log(this.data)
  //     return x;
     
  //   });
  //   })

 
  // }
}
