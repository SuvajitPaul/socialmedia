import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class PostshareService {

  constructor(public fireservice:AngularFirestore) { }
  Insert(data:any){
    const reviewTime = {
      data:data,
      timeStamp: new Date().getTime()
    };
    return this.fireservice.collection('postjob').add(reviewTime);
  }
  View(){
    return this.fireservice.collection('postjob').snapshotChanges();
  }
  Update(id:any,data:any){
    const reviewTime = {
      data:data,
      timeStamp: new Date().getTime()
    };
    this.fireservice.doc('postjob/'+id).update(reviewTime);
 }
  Delete(id:any)
  {
    this.fireservice.doc('postjob/'+id).delete();
  }
 
  
  
}
