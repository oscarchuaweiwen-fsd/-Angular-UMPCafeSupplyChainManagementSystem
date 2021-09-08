import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {
  ConfirmationService,
  MessageService,
  PrimeNGConfig
} from "primeng/api";

@Component({
  selector: 'app-admin-permission-page',
  templateUrl: './admin-permission-page.component.html',
  styleUrls: ['./admin-permission-page.component.css']
})
export class AdminPermissionPageComponent implements OnInit {
  displayedColumns: string[] = ['id','matrix', 'name', 'isStudent', 'action'];
  displayedColumns2: string[] = ['id','compname', 'name', 'isSupplier', 'action'];
  dataSource!: MatTableDataSource<any>;
  dataSource2!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  studentPermissions!:any[];
  supplierPermissions!:any[];

  checked1!:boolean;
  checked2!:boolean;


  constructor(private fs:AngularFirestore, private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig) {

    //Student
    this.fs.collection('Student').snapshotChanges().subscribe(data => {
      this.studentPermissions = [];

      data.map((data:any) => {
        let obj = {
          id:data.payload.doc.id,
          matrix:data.payload.doc.data().matrixid,
          isStudent: data.payload.doc.data().isStudent,
          name:data.payload.doc.data().name
        }
         this.studentPermissions.push(obj)

        this.dataSource = new MatTableDataSource(this.studentPermissions);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort
      })
    })

    //Supplier
    this.fs.collection('Supplier').snapshotChanges().subscribe(data => {
      this.supplierPermissions = [];

      data.map((data:any) => {
        let obj = {
          id:data.payload.doc.id,
          compname:data.payload.doc.data().compname,
          isSupplier: data.payload.doc.data().isSupplier,
          name:data.payload.doc.data().name
        }
         this.supplierPermissions.push(obj)

        this.dataSource2 = new MatTableDataSource(this.supplierPermissions);
        this.dataSource2.paginator = this.paginator;
        this.dataSource2.sort = this.sort
      })
    })


   }

   

  ngOnInit(): void {
  
  }


 

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  applyFilter2(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource2.filter = filterValue.trim().toLowerCase();

    if (this.dataSource2.paginator) {
      this.dataSource2.paginator.firstPage();
    }
  }

  change(p:any,id:any){
    console.log(p,id);
    this.fs.collection('Student').doc(id).update({isStudent:p.checked});
  }

  change2(p:any,id:any){
    console.log(p,id);
    this.fs.collection('Supplier').doc(id).update({isSupplier:p.checked});
  }

  confirm(event: Event,id:any) {
    this.confirmationService.confirm({
      target: event.target!,
      message: "Are you sure that you want to proceed?",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.messageService.add({
          severity: "info",
          summary: "Confirmed",
          detail: "You have accepted"
          
        });

        this.fs.collection('Student').doc(id).delete();
      },
      reject: () => {
        this.messageService.add({
          severity: "error",
          summary: "Rejected",
          detail: "You have rejected"
        });
      }
    });
  }

  confirm2(event: Event,id:any) {
    this.confirmationService.confirm({
      target: event.target!,
      message: "Are you sure that you want to proceed?",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.messageService.add({
          severity: "info",
          summary: "Confirmed",
          detail: "You have accepted"
          
        });

        this.fs.collection('Supplier').doc(id).delete();
      },
      reject: () => {
        this.messageService.add({
          severity: "error",
          summary: "Rejected",
          detail: "You have rejected"
        });
      }
    });
  }
}
