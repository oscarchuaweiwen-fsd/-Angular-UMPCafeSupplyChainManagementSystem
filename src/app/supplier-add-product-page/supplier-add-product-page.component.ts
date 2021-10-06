import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

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
    private fa: AngularFireAuth
  ) {
    this.addProductForm = fb.group({
      brand: [],
      category: [],
      price: [],
      quantity: [],
    });
  }

  ngOnInit(): void {}

  add() {
    this.ref.close("success")
    this.fa.authState.subscribe((res) => {
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
          
        });
    });
  }
}
