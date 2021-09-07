import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-cart-page',
  templateUrl: './admin-cart-page.component.html',
  styleUrls: ['./admin-cart-page.component.css'],
})
export class AdminCartPageComponent implements OnInit {
  products: any[] = [];

  selectedProducts3: any[] = [];

  selectedProduct3: any;

  cartinfo: any[] = [];

  cartinfo2: Object[] = [];

  isMofile: boolean = false;

  difference: any = 0;

  x: any = 0;

  checkInfo2: Object[] = [];

  totalprice: any = 0;

  checked: boolean = false;

  overallprice: any = 0;

  overallquantity: any = 0;

  quantity!: any;

  checkInfo: any[] = [];

  x1: any[] = [];

  newprice: any;

  status: boolean | undefined;

  temp: any;

  x2: any[] = [];

  x3: any[] = [];

  x4: any[] = [];

  total: any = 0;

  total2: any = 0;

  disablequantity!: boolean;

  constructor(private fs: AngularFirestore, private router: Router) {
    this.fs

      .collection('Admin')

      .doc('oMWhzMQgufX3WpRQs9WsB4JmQFv2')

      .collection('cart')

      .snapshotChanges()

      .subscribe((res) => {
        this.cartinfo = [];

        res.map((res) => {
          this.totalprice =
            Number(res.payload.doc.data().quantity) *
            res.payload.doc.data().price;

          let obj = {
            brand: res.payload.doc.data().brand,

            price: res.payload.doc.data().price,

            quantity: res.payload.doc.data().quantity,

            compname: res.payload.doc.data().compname,

            totalprice: this.totalprice,
          };

          this.cartinfo.push(obj);

          this.products = this.cartinfo;
        });
      });

    this.fs
      .collection('Admin')
      .doc('oMWhzMQgufX3WpRQs9WsB4JmQFv2')
      .collection('checkout');
  }

  ngOnInit(): void {}

  info(product: any, row: any, check: any, $event: any): void {
    this.status = check.checked;

    if (check.checked) {
      this.x1.push(product);
      this.fs
        .collection('Admin')
        .doc('oMWhzMQgufX3WpRQs9WsB4JmQFv2')
        .collection('checkout')
        .doc(product.brand)
        .set(product);
      this.overallprice += check.value.totalprice;

      this.disablequantity = true;

      this.overallquantity += check.value.quantity;

      this.x3.push(row);
    } else if (!check.checked) {
      this.x1.splice(row, 1);
      this.fs
        .collection('Admin')
        .doc('oMWhzMQgufX3WpRQs9WsB4JmQFv2')
        .collection('checkout')
        .doc(product.brand)
        .delete();
      this.x3.splice(row - this.cartinfo.length, 1);

      this.disablequantity = false;

      this.overallprice -= check.value.totalprice;

      this.overallquantity -= check.value.quantity;
    }

    let x = [...new Set(this.x3)];

    if (this.x3.length === 0) {
      this.overallprice = 0;

      this.overallquantity = 0;
    }

    this.fs

      .collection('Admin')

      .doc('oMWhzMQgufX3WpRQs9WsB4JmQFv2')

      .collection('cart')

      .doc(product.brand)

      .update({ totalprice: product.totalprice, quantity: product.quantity });
  }

  quantityControl(rowIndex: any, test: number, brand: any, price: any) {
    this.total = 0;

    this.total2 = 0;

    let newprice = test * price;

    this.x2 = [];

    this.x4 = [];

    this.cartinfo.forEach((res) => {
      let xa = res.quantity * res.price;

      this.x2.push(xa);

      this.x4.push(res.quantity);

      console.log(this.x2);

      console.log(this.x4);
    });

    for (let index = 0; index < this.x3.length; index++) {
      const element = this.x3[index];

      let x = this.x2[index];

      let y = this.x4[index];

      this.total += x;

      this.total2 += y;

      console.log(x);

      console.log(y);
    }

    this.overallprice = this.total;

    this.overallquantity = this.total2;

    this.fs

      .collection('Admin')

      .doc('oMWhzMQgufX3WpRQs9WsB4JmQFv2')

      .collection('cart')

      .doc(brand)

      .update({ quantity: test, totalprice: newprice });
  }

  totalBar() {
    this.x1.forEach((res) => {
      this.fs

        .collection('Admin')

        .doc('oMWhzMQgufX3WpRQs9WsB4JmQFv2')

        .collection('cart')

        .doc(res.brand)

        .snapshotChanges()

        .subscribe((res) => {
          let temp = res.payload.data()?.totalprice;

          console.log(temp);
        });
    });
  }

  deleteCart(brand: any) {
    this.fs
      .collection('Admin')
      .doc('oMWhzMQgufX3WpRQs9WsB4JmQFv2')
      .collection('cart')
      .doc(brand)
      .delete();
  }
  checkout() {
    this.router.navigateByUrl('/admincheckoutpage', { state: this.x1 });
  }
}
