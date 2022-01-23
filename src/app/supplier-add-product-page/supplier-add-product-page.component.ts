import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { AuthService } from '../authService/auth.service';

@Component({
  selector: 'app-supplier-add-product-page',
  templateUrl: './supplier-add-product-page.component.html',
  styleUrls: ['./supplier-add-product-page.component.css'],
})
export class SupplierAddProductPageComponent implements OnInit {
  addProductForm: any;
  constructor(
    public ref: DynamicDialogRef,
    private fb: FormBuilder,
    private fs: AngularFirestore,
    private fa: AngularFireAuth,
    private auth:AuthService
  ) {
    this.addProductForm = fb.group({
      brand: [],
      category: [],
      price: [],
      quantity: [],
    });

    this.fa.authState.subscribe(res=>{
      console.log(res?.uid);
    })
  }

  ngOnInit(): void {}

  add() {
  
    this.fa.authState.subscribe((res) => {
      console.log(res?.uid)
      this.fs
        .collection('Supplier')
        .doc(res?.uid)
        .collection('menu')
        .doc()
        .set({
          brand: this.addProductForm.get('brand').value,
          category: this.addProductForm.get('category').value,
          price:this.addProductForm.get('price').value,
          quantity: this.addProductForm.get('quantity').value,
          rating:0,
          ratingTotal:0,
          totalSale:0
        }).then(() => {
          this.ref.close("success")
        });
    });
  }
}
