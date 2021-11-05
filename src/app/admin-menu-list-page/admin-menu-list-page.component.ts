import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {MessageService} from 'primeng/api';
import {DialogService} from 'primeng/dynamicdialog';
import {DynamicDialogRef} from 'primeng/dynamicdialog';
import { ConfirmationService } from 'primeng/api';
import * as firebase from 'firebase/app';
import { AdminAddMenuListPageComponent } from '../admin-add-menu-list-page/admin-add-menu-list-page.component';



@Component({
  selector: 'app-admin-menu-list-page',
  templateUrl: './admin-menu-list-page.component.html',
  styleUrls: ['./admin-menu-list-page.component.css']
})
export class AdminMenuListPageComponent implements OnInit {
  products:any[] = [];
  ref!: DynamicDialogRef;
  selectedProducts:any[] = [];
  productDialog: boolean = false;
  indexOfElement: any;
  menulist: any[]=[];
  subscribe: any;
  ingredient: any[] = [];
  ingredient2: any[] = [];
  checkStatus:any[]= [];
  checkStatus2:any[]= [];


  x4!:any[];
  x5:any[] = [];
  constructor(private confirmationService: ConfirmationService,public dialogService: DialogService, public messageService: MessageService,private fs:AngularFirestore) { 
    this.fs.collection('Admin').doc('oMWhzMQgufX3WpRQs9WsB4JmQFv2').collection('menu').snapshotChanges().subscribe(res=>{
      this.products = [];
      res.map(res=>{

        let obj={
          productname:res.payload.doc.id,
          price:res.payload.doc.data().price,
          ingredient:res.payload.doc.data().ingredient,
          imageLink:res.payload.doc.data().imageLink
        }

        this.products.push(obj);
        console.log(obj)
      })
    })

    this.subscribe =  this.fs.collection('Admin').doc('oMWhzMQgufX3WpRQs9WsB4JmQFv2').collection('menu').snapshotChanges().subscribe(res=>{
      this.menulist = [];
      this.ingredient=[];
      res.map(res=>{
        this.menulist.push(res.payload.doc.id);

      
        this.ingredient.push(res.payload.doc.data().ingredient);

      })
    })


    // x4 - menu list
    this.fs.collection('Admin').doc('oMWhzMQgufX3WpRQs9WsB4JmQFv2').collection('menu').snapshotChanges().subscribe(res=>{
      this.x4 = [];
      res.map(async res=>{
        let obj = {
          id: res.payload.doc.id,
          data: res.payload.doc.data().ingredient
        }
        await this.x4.push(obj);
       
      })
    })


    // x5 - ingredient list
    this.fs.collection('Admin').doc('oMWhzMQgufX3WpRQs9WsB4JmQFv2').collection('inventory').snapshotChanges().subscribe(res=>{
      this.x5 = [];

      res.map(async res=>{
        let obj = {
          id: res.payload.doc.id,
          data: res.payload.doc.data()
        }
        await this.x5.push(obj);


        this.x4.forEach((res,index)=>{
          let info:[] = res.data;

          info.forEach(res=>{
            let data:any = res
            this.x5.forEach(res=>{
              if(res.id === data.ingredient){
          
                if(res.data.quantity<=data.ingredientQuantity ){
                  console.log(data,index)
                }
              }
            })
          })
        })
      })
    })
  }

  ngOnInit(): void {
    this.showQuantity()
  }

  ngOnDestroy() {
    this.subscribe.unsubscribe();
  }

  showQuantity(){
    console.log(this.x4);
  }


  show(){
    this.ref = this.dialogService.open(AdminAddMenuListPageComponent, {
      header: 'Add New Product to Menu',
      width: '70%',
      contentStyle: {"max-height": "500px", "overflow": "auto"},
      baseZIndex: 10000
  });

  this.ref.onClose.subscribe((product) =>{
      if (product) {
          this.messageService.add({severity:'info', summary: 'Product Selected', detail: product.name});
      }
  });
  }

  show2(index:any,i:any){
    this.productDialog = true;
    this.indexOfElement = i;
    console.log(index,i);

    this.ingredient2 = this.ingredient[i];
    }

  deleteProduct(product: any) {
    console.log("Hello World");
    this.confirmationService.confirm({
        message: 'Are you sure you want to delete ' + product + '?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
           this.fs.collection('Admin').doc('oMWhzMQgufX3WpRQs9WsB4JmQFv2').collection('menu').doc(product).delete();
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
        }
    });
}

addNewIngredient(i: any, iq: any) {
  let obj = {
    ingredient: i.value,
    ingredientQuantity: iq.value,
  };

  this.ingredient2.push(obj);

  console.log(this.ingredient);
}


delete(index:any){
  this.ingredient2.splice(index,1);
  console.log(this.ingredient);
  // this.fs.collection('Admin').doc('oMWhzMQgufX3WpRQs9WsB4JmQFv2').collection('menu').doc("Nasi Lemak").update({ingredient:firebase.default.firestore.FieldValue.delete()})
}

update(brand:any,price:any,imageLink:any){
  console.log(brand);
  let x = this.products[this.indexOfElement].productname;
  console.log(this.products[this.indexOfElement]);
  
  if(brand !== this.products[this.indexOfElement].productname){
    this.fs.collection('Admin').doc('oMWhzMQgufX3WpRQs9WsB4JmQFv2').collection('menu').doc(brand).set({price:price,ingredient:this.ingredient2,imageLink:imageLink}).then(res=>{
      this.fs.collection('Admin').doc('oMWhzMQgufX3WpRQs9WsB4JmQFv2').collection('menu').doc(x).delete();
    })
  }else{
    this.fs.collection('Admin').doc('oMWhzMQgufX3WpRQs9WsB4JmQFv2').collection('menu').doc(x).update({price:price,ingredient:this.ingredient2,imageLink:imageLink});
  }
  }
  
hello(x:any){
  console.log(x);
}
 
}



