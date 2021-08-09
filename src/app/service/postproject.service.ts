import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class PostprojectService {

  constructor(public fireservice:AngularFirestore) { }
  Insert(data:any){
    const reviewTime = {
      data:data,
      timeStamp: new Date().getTime()
    };
    return this.fireservice.collection('postproject').add(reviewTime);
  }
  View(){
    return this.fireservice.collection('postproject').snapshotChanges();
  }
  Update(id:any,data:any){
    const reviewTime = {
      data:data,
      timeStamp: new Date().getTime()
    };
    this.fireservice.doc('postproject/'+id).update(reviewTime);
 }
  Delete(id:any)
  {
    this.fireservice.doc('postproject/'+id).delete();
  }
}
