import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-supplier-home-page',
  templateUrl: './supplier-home-page.component.html',
  styleUrls: ['./supplier-home-page.component.css'],
})
export class SupplierHomePageComponent implements OnInit {
  data: any;
  stockType: any;
  stockChartData: any[] = [];
  stock: any = 'Stock of the product';
  stockOption: any;
  chartOptions: any;
  topSalesType:any;
  topSalesChartData:any[] = [];
  topSales = "Top Sales Product";
  topSalesOption:any;
  product: any[]=[];
  height:any="300";
  constructor(private fs: AngularFirestore, private fa: AngularFireAuth) {
    // Stock of the product data chart

    this.fa.authState.subscribe((res) => {
      this.fs
        .collection('Supplier')
        .doc(res?.uid)
        .collection('menu')
        .snapshotChanges()
        .subscribe((res) => {
          res.map(async (res) => {
            let array = [
              res.payload.doc.data().brand,
              parseInt(res.payload.doc.data().quantity),
            ];

            this.stockChartData.push(array);
          });
        });
    });

    this.stockType = 'BarChart';
    this.stockOption = {
      chartArea: { width: '50vw' },
      hAxis: {
        title: 'Unit',
        minValue: 0,
      },
      vAxis: {
        title: 'Product Name',
      },
    };

    // Top product sold
    this.fa.authState.subscribe(res=>{
      this.fs.collection("Supplier").doc(res?.uid).collection("menu").snapshotChanges().subscribe(res=>{
        res.map(res=>{
          let array = [
            res.payload.doc.data().brand,
            res.payload.doc.data().totalSale,
          ];
          console.log(array)

          this.topSalesChartData.push(array)
        })
      });
    })

    this.topSalesType = 'PieChart';
    this.topSalesOption = {
      chartArea: { width: '50vw' },
      pieHole:0.4
    };

    // Order Status

    this.fa.authState.subscribe(res=>{
      this.fs.collection('Supplier').doc(res?.uid).valueChanges().subscribe((res:any)=>{
        let compname = res.compname
        this.fs.collection('Admin').doc('oMWhzMQgufX3WpRQs9WsB4JmQFv2').collection('payment').snapshotChanges().subscribe(res=>{
          this.product = [];
          res.map(res=>{
         
            if(res.payload.doc.data().compname == compname && res.payload.doc.data().status == 'paid'){
             
              let obj = {
                trackingNumber: res.payload.doc.id,
                data:res.payload.doc.data()
              }

              this.product.push(obj);

              console.log(this.product);
            }
          })
        })
      })
    })


  }

  ngOnInit(): void {}
}
