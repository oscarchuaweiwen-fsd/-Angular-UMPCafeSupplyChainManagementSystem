import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HomePageComponent } from '../home-page/home-page.component';
import { AngularFireObject } from '@angular/fire/database';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  emailVerified: boolean | undefined;
  passwordVerified: boolean | undefined;
  userVerified: boolean | undefined;
  user$: Observable<any> | undefined;
  emailExistedStatus: boolean | undefined;
  // Tester
  uid: string | undefined;
  role: boolean | undefined;
  tempo2: string | undefined;
  tempo: string = '';
  admin$: Observable<any> | undefined;
  isAdmin: boolean | undefined;
  student$: Observable<any> | undefined;
  isStudent: boolean | undefined;
  supplier$: Observable<any> | undefined;
  isSupplier: boolean | undefined;

  constructor(
    private fauth: AngularFireAuth,
    private route: ActivatedRoute,
    private router: Router,
    private firestore: AngularFirestore
  ) {
    this.user$ = this.fauth.authState;
    this.user$.subscribe((res) => {
      this.uid = res?.uid;
      console.log("User Logged in " + this.uid);
    });

    //    Manage user session - .setPersistence('local) to keep the user logged in at all times.
    // .setPersistence('session') to only keep the session active while the browser is open.
    // .setPersistence('none) => To keep the session in memory and clear it if the user reloads.
    fauth.setPersistence('local').then((res) => {
      console.log('local session');
    });
  }

  //login
  async login(email: any, password: any) {
   
    return new Promise((resolve) => {
      
      this.fauth
        .signInWithEmailAndPassword(email, password)
        .then((res) => {
          this.uid = res.user?.uid;
    
          // let returnUrl =
          //   this.route.snapshot.queryParamMap.get('returnUrl') || '';
          // localStorage.setItem('returnUrl', returnUrl);

          // this.user$?.subscribe((res) => {
          //   if (res) {
          //     let returnUrl = localStorage.getItem('returnUrl') || '/adminpage';
          //     this.router.navigateByUrl(returnUrl);
          //   }
          // });


          this.firestore.collection("Admin").doc(this.uid).valueChanges().subscribe(res=>{
            if(res){
              this.router.navigateByUrl('/adminpage')
            }
          })

          this.firestore.collection("Student").doc(this.uid).valueChanges().subscribe(res=>{
            if(res){
              this.router.navigateByUrl('/studentpage')
            }
          })

          this.firestore.collection("Supplier").doc(this.uid).valueChanges().subscribe(res=>{
            if(res){
              this.router.navigateByUrl('/supplierpage')
            }
          })
       
          
          if (!res.user?.emailVerified) {
            this.emailVerified = false;
          }

          resolve(true);
        })
        .catch((err) => {
          if (err.code === 'auth/wrong-password') {
            console.log('wrong password');
            this.passwordVerified = false;
            if (!this.passwordVerified) {
              this.passwordVerified = false;
            }
          }

          if (err.code === 'auth/user-not-found') {
            this.userVerified = false;
          }

          resolve(false);
        });
    });
  }

  // Registration 
  async register(
    email: any,
    password: any,
    role: any,
    name: any,
    dob: any,
    phonenumber: any,
    gender: any,
    matrix:any,
    comp:any
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      this.fauth
        .createUserWithEmailAndPassword(email, password)
        .then((res) => {
          console.log(res);
          resolve({ validate: true });
          // Send verification email to the registered email address
          this.fauth.currentUser
            .then((user) => {
              user?.sendEmailVerification();
            })
            .then((res) => {
              console.log(res);
            });

          // Check User Role
          if (role === '1') {
            // Create Student's information
            console.log('student');
            this.firestore
              .collection('Student')
              .doc(res.user?.uid)
              .set({
                name: name,
                email: email,
                dob: dob,
                phone: phonenumber,
                gender: gender,
                matrixid: matrix,
                isStudent: false
              });
          } else if (role === '2') {
            // Create Supplier's information
            console.log('supplier');
            this.firestore
              .collection('Supplier')
              .doc(res.user?.uid)
              .set({name: name,
                email: email,
                dob: dob,
                phone: phonenumber,
                gender: gender,
                compname: comp,
                isSupplier: false });
          }
        })
        .catch((err) => {
          console.log(err);
          if (err.code === 'auth/email-already-in-use') {
            resolve({ validate: false });
          }
        });
    });
  }

  //Check admin role status
  async getAdminStatus(): Promise<any> {
    return new Promise((resolve) => {
      this.admin$ = this.firestore
        .collection('Admin')
        .doc(this.uid)
        .valueChanges();

      this.admin$.subscribe((res) => {
        resolve(res?.isAdmin);
      });
    });
  }

  //Check student role status
  async getStudentStatus(): Promise<any> {
    return new Promise((resolve) => {
      this.student$ = this.firestore
        .collection('Student')
        .doc(this.uid)
        .valueChanges();

      this.student$.subscribe((res) => {
        resolve(res?.isStudent);
      });
    });
  }

  //Check supplier role status
  async getSupplierStatus(): Promise<any> {
    return new Promise((resolve) => {
      this.supplier$ = this.firestore
        .collection('Supplier')
        .doc(this.uid)
        .valueChanges();

      this.supplier$.subscribe((res) => {
        resolve(res?.isSupplier);
      });
    });
  }


  //send verification email
  verificationemail() {
    this.fauth.user.subscribe(
      (user) => {
        user?.sendEmailVerification();
        console.log('Verification email sent');
      },
      (err) => {
        console.log(err);
      }
    );
  }

  // // Check email address existed on firebase
  async checkExistedEmail(emailaddress: any) {
    return new Promise((resolve) => {
      this.fauth.fetchSignInMethodsForEmail(emailaddress).then(
        (res) => {
          console.log(res);
          this.emailExistedStatus = true;
          resolve(true);
        },
        (err) => {
          console.log(err);
        }
      );
    });
  }

  // Forgot Password Email

  async forgotPassword(email: any) {
    return new Promise((resolve) => {
      this.fauth.sendPasswordResetEmail(email).then(
        (res) => {
          console.log('success');
          resolve(true);
        },
        (err) => {
          console.log(err.code);

          if (err.code === 'auth/user-not-found') {
            resolve(false);
          }
        }
      );
    });
  }
}
