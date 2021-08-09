import { Component, OnInit, TemplateRef, OnDestroy } from '@angular/core';
import { PostshareService } from 'src/app/service/postshare.service';
import { PostprojectService } from 'src/app/service/postproject.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { PostthoughtsService } from 'src/app/service/postthoughts.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from "rxjs/operators";
import { ImageserviceService } from 'src/app/service/imageservice.service';
declare var require: any
const FileSaver = require('file-saver');
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { SearchService } from 'src/app/service/search.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  editorContent: any = "";
  post: any = {};
  user: string = "Suvajit";
  joblink: Subscription | any;
  projectlink: Subscription | any;
  postlink: Subscription | any;
  searchlink: Subscription | any;
  jobpost: any;
  projectpost: any = '';
  showjob: boolean = false;
  postjobform: FormGroup;
  sharepost: any;
  imgSrc: any = "../../../../assets/images/resources/no_image_placeholder.jpg";
  selectedImage: any = null;
  modalRef!: BsModalRef;
  dialogRef!: MatDialogRef<HomeComponent>;
  updateWithId: any;
  imageList: any = [];
  rowIndexArray: any = [];
  hit: boolean = true;
  data: any = {};
  details: any = {};
  profilerole: any = "";
  search: any;
  title: any;
  searchjobitem: any;
  searchproject: any;
  searchpost: any;
  imgval: any;
  constructor(private jobapi: PostshareService, private projectapi: PostprojectService, private formBuilder: FormBuilder, private modalService: BsModalService, public dialog: MatDialog, public postshares: PostthoughtsService, private storage: AngularFireStorage, private imgservice: ImageserviceService, private searchservice: SearchService, private toastr: ToastrService) {
    this.postjobform = this.formBuilder.group({
      price: [''],
      title: [''],
      skills: [''],
      description: [''],
      country: [''],
      title1: [''],
      skills1: [''],
      price1: [''],
      price2: [''],
      description1: [''],
      country1: [''],
      postshare: [''],
      imageUrl: ['']
    });
    this.Viewdata();
    this.profiledetails();
    this.searchdata();
    this.filereset();
    //this.imgservice.getImageDetailList();
  }
  ngOnDestroy(): void {
    if (this.joblink) {
      this.joblink.unsubscribe();
      console.log('Destroy');
    }
    if (this.projectlink) {
      this.projectlink.unsubscribe();
      console.log('Destroy');
    }
    if (this.postlink) {
      this.postlink.unsubscribe();
      console.log('Destroy');
    }
    if (this.searchlink) {
      this.searchlink.unsubscribe();
      console.log('Destroy');
    }
  }
  ngOnInit(): void {
    // this.imgval = this.imgservice.getimagelist();
    // console.log('val', this.imgval.imageDetailList);
  }
  profiledetails() {
    this.data = localStorage.getItem('authData');
    this.details = JSON.parse(this.data);
    if (this.details) {
      this.profilerole = this.details.UserName;
    }
  }
  Viewdata() {
    this.joblink = this.jobapi.View().subscribe((res) => {
      this.jobpost = res.map(item => {
        const object: any = item.payload.doc.data();
        object["id"] = item.payload.doc.id;
        return object;
      })
    });
    this.projectlink = this.projectapi.View().subscribe((res) => {
      this.projectpost = res.map(item => {
        const object: any = item.payload.doc.data();
        object["id"] = item.payload.doc.id;
        return object;
      })
      console.log('projectpost', this.projectpost);
    });
    this.postlink = this.postshares.View().subscribe((res) => {
      this.sharepost = res.map(item => {
        const object: any = item.payload.doc.data();
        object["id"] = item.payload.doc.id;
        return object;
      })
      console.log('sharepost', this.sharepost);
    });
  }
  close() {
    this.modalRef.hide();
  }
  Deletepost(id: any) {
    this.postshares.Delete(id);
    this.toastr.success('Share post deleted');
  }
  Deleterecordjob(id: any) {
    this.jobapi.Delete(id);
    this.toastr.success('Job post deleted');
  }
  Deleterecordproject(id: any) {
    this.projectapi.Delete(id);
    this.toastr.success('Project post deleted');
  }
  Updaterecordjob(record: any, template: TemplateRef<any>) {
    console.log('record', record.data);
    this.updateWithId = record.id;
    this.postjobform.patchValue({
      id: record.id,
      title: record.data.title,
      country: record.data.country,
      skills: record.data.skills,
      price: record.data.price,
      description: record.data.description
    })
    this.modalRef = this.modalService.show(template);
  }
  updatejobs() {
    this.postjobform.value['id'] = this.updateWithId;
    let record: any = {};
    record['title'] = this.postjobform.value.title;
    record['country'] = this.postjobform.value.country;
    record['skills'] = this.postjobform.value.skills;
    record['username'] = this.details.UserName;
    record['name'] = this.details.FirstName;
    record['price'] = this.postjobform.value.price;
    record['description'] = this.postjobform.value.description;
    this.jobapi.Update(this.updateWithId, record);
    this.toastr.success('Job post updated');
    this.close();
    this.postjobform.reset();
  }
  editproject(record: any, template: TemplateRef<any>) {
    console.log('project', record);
    this.updateWithId = record.id;
    this.postjobform.patchValue({
      id: record.id,
      title1: record.data.title1,
      country1: record.data.country1,
      skills1: record.data.skills1,
      price1: record.data.price1,
      price2: record.data.price2,
      description1: record.data.description1
    })
    this.modalRef = this.modalService.show(template);
  }
  updateprojects() {
    this.postjobform.value['id'] = this.updateWithId;
    let record: any = {};
    record['title1'] = this.postjobform.value.title1;
    record['country1'] = this.postjobform.value.country1;
    record['skills1'] = this.postjobform.value.skills1;
    record['username'] = this.details.UserName;
    record['name'] = this.details.FirstName;
    record['price1'] = this.postjobform.value.price1;
    record['price2'] = this.postjobform.value.price2;
    record['description1'] = this.postjobform.value.description1;
    this.projectapi.Update(this.updateWithId, record);
    this.toastr.success('Project post updated');
    this.close();
    this.postjobform.reset();
  }
  editpost(record: any, template: TemplateRef<any>) {
    console.log('imageedit', record.data.link);
    this.imgSrc = record.data.link;
    this.updateWithId = record.id;
    this.postjobform.patchValue({
      id: record.id,
      imageUrl: record.data.link,
    })
    this.editorContent = record.data.post;
    this.modalRef = this.modalService.show(template);
  }
  Download(data: any) {
    console.log('show', data);
    window.open(data);
  }
  filereset() {
    this.postjobform.controls.imageUrl.reset();
    this.imgSrc = '../../../../assets/images/resources/no_image_placeholder.jpg';
    this.selectedImage = null;
  }
  showPreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imgSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    }
    else {
      this.imgSrc = '../../../../assets/images/resources/no_image_placeholder.jpg';
      this.selectedImage = null;
    }
  }
  updateposts() {
    this.post.post = this.editorContent;
    this.post['name'] = this.details.FirstName;
    this.post['username'] = this.details.UserName;
    console.log('post', this.post.post);
    if (this.selectedImage) {
      let filePath = `images/${this.selectedImage.name}_${new Date().getTime()}`;
      const fileRef = this.storage.ref(filePath);
      this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            console.log('url', url);
            this.post.link = url;
            this.post['name'] = this.details.FirstName;
            this.post['username'] = this.details.UserName;
            this.postshares.Update(this.updateWithId, this.post);
            this.toastr.success('Post updated');

          })
        })
      ).subscribe();
      this.modalRef.hide();
      this.filereset();
    } else {
      this.postshares.Update(this.updateWithId, this.post);
      this.toastr.success('Post updated');
      this.filereset();
      this.modalRef.hide();
    }
  }
  searchdata() {
    this.searchlink = this.searchservice.getSearchData().subscribe((search: any) => {
      console.log('searchdata', search);
      this.search = search;
      if (this.search) {
        this.searchjobitem = this.jobpost.filter((item: any) => {
          return item.data.title.toLowerCase().includes(this.search.toLowerCase())
        });
        console.log('searchitem', this.searchjobitem)
        if (this.search) {
          this.searchproject = this.projectpost.filter((item1: any) => {
            //console.log('projectitem',item1.data.title1);
            return item1.data.title1.toLowerCase().includes(this.search.toLowerCase())
          });
          console.log('searchproject', this.searchproject)
        }
        if (this.search) {
          this.searchpost = this.sharepost.filter((item: any) => {
            //console.log('projectitem',item1.data.title1);
            return item.data.post.toLowerCase().includes(this.search.toLowerCase())
          });
          console.log('searchpost', this.searchpost)
        }
      }
    });
  }
}
