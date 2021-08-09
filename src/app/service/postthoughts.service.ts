import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class PostthoughtsService {

  constructor(public fireservice:AngularFirestore) { }
  Insert(data:any){
    const reviewTime = {
      data:data,
      timeStamp: new Date().getTime()
    };
    return this.fireservice.collection('postthoughts').add(reviewTime);
  }
  View(){
    return this.fireservice.collection('postthoughts').snapshotChanges();
  }
  Update(id:any,data:any){
    const reviewTime = {
      data:data,
      timeStamp: new Date().getTime()
    };
    this.fireservice.doc('postthoughts/'+id).update(reviewTime);
 }
  Delete(id:any)
  {
    this.fireservice.doc('postthoughts/'+id).delete();
  }
}
