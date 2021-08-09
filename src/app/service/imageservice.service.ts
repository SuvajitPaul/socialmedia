import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class ImageserviceService {
  imageDetailList!: AngularFireList<any>;
  imageList: any = [];
  rowIndexArray: any = [];
  constructor(private firebase: AngularFireDatabase) { }
  getImageDetailList() {
    this.imageDetailList = this.firebase.list('imageDetails');
  }
  insertImageDetails(imageDetails: any) {
    this.imageDetailList.push(imageDetails);
  }
  getimagelist() {
    return this.imageDetailList.snapshotChanges().subscribe(
      list => {
        console.log('list',list);
        this.imageList = list.map(item => { return item.payload.val(); });
        console.log('imagelist',this.imageList);
        this.rowIndexArray = Array.from(Array(Math.ceil((this.imageList.length + 1) / 3)).keys());
      }
    );
  }
}

