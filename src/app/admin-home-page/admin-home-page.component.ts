import { AngularFirestore } from '@angular/fire/firestore';
import { Component, ViewChild,AfterViewInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { param } from 'jquery';
import { AdminCartPageComponent } from '../admin-cart-page/admin-cart-page.component';
import * as moment from 'moment';
import { ChartDataset, ChartOptions } from 'chart.js';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-admin-home-page',
  templateUrl: './admin-home-page.component.html',
  styleUrls: ['./admin-home-page.component.css']
})
export class AdminHomePageComponent implements AfterViewInit {
 
  productname:any;
  productprice:any;
  action:any;
  username$ : Observable<any> |undefined;
  tracking_number:any;
  compname:any;
  id:any
  quantity:any;

  info:any[] = [];
  awaitLength:any =0;
  processLength:any = 0;
  completedLength:any = 0;
  confirm:any = false;
  processing:any = false;
  completed:any = false;
  totalsale:any;
  newTotal:any = 0
  info2:any[] = [];
  ingredient:any[] = []
  deduct:any = 0;
  inventory:any[] = [];
  totalDeduct: any =0;
  month:any
  months:any[]=[];
  order:any[] =[];
  topSale:any[] = [];
  topSale2:any[] = [];
  totalAmount = 0;
  sales:any [] =[]
  arraytotal:any []= []
  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: any[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July','August', 'September', 'October', 'November', 'December'];
  public barChartType:any = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData:any = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Unit' }
  ];


  constructor(private fauth:AngularFireAuth,private router:Router,private af:AngularFirestore,private aR:ActivatedRoute,private http:HttpClient) {
    const time = moment();

    this.months =  ['Select Month','January', 'February', 'March', 'April', 'May', 'June', 'July','August', 'September', 'October', 'November', 'December']

    this.af.collection("Admin").doc("oMWhzMQgufX3WpRQs9WsB4JmQFv2").collection("order").snapshotChanges().subscribe(res=>{
      this.info = []
      this.awaitLength = 0;
      this.processLength=0;
      this.completedLength=0;
      res.map(res=>{
         let obj = {
           id:res.payload.doc.id,
           data:res.payload.doc.data()
         }
        
         this.info.push(obj)

         if(obj.data.status =="await"){
           this.awaitLength += 1
         }else if(obj.data.status == "processing"){
           this.processLength += 1
         }else if(obj.data.status == "completed"){
           this.completedLength +=1
         }

      })
    })


this.aR.queryParams.subscribe(params =>{
  this.productname = params['productname'];
  this.productprice = params['amount'];
  this.action = params['action'];
  this.tracking_number = params['trackingnumber'];
  this.compname = params['compname']
  this.quantity = params['quantity']
});

  if(this.action =='success'){
    
    this.af.collection('Admin').doc('oMWhzMQgufX3WpRQs9WsB4JmQFv2').collection('cart').doc(this.productname).delete();
    this.af.collection('Supplier').get().subscribe(res=>{
      res.docs.forEach((res:any)=>{
        if(res.data().compname === this.compname){
          this.id = res.id;
          console.log("asd")
          this.af.collection('Supplier').doc(res.id).collection('menu').get().subscribe(res=>{
            console.log("asd")
            res.docs.forEach(res=>{
              console.log(res.data())
              if(res.data().brand === this.productname){
                console.log("asd")
                let newQuantity = res.data().quantity - this.quantity
                this.af.collection('Supplier').doc(this.id).collection('menu').doc(res.id).update({quantity:newQuantity});
              }
            })
          })
        }
      })
    })
    //Price,Supplier name, product name, quantity, total,status,uid
    // this.af.collection('Admin').doc('oMWhzMQgufX3WpRQs9WsB4JmQFv2').collection('payment').doc(this.productname).set();
    this.af.collection('Admin').doc('oMWhzMQgufX3WpRQs9WsB4JmQFv2').collection('payment').doc(this.tracking_number).update({status:'paid',ordertimestamp:time.format("MMMM Do YYYY, h:mm a")})
  }else if(this.action == "cancel"){
    this.af.collection('Admin').doc('oMWhzMQgufX3WpRQs9WsB4JmQFv2').collection('cart').doc(this.productname).delete();
  }

 
  this.af.collection("Admin").doc("oMWhzMQgufX3WpRQs9WsB4JmQFv2").collection("menu").snapshotChanges().subscribe(res=>{
    this.info2 = []
    res.map(res=>{
        let obj = {
          id:res.payload.doc.id,
          data:res.payload.doc.data()
        }

        this.info2.push(obj);

    })
  })
  

  this.af.collection("Admin").doc("oMWhzMQgufX3WpRQs9WsB4JmQFv2").collection("inventory").snapshotChanges().subscribe(res=>{
    this.inventory = []
      res.map(res=>{
        let obj = {
          id:res.payload.doc.id,
          data:res.payload.doc.data()
        }

        this.inventory.push(obj)
      })
  })


  this.af.collection("Admin").doc("oMWhzMQgufX3WpRQs9WsB4JmQFv2").collection("order").valueChanges().subscribe((res:any)=>{

    this.sales = []
      this.order = res
      this.order.forEach(res=>{

        if(res.status == "completed"){
          let timestamp = res.completetimestamp
          let getMonth = timestamp.split(' ')[0]
          let obj = {
            month: getMonth,
            quantity:res.quantity
          }

          this.sales.push(obj)
        }
       
  
        
      })

      this.arraytotal = []
      this.sales.forEach(res=>{
        let index = this.barChartLabels.findIndex(c=>{
          return c == res.month
        })
      
        console.log(index)
       
     
        if(this.arraytotal.length == 0){
          this.arraytotal[index] = parseInt(res.quantity)
        }else if(this.arraytotal[index] == undefined){
          this.arraytotal[index] = parseInt(res.quantity)
        }else{
          let temp = this.arraytotal[index];
          let total = parseInt(temp) + parseInt(res.quantity)
          this.arraytotal[index] = total
        }
        
        this.barChartData = [
          { data: this.arraytotal, label: 'Unit' }
        ];
        
      })
    
  })


  

 

  }

  
  ngAfterViewInit(): void {
    
  }


