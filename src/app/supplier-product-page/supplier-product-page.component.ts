import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { SupplierAddProductPageComponent } from '../supplier-add-product-page/supplier-add-product-page.component';
import { SupplierEditProductPageComponent } from '../supplier-edit-product-page/supplier-edit-product-page.component';

@Component({
  selector: 'app-supplier-product-page',
  templateUrl: './supplier-product-page.component.html',
  styleUrls: ['./supplier-product-page.component.css'],
})
export class SupplierProductPageComponent implements OnInit {
  submitted!: boolean;
  productDialog: boolean = false;
  product:any[] = []
  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private dD: DialogService,
    private fs:AngularFirestore,
    private fa:AngularFireAuth
  ) {
    this.fa.authState.subscribe(res=>{
      this.fs.collection('Supplier').doc(res?.uid).collection('menu').snapshotChanges().subscribe(res=>{
        this.product = []
        res.map(res=>{
          let obj = {
            id : res.payload.doc.id,
            data: res.payload.doc.data()
          }

          this.product.push(obj);

          console.log(this.product)
        })
      })
    })
  }

  ngOnInit(): void {}

  openNew() {
    const ref = this.dD.open(SupplierAddProductPageComponent, {
      header: 'Product Details',
      width: 'max-content',
      contentStyle: { 'max-height': 'max-content', overflow: 'auto' },
      baseZIndex: 10000,
    });

    ref.onClose.subscribe((res) => {
      console.log(res);

      if(res=='success'){
        this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Added Successfully!', life: 3000});
      }
    });
  }

  editProduct(product:any){
    const ref = this.dD.open(SupplierEditProductPageComponent, {
      header: 'Edit Product Details',
      width: 'max-content',
      contentStyle: { 'max-height': 'max-content', overflow: 'auto' },
      baseZIndex: 10000,
      data:product
    });

    ref.onClose.subscribe((res) => {
      console.log(res);

      if(res=='success'){
        this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Updated Successfully!', life: 3000});
      }
    });
  }

  deleteProduct(productid: any,product:any) {

    this.confirmationService.confirm({
        message: 'Are you sure you want to delete ' + product + '?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.fa.authState.subscribe(res=>{
            this.fs.collection('Supplier').doc(res?.uid).collection('menu').doc(productid).delete();
          })
         
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Deleted!', life: 3000});
        }
    });
}
}
