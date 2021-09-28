import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
@Component({
  selector: 'app-admin-add-menu-list-page',
  templateUrl: './admin-add-menu-list-page.component.html',
  styleUrls: ['./admin-add-menu-list-page.component.css'],
})
export class AdminAddMenuListPageComponent implements OnInit {
  downloadURL: any;
  fb: any;
  uploadProgress!: Observable<number>;
  ingredient: any[] = [];
  product: any;
  productprice: any;
  different: any[] = [];
  different2: any[] = [];
  ngOnInit(): void {}
  values3!: string[];
  values4!: string[];
  supbro: any;

  constructor(
 
    private fs: AngularFirestore
  ) {
    this.fs
      .collection('Admin')
      .doc('oMWhzMQgufX3WpRQs9WsB4JmQFv2')
      .collection('inventory')
      .snapshotChanges()
      .subscribe((res) => {
        this.different = [];
        res.map((item) => {
          this.different.push(item.payload.doc.id);
          console.log(item.payload.doc.id)
        });
      });
  }

  addNewIngredient(i: any, iq: any) {
    let obj = {
      ingredient: i.value,
      ingredientQuantity: iq.value,
    };

    this.ingredient.push(obj);

    console.log(this.ingredient);
  }

  delete(index:any){
    this.ingredient.splice(index,1);
  }

  // onFileSelected(event: any, product: any) {
  //   var n = this.product;
  //   const file = event.target.files[0];
  //   const filePath = `MenuImage/${n}`;
  //   const fileRef = this.storage.ref(filePath);
  //   const task = this.storage.upload(`MenuImage/${n}`, file);
  //   this.storage.ref('MenuImage/Nasi Lemak').delete();

  //   this.uploadProgress = task
  //     .snapshotChanges()
  //     .pipe(map((s: any) => (s.bytesTransferred / s.totalBytes) * 100));

  //   task
  //     .snapshotChanges()
  //     .pipe(
  //       finalize(() => {
  //         this.downloadURL = fileRef.getDownloadURL();
  //         this.downloadURL.subscribe((url: any) => {
  //           if (url) {
  //             this.fb = url;
  //           }
  //           console.log(this.fb);
  //         });
  //       })
  //     )
  //     .subscribe((url) => {
  //       if (url) {
  //         console.log(url);
  //       }
  //     });
  // }

  add() {


      this.ingredient.forEach(res=>{
        if(!this.different.includes(res.ingredient)){
          this.fs.collection('Admin').doc('oMWhzMQgufX3WpRQs9WsB4JmQFv2').collection('inventory').doc(res.ingredient).set({lowestmargin:0,quantity:0});
        }
      })

      this.fs
      .collection('Admin')
      .doc('oMWhzMQgufX3WpRQs9WsB4JmQFv2')
      .collection('menu')
      .doc(this.product)
      .set({ price: this.productprice, ingredient: this.ingredient })

      // for (let index = 0; index < this.ingredient.length; index++) {
      //   const element = this.ingredient[index];

      //    this.different.filter((res,index)=> {
       
      //       if(res !== element.ingredient){
      //        this.different2.push(element.ingredient);
      //       }
      //   })

      //   for (let index = 0; index < this.different2.length; index++) {
      //     const element = this.different2[index];
      //     console.log(element)
      //     this.fs
      //   .collection('Admin')
      //   .doc('oMWhzMQgufX3WpRQs9WsB4JmQFv2')
      //   .collection('inventory').doc(element).set({quantity:0,lowestmargin:0})
          
      //   }

        
      // }
      
  }
}
