import { map } from 'rxjs/operators';

import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, merge } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';



@Component({
  selector: 'app-admin-add-order-page',
  templateUrl: './admin-add-order-page.component.html',
  styleUrls: ['./admin-add-order-page.component.css'],
})
export class AdminAddOrderPageComponent implements OnInit {
  supplierid: object[] = [];
  overallmenu: any[] = [];
  supplier: Observable<any>[] = [];
  loader: boolean = true;
  cart: any[] = [];
  newArray :any[]= [];
  panelOpenState:any;
  status = 'ONLINE';
  isConnected = true;
  newCategory:any[]=[];
  displayedColumns: string[] = ['brand', 'rating', 'price', 'action'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  checkDuplicate:any[] =[];
  filter2:any[] = [];
  filter3:any[] = [];
  cartlength:any;
  quantity:any[]=[];
 temp: any[] = []
 isModified:boolean = false;
 isExisted:boolean | undefined;
  constructor(private fs: AngularFirestore) {


    this.fs.collection('Supplier').snapshotChanges().subscribe(data=>{
    

      data.map(data=>{
          
      let compname = data.payload.doc.data();
        this.fs.collection('Supplier').doc(data.payload.doc.id).collection('menu').snapshotChanges().subscribe(res=>{
          res.map(res=>{
            if(res.type == 'added'){

              let obj = {
                compname: compname,
                brand:res.payload.doc.data().brand,
                rating:res.payload.doc.data().rating,
                price: res.payload.doc.data().price,
                category:res.payload.doc.data().category
              }

              this.overallmenu.push(obj);
                  this.dataSource = new MatTableDataSource(this.overallmenu);
                  this.dataSource.paginator = this.paginator;
                  this.dataSource.sort = this.sort;
            }
          })
        })
      })
    })

this.fs.collection('Admin').doc("oMWhzMQgufX3WpRQs9WsB4JmQFv2").collection("cart").snapshotChanges().subscribe(res=>{
  this.filter2 = [];
      this.cartlength = res.length;
      res.map(res=>{
        console.log(res);
        
        let obj = {brand:res.payload.doc.id,quantity:res.payload.doc.data().quantity,price:res.payload.doc.data().price}
        this.filter2.push(obj);
      
        this.filter3 = [...new Set(this.filter2)]
        
      })
    })

  }

  ngOnInit(): void {}

  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  filter(){
 
      for (let index = 0; index < this.overallmenu.length; index++) {
          
       this.newArray.push(this.overallmenu[index].category)
        
      }
    
      this.newCategory = [...new Set(this.newArray)];
      
  }

  filterCategory(category:any){
    console.log(category)


    if(category == 'clear'){
      this.dataSource = new MatTableDataSource(this.overallmenu);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }else{
      let x = this.overallmenu.filter(res=>{
        if(res.category == category){
          return res;
        }
      
      })
  
  
     
      this.dataSource = new MatTableDataSource(x);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }

  }
 
  addtocart(brand:any,price:number,compname:any){
    let totalprice = price;
    const price1:number=price
    if(this.filter3.length == 0){
      this.fs.collection('Admin').doc("oMWhzMQgufX3WpRQs9WsB4JmQFv2").collection('cart').doc(brand).set({quantity:1,price:price1,brand:brand,compname:compname,totalprice:totalprice})
    }
  for (let index = 0; index < this.filter3.length; index++) {
    let array: any[] = [];
    
    const element = this.filter3[index];

  
    this.filter3.filter(res=>{
      array.push(res.brand)
  
      this.isExisted = true
    })
 
    if(array.includes(brand) == false){
      this.isExisted = false;

    }
  
      if(element.brand == brand){
       
        const quantity:number = this.filter3[index].quantity;
        const newquantity = quantity+1;
        console.log(index)
        const totalprice = newquantity * price1;
        this.fs.collection('Admin').doc("oMWhzMQgufX3WpRQs9WsB4JmQFv2").collection('cart').doc(brand).update({quantity:newquantity,price:price1,brand:brand,compname:compname,totalprice:totalprice})

        
      }else if(this.isExisted === false){
        this.fs.collection('Admin').doc("oMWhzMQgufX3WpRQs9WsB4JmQFv2").collection('cart').doc(brand).set({quantity:1,price:price1,brand:brand,compname:compname})
      }
    }
    
  }

  reload(){
    window.location.reload();
  }
}
