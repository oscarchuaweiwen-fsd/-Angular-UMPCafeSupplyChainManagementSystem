import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { AdminServiceService } from '../admin-service.service';

@Component({
  selector: 'app-admin-profile-page',
  templateUrl: './admin-profile-page.component.html',
  styleUrls: ['./admin-profile-page.component.css'],
})
export class AdminProfilePageComponent implements OnInit {
  hide: any;
  form: any;
  data: any;
  name: any;
  phone: any;
  email: any;
  updateInfo: any;
  adminInfo: any;
  uid: any;
  constructor(
    private http: HttpClient,
    public asS: AdminServiceService,
    private fb: FormBuilder,
    private fs: AngularFirestore,
    private fa: AngularFireAuth,
    private messageService: MessageService,
    private router:Router
  ) {
    this.form = this.fb.group({
      name: [''],
      email: [''],
      phone: [''],
    });

    this.fa.authState.subscribe((res) => {
      this.uid = res?.uid;

      this.fs
        .collection('Admin')
        .doc(res?.uid)
        .valueChanges()
        .subscribe((res) => {
          this.adminInfo = res;
        });
    });
  }

  ngOnInit(): void {}

  async getInfo(): Promise<any> {
    this.data = await this.asS.getAdminInfo();
  }

  update(c: any, p: any, e: any) {
    console.log(c.value, p.value, e.value);
    this.fs
      .collection('Admin')
      .doc(this.uid)
      .update({ username: c.value, phone: p.value, email: e.value })
      .then(() => {
        console.log('updated ');
        this.messageService.add({
          severity: 'success',
          summary: 'Profile Info',
          detail: 'Your profile has been updated',
        });

        setTimeout(() => {
          this.router.navigateByUrl('/adminpage');
        }, 2000);
      });
  }
}
