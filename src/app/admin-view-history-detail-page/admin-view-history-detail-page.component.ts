import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-view-history-detail-page',
  templateUrl: './admin-view-history-detail-page.component.html',
  styleUrls: ['./admin-view-history-detail-page.component.css'],
})
export class AdminViewHistoryDetailPageComponent implements OnInit {

   uid: any = null;
  data:any;
  constructor(
    private router: ActivatedRoute,
    private fs: AngularFirestore,
    private fa: AngularFireAuth
  ) {
    this.router.paramMap.subscribe((res) => {

      const category: any = res.get('category');
      const id: any = res.get('id');
      console.log(this.uid,category,id)
      this.fa.authState.subscribe((res) => {
        this.fs
        .collection('Admin')
        .doc(res?.uid)
        .collection('inventory')
        .doc(category)
        .collection('purchasehistory')
        .doc(id)
        .get()
        .subscribe(res=>{
          this.data = res.data();
        })
      });
      


     
    });
  }

  ngOnInit(): void {}
}
