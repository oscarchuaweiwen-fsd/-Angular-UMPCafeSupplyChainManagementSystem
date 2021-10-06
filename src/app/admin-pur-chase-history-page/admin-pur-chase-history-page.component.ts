import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute } from '@angular/router';
import { AdminServiceService } from '../admin-service.service';

@Component({
  selector: 'app-admin-pur-chase-history-page',
  templateUrl: './admin-pur-chase-history-page.component.html',
  styleUrls: ['./admin-pur-chase-history-page.component.css'],
})
export class AdminPurChaseHistoryPageComponent implements OnInit {
  displayedColumns: string[] = ['company', 'quantity','totalprice','action'];
  dataSource!: MatTableDataSource<any>;
  category: any;
  uid:any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  data: object[] = [];
  constructor(
    private fs: AngularFirestore,
    private fa: AngularFireAuth,
    private route: ActivatedRoute,
    private adminAuthService: AdminServiceService
  ) {
    this.route.paramMap.subscribe((res) => {
      console.log(res.get('id'));
      this.category = res.get('id') || '';
    });

    this.fa.authState.subscribe((state) => {
      this.uid = state?.uid;
      let x = this.fs
      .collection('Admin')
      .doc(this.uid)
      .collection('inventory')
      .doc(this.category)
      .collection('purchasehistory')
      .snapshotChanges();
    x.subscribe((res) => {
      console.log(res);
      this.data = [];

      res.map((res) => {
        let obj = {
          company:res.payload.doc.data().compname,
          totalprice: res.payload.doc.data().total,
          quantity: res.payload.doc.data().quantity,
          brand:res.payload.doc.data().brand
        };

        this.data.push(obj);
        this.dataSource = new MatTableDataSource(this.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(this.data);
      });
    });
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
}
