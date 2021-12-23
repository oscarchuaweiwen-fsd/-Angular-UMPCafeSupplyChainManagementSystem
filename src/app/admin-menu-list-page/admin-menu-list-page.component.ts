import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConfirmationService } from 'primeng/api';
import { AdminAddMenuListPageComponent } from '../admin-add-menu-list-page/admin-add-menu-list-page.component';
import * as _ from 'lodash';
import * as moment from 'moment';

@Component({
  selector: 'app-admin-menu-list-page',
  templateUrl: './admin-menu-list-page.component.html',
  styleUrls: ['./admin-menu-list-page.component.css'],
})
export class AdminMenuListPageComponent implements OnInit {
  products: any[] = [];
  ref!: DynamicDialogRef;
  selectedProducts: any[] = [];
  productDialog: boolean = false;
  indexOfElement: any;
  menulist: any[] = [];
  subscribe: any;
  ingredient: any[] = [];
  ingredient2: any[] = [];
  checkStatus: any[] = [];
  checkStatus2: any[] = [];
  display: any = false;
  menu: any[] = [];
  ingredientCheck: any[] = [];
  ingredientCheck2: any[] = [];
  ingredientCheck3: any[] = [];
  different: any[] = [];
  x4!: any[];
  x5: any[] = [];
  result: any[] = [];
  // Tracking Data
  trackingData: any[] = [];
  displayBasic: boolean = false;
  trackingIngredient: any[] = [];
  newData: number = 0;
  display3: any = false;
  checklistarray: any[] = [];
  checklisthistory: any[] = [];
  time = moment();
  totalQuantity: any = 0;
  close: boolean = false;

  constructor(
    private confirmationService: ConfirmationService,
    public dialogService: DialogService,
    public messageService: MessageService,
    private fs: AngularFirestore
  ) {
    this.fs
      .collection('Admin')
      .doc('oMWhzMQgufX3WpRQs9WsB4JmQFv2')
      .collection('menu')
      .snapshotChanges()
      .subscribe((res) => {
        this.products = [];
        res.map((res) => {
          let obj = {
            productname: res.payload.doc.id,
            price: res.payload.doc.data().price,
            ingredient: res.payload.doc.data().ingredient,
            imageLink: res.payload.doc.data().imageLink,
            stock: res.payload.doc.data().stock,
          };

          this.products.push(obj);
          console.log(obj);
        });
      });

    this.subscribe = this.fs
      .collection('Admin')
      .doc('oMWhzMQgufX3WpRQs9WsB4JmQFv2')
      .collection('menu')
      .snapshotChanges()
      .subscribe((res) => {
        this.menulist = [];
        this.ingredient = [];
        res.map((res) => {
          this.menulist.push(res.payload.doc.id);

          this.ingredient.push(res.payload.doc.data().ingredient);
        });
      });

    // x4 - menu list
    this.fs
      .collection('Admin')
      .doc('oMWhzMQgufX3WpRQs9WsB4JmQFv2')
      .collection('menu')
      .snapshotChanges()
      .subscribe((res) => {
        this.x4 = [];
        res.map(async (res) => {
          let obj = {
            id: res.payload.doc.id,
            data: res.payload.doc.data().ingredient,
          };
          await this.x4.push(obj);
        });
      });

    // x5 - ingredient list
    this.fs
      .collection('Admin')
      .doc('oMWhzMQgufX3WpRQs9WsB4JmQFv2')
      .collection('inventory')
      .snapshotChanges()
      .subscribe((res) => {
        this.x5 = [];

        res.map(async (res) => {
          let obj = {
            id: res.payload.doc.id,
            data: res.payload.doc.data(),
          };
          await this.x5.push(obj);

          this.x4.forEach((res, index) => {
            let info: [] = res.data;

            info.forEach((res) => {
              let data: any = res;
              this.x5.forEach((res) => {
                if (res.id === data.ingredient) {
                  if (res.data.quantity <= data.ingredientQuantity) {
                  }
                }
              });
            });
          });
        });
      });

    this.fs
      .collection('Admin')
      .doc('oMWhzMQgufX3WpRQs9WsB4JmQFv2')
      .collection('menu')
      .snapshotChanges()
      .subscribe((res) => {
        res.map(async (res) => {
          let obj = {
            id: res.payload.doc.id,
            data: res.payload.doc.data(),
          };

          await this.menu.push(obj);
        });
      });

    this.fs
      .collection('Admin')
      .doc('oMWhzMQgufX3WpRQs9WsB4JmQFv2')
      .collection('payment')
      .get()
      .subscribe((res) => {
        this.trackingData = [];
        res.forEach((res) => {
          if (
            res.data().status === 'finished' &&
            res.data().trackingTotal > 0
          ) {
            let obj = {
              trackingID: res.id,
              trackingData: res.data(),
            };
            console.log(res.data());

            this.trackingData.push(obj);
          }
        });
      });
  }

