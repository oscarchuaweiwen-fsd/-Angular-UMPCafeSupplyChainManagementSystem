import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-supplier-edit-product-page',
  templateUrl: './supplier-edit-product-page.component.html',
  styleUrls: ['./supplier-edit-product-page.component.css'],
})
export class SupplierEditProductPageComponent implements OnInit {
  editProductForm: any;
  productInfo: any;
  constructor(
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private fb: FormBuilder,
    private fs: AngularFirestore,
    private fa: AngularFireAuth
  ) {
    this.productInfo = this.config.data;
  }

  ngOnInit(): void {
    this.editProductForm = this.fb.group({
      brand: [this.productInfo.data.brand],
      category: [this.productInfo.data.category],
      quantity: [this.productInfo.data.quantity],
      price: [this.productInfo.data.price],
    });
  }

  edit() {

    this.fa.authState.subscribe((res) => {
      this.fs
        .collection('Supplier')
        .doc(res?.uid)
        .collection('menu')
        .doc(this.productInfo.id)
        .update({
          brand: this.editProductForm.get('brand').value,
          price: this.editProductForm.get('price').value,
          category: this.editProductForm.get('category').value,
          quantity: this.editProductForm.get('quantity').value,
        }).then(() => {
          this.ref.close("success")
        });
    });
  }
}
