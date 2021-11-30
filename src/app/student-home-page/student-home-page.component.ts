import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-student-home-page',
  templateUrl: './student-home-page.component.html',
  styleUrls: ['./student-home-page.component.css']
})
export class StudentHomePageComponent implements OnInit {
  tiles:any[] = [
   
  ];
  tiles2:any[] = []
  filter3:any = []
  info:any[] = []
  imageUrl:any;
  uid:any;
  display:any = false;
   constructor(private fs:AngularFirestore,private fa: AngularFireAuth,private router:ActivatedRoute,private route:Router) {

    this.fs.collection('Admin').doc("oMWhzMQgufX3WpRQs9WsB4JmQFv2").collection('menu').snapshotChanges().subscribe(res=>{
      this.tiles = []
      this.tiles2 = []
      res.map(res=>{
        let obj = {
          id:res.payload.doc.id,
          data:res.payload.doc.data(),
          cols: 1, rows: 1, color: 'lightblue'
        }

        this.tiles.push(obj)
        console.log(this.tiles)
      })

      this.tiles2 = this.tiles.filter(res=>{
        return res.data.stock > 0 
      })

      console.log(this.tiles2)
    })


    
    this.fa.authState.subscribe(async res=>{
      this.uid = await res?.uid
      
      
      
      this.fs.collection('Student').doc(this.uid).collection('cart').snapshotChanges().subscribe(res=>{
        this.info = []
        res.map(res=>{
          let obj = {
            id:res.payload.doc.id,
            data:res.payload.doc.data(),
            quantity:1
          }

          this.info.push(obj)

          console.log(this.info)
        })
       
        
      })

      
    })

    this.router.queryParams.subscribe(data=>{
      console.log(data['compname'])

      let action = data['action']
      let item = data['productname']
      if(action === 'success'){
        this.fa.authState.subscribe(res=>{
          this.fs.collection('Student').doc(res?.uid).collection("cart").doc(data['productname']).delete().then(res=>{
            console.log('Deleted Successfully')
            this.display = !this.display
          })

        })

        this.fa.authState.subscribe(res=>{
          let obj = {
            productname:data['productname'],
            quantity:data['quantity'],
            amount:data['amount'],
            studentname:data['studentname'],
            status:"await",
            completetimestamp:null
          }
          this.fs.collection("Admin").doc("oMWhzMQgufX3WpRQs9WsB4JmQFv2").collection("order").doc(data['trackingnumber']).set(obj)
        })
      }
    })
   }

  ngOnInit(): void {
  }
  
  addtocart(tile:any){
    let array:any[] = []
    console.log(this.info)
   
    this.info.forEach(res=>{
      array.push(res.id)
    })

    console.log(array.includes(tile.id))
   
    let check = array.includes(tile.id)

    if(!check){
      let obj = {
        data:tile,
        quantity:1
      }
      this.fs.collection("Student").doc(this.uid).collection("cart").doc(tile.id).set(obj)
    }else if(check){
      this.info.forEach((res:any)=>{


        if(res.id == tile.id){
  
          this.fs.collection("Student").doc(this.uid).collection("cart").doc(res.id).update({quantity:res.data.quantity+1})
        }
      })
    }

   
    
  

  }

  clearURL(){
    this.route.navigateByUrl("/studentpage")
  }

}
