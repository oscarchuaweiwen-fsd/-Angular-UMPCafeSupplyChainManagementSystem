import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { ConfirmationService, MessageService, PrimeNGConfig } from 'primeng/api';
import * as moment from 'moment';
@Component({
  selector: 'app-supplier-order-page',
  templateUrl: './supplier-order-page.component.html',
  styleUrls: ['./supplier-order-page.component.css']
})
export class SupplierOrderPageComponent implements OnInit {
  product:any[] = [];
  msgs:any;
  time: moment.Moment;
  constructor(private fs:AngularFirestore,private fa: AngularFireAuth,private confirmationService: ConfirmationService, private primengConfig: PrimeNGConfig, private messageService: MessageService) {
   this.time = moment();

    this.fa.authState.subscribe(res=>{
      this.fs.collection('Supplier').doc(res?.uid).valueChanges().subscribe((res:any)=>{
        let compname = res.compname
        this.fs.collection('Admin').doc('oMWhzMQgufX3WpRQs9WsB4JmQFv2').collection('payment').snapshotChanges().subscribe(res=>{
          this.product = [];
          res.map(res=>{
         
            if(res.payload.doc.data().compname == compname && res.payload.doc.data().status == 'paid'){
             
              let obj = {
                trackingNumber: res.payload.doc.id,
                data:res.payload.doc.data()
              }

              this.product.push(obj);
            }
          })
        })
      })
    })


    
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
  }

  confirmOrder(product:any){
    this.confirmationService.confirm({
      message: 'Are you sure that you want to confirm the order?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          console.log(product);
          this.fs.collection('Admin').doc('oMWhzMQgufX3WpRQs9WsB4JmQFv2').collection('payment').doc(product.trackingNumber).update({status:"toship",preparetimestamp:this.time.format("MMMM Do YYYY, h:mm a")}).then(() => {
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'Order Confirmed Successfully!', life: 3000})
          })
          
      }
  });
  }
}