  // NG on Init
  ngOnInit(): void {
    this.showQuantity();
  }

  ngOnDestroy() {
    this.subscribe.unsubscribe();
  }

  showQuantity() {
    console.log(this.x4);
  }

  show() {
    this.ref = this.dialogService.open(AdminAddMenuListPageComponent, {
      header: 'Add New Product to Menu',
      width: '70%',
      contentStyle: { 'max-height': '500px', overflow: 'auto' },
      baseZIndex: 10000,
    });

    this.ref.onClose.subscribe((product) => {
      if (product) {
        this.messageService.add({
          severity: 'info',
          summary: 'Product Selected',
          detail: product.name,
        });
      }
    });
  }

  show2(index: any, i: any) {
    this.productDialog = true;
    this.indexOfElement = i;
    console.log(index, i);

    this.ingredient2 = this.ingredient[i];
  }

  deleteProduct(product: any) {
    console.log('Hello World');
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + product + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.fs
          .collection('Admin')
          .doc('oMWhzMQgufX3WpRQs9WsB4JmQFv2')
          .collection('menu')
          .doc(product)
          .delete();
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Product Deleted',
          life: 3000,
        });
      },
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

  delete(index: any) {
    this.ingredient2.splice(index, 1);
    console.log(this.ingredient);
    // this.fs.collection('Admin').doc('oMWhzMQgufX3WpRQs9WsB4JmQFv2').collection('menu').doc("Nasi Lemak").update({ingredient:firebase.default.firestore.FieldValue.delete()})
  }

  update(brand: any, price: any, imageLink: any, stock: any) {
    console.log(brand);
    let x = this.products[this.indexOfElement].productname;
    console.log(this.products[this.indexOfElement]);

    if (brand !== this.products[this.indexOfElement].productname) {
      this.fs
        .collection('Admin')
        .doc('oMWhzMQgufX3WpRQs9WsB4JmQFv2')
        .collection('menu')
        .doc(brand)
        .set({
          price: price,
          ingredient: this.ingredient2,
          imageLink: imageLink,
          stock: stock,
        })
        .then((res) => {
          this.fs
            .collection('Admin')
            .doc('oMWhzMQgufX3WpRQs9WsB4JmQFv2')
            .collection('menu')
            .doc(x)
            .delete();
        });
    } else {
      this.fs
        .collection('Admin')
        .doc('oMWhzMQgufX3WpRQs9WsB4JmQFv2')
        .collection('menu')
        .doc(x)
        .update({
          price: price,
          ingredient: this.ingredient2,
          imageLink: imageLink,
          stock: stock,
        });
    }
  }

  showDialog() {
    this.ingredientCheck = [];
    this.display = !this.display;
    this.result = [];
    this.different = [];

    this.menu.forEach((res) => {
      console.log(res);
      let stock = parseInt(res.data.stock);

      res.data.ingredient.forEach((data: any) => {
        let obj = {
          ingredient: data.ingredient,
          quantity: data.ingredientQuantity * stock,
        };

        this.ingredientCheck.push(obj);
      });
    });

    console.log(this.ingredientCheck);

    this.result = this.ingredientCheck.reduce((unique, o) => {
      if (!unique.some((obj: any) => obj.ingredient === o.ingredient)) {
        unique.push(o);
      } else {
        this.different.push(o);
      }
      return unique;
    }, []);

    this.different.forEach((res) => {
      this.result.forEach((data) => {
        if (res.ingredient == data.ingredient) {
          let temp = 0;
          temp = data.quantity + res.quantity;

          data.quantity = temp;
        }
      });
    });

    console.log(this.result);
  }

  triggerDisplay() {
    this.displayBasic = !this.displayBasic;
  }

  addTrackingIngredient(p: any, trackingID: any, trackingData: any) {
    this.fs
      .collection('Admin')
      .doc('oMWhzMQgufX3WpRQs9WsB4JmQFv2')
      .collection('payment')
      .doc(trackingID)
      .get()
      .subscribe((res) => {
        console.log(res.data()?.trackingTotal);

        this.newData = res.data()?.trackingTotal() - p;
      });

    this.fs
      .collection('Admin')
      .doc('oMWhzMQgufX3WpRQs9WsB4JmQFv2')
      .collection('payment')
      .doc(trackingID)
      .update({ trackingTotal: this.newData });

    let obj = {
      value: p,
      trackingID: trackingID,
      trackingData: trackingData,
    };

    this.trackingIngredient.push(obj);
  }

  checklist(ingredient: any) {
    this.fs
      .collection('Admin')
      .doc('oMWhzMQgufX3WpRQs9WsB4JmQFv2')
      .collection('payment')
      .snapshotChanges()
      .subscribe((res) => {
        this.checklistarray = [];
        res.map((res) => {
          console.log(res.payload.doc.data(), ingredient);
          if (
            res.payload.doc.data().category === ingredient &&
            res.payload.doc.data().trackingTotal > 0
          ) {
            let obj = {
              id: res.payload.doc.id,
              data: res.payload.doc.data(),
            };
            this.checklistarray.push(obj);
          }
        });
      });
  }

  showDialog2() {
    this.display3 = !this.display3;
  }

  addTrackingHistory(
    category: any,
    trackingid: any,
    companyname: any,
    productname: any,
    trackingAmount: any,
    trackingTotal: any
  ) {
    let obj = {
      id: trackingid,
      category: category,
      companyname: companyname,
      productname: productname,
      trackingAmount: trackingAmount,
      time: this.time
        .format('MMMM Do YYYY , h:mm:ss a')
        .concat(` - ${trackingid}`),
    };

    this.fs
      .collection('Admin')
      .doc('oMWhzMQgufX3WpRQs9WsB4JmQFv2')
      .collection('payment')
      .doc(trackingid)
      .update({ trackingTotal: trackingTotal - trackingAmount });

    this.checklisthistory.push(obj);
  }

  removeTrackingHistory(id: any, trackingAmount: any) {
    console.log(id);
    console.log(this.checklisthistory);
    const index = this.checklisthistory.findIndex((res: any) => {
      return res.trackingAmount === trackingAmount;
    });
    this.checklisthistory.splice(index, 1);

    console.log(index);

    this.fs
      .collection('Admin')
      .doc('oMWhzMQgufX3WpRQs9WsB4JmQFv2')
      .collection('payment')
      .doc(id)
      .get()
      .subscribe((res) => {
        console.log(res.data()?.trackingTotal);
        console.log(trackingAmount);

        this.fs
          .collection('Admin')
          .doc('oMWhzMQgufX3WpRQs9WsB4JmQFv2')
          .collection('payment')
          .doc(id)
          .update({
            trackingTotal: res.data()?.trackingTotal + parseInt(trackingAmount),
          });
      });
  }

  addtrackinghistory2(y: any) {
    console.log(y);

    y.forEach((res: any) => {
      this.fs
        .collection('Admin')
        .doc('oMWhzMQgufX3WpRQs9WsB4JmQFv2')
        .collection('trackinghistory')
        .doc(res.time)
        .set(res);
    });

    setInterval(() => {
      return window.location.reload();
    }, 3000);
  }
}