  showConfirm() {
    this.confirm = !this.confirm;
  }

  showProcessing(){
    this.processing = !this.processing;
  }

  showCompleted(){
    this.completed  = !this.completed
  }


  acceptOrder(x:any){

    this.af.collection("Admin").doc('oMWhzMQgufX3WpRQs9WsB4JmQFv2').collection("order").doc(x.id).update({status:"processing"})
    
  }

  async completeOrder(x:any){
   let time = moment();
    console.log(x)
    this.af.collection("Admin").doc('oMWhzMQgufX3WpRQs9WsB4JmQFv2').collection("order").doc(x.id).update({status:"completed"})


   this.info2.forEach(res=>{


     if(x.data.productname == res.id){
       this.totalsale = res.data.totalsale
       this.ingredient = res.data.ingredient
     }
   })
    

    
   this.newTotal = parseInt(x.data.quantity) + this.totalsale;

  this.af.collection("Admin").doc("oMWhzMQgufX3WpRQs9WsB4JmQFv2").collection("menu").doc(x.data.productname).update({totalsale:this.newTotal})




   this.ingredient.forEach(data=>{
     console.log(data)
      

      this.inventory.forEach(res=>{
        if(res.id == data.ingredient){
          this.deduct = data.ingredientQuantity * parseInt(x.data.quantity) 
          this.totalDeduct = res.data.quantity - this.deduct

          console.log(this.totalDeduct)
          this.af.collection("Admin").doc("oMWhzMQgufX3WpRQs9WsB4JmQFv2").collection("inventory").doc(res.id).update({quantity:this.totalDeduct})
        }
      })
   })

    this.info2.forEach(res=>{
 

      if(res.id == x.data.productname){
        let currentstock = parseInt(res.data.stock);
        let newStock = currentstock - x.data.quantity;
        this.af.collection("Admin").doc("oMWhzMQgufX3WpRQs9WsB4JmQFv2").collection("menu").doc(res.id).update({stock:newStock})
      }
    })

  this.af.collection("Admin").doc("oMWhzMQgufX3WpRQs9WsB4JmQFv2").collection("order").doc(x.id).update({completetimestamp:time.format("MMMM Do YYYY, h:mm a")})
  }

  displayTop(month:any){
    console.log(month)
    this.totalAmount = 0
    this.topSale = []
    this.order.forEach(res=>{

      if(res.status == "completed"){
        let timestamp = res.completetimestamp
        let getMonth = timestamp.split(' ')[0]
        if(getMonth == month){
          this.topSale.push(res)
        }
      }
     

      
    })
   

    console.log(this.topSale)
   

    this.topSale.forEach(res=>{
      this.totalAmount += (res.amount * res.quantity)
    })
  }

}

