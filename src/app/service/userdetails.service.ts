import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserdetailsService {

  public userinformation = new BehaviorSubject<any>("");

  constructor(private db: AngularFirestore) { }

  getuserdetails(){
    return this.db.collection('User').snapshotChanges();
  }
  updateuserDetails(id:any,data:any){
    this.db.doc('User/'+id).update(data);
  }

}
