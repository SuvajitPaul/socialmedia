import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class RegService {

  constructor(public fireservice:AngularFirestore) { }
  Insert(data:any){
    const reviewTime = {
      data:data,
      timeStamp: new Date().getTime()
    };
    return this.fireservice.collection('regdata').add(reviewTime);
  }
  View(){
    return this.fireservice.collection('regdata').snapshotChanges();
  }
  Update(id:any,data:any){
    const reviewTime = {
      data:data,
      timeStamp: new Date().getTime()
    };
    this.fireservice.doc('regdata/'+id).update(reviewTime);
 }
}
