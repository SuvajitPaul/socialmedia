import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { PostprojectService } from 'src/app/service/postproject.service';
import { PostshareService } from 'src/app/service/postshare.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from "rxjs/operators";
import { PostthoughtsService } from 'src/app/service/postthoughts.service';
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  postjobform: FormGroup;
  modalRef!: BsModalRef;
  data: any;
  details: any;
  role1: any;
  imgSrc: any = "../../../../assets/images/resources/no_image_placeholder.jpg";
  selectedImage: any = null;
  editorContent: any = "";
  post: any = {};

  constructor(private formBuilder: FormBuilder, private modalService: BsModalService, private projectapi: PostprojectService, private toastr: ToastrService, private jobapi: PostshareService, private storage: AngularFireStorage, public postshare: PostthoughtsService) {
    this.postjobform = this.formBuilder.group({
      title1: [''],
      skills1: [''],
      price1: [''],
      price2: [''],
      description1: [''],
      country1: [''],
      price: [''],
      title: [''],
      skills: [''],
      description: [''],
      country: [''],
      imageUrl: ['']
    });
  }
  ngOnInit(): void {
    this.filereset();
    this.profiledetails();
  }
  openproject(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  profiledetails() {
    this.data = localStorage.getItem('authData');
    this.details = JSON.parse(this.data);
  }
  postprojects() {
    console.log('Hi');
    let rec: any = {};
    rec['title1'] = this.postjobform.value.title1;
    rec['skills1'] = this.postjobform.value.skills1;
    rec['price1'] = this.postjobform.value.price1;
    rec['price2'] = this.postjobform.value.price2;
    rec['description1'] = this.postjobform.value.description1;
    rec['country1'] = this.postjobform.value.country1;
    rec['name'] = this.details.FirstName;
    rec['username'] = this.details.UserName;
    this.projectapi.Insert(rec);
    this.postjobform.reset();
    this.toastr.success('Project record inserted');
    this.close();
  }
  close() {
    this.modalRef.hide();
  }
  postjob() {
    let record: any = {};
    record['title'] = this.postjobform.value.title;
    record['skills'] = this.postjobform.value.skills;
    record['price'] = this.postjobform.value.price;
    record['description'] = this.postjobform.value.description;
    record['country'] = this.postjobform.value.country;
    record['name'] = this.details.FirstName;
    record['username'] = this.details.UserName;
    this.jobapi.Insert(record).then((res: any) => {
      console.log('data', res);
      this.toastr.success('Job record inserted');
      record = '';
    }).catch((err: any) => {
      this.toastr.error('err', err);
      console.log('err', err);
    })
    this.close();
    this.postjobform.reset();
  }
  filereset() {
    this.postjobform.controls.imageUrl.reset();
    this.imgSrc = '../../../../assets/images/resources/no_image_placeholder.jpg';
    this.selectedImage = null;
  }
  sharethought() {
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
            this.postshare.Insert(this.post);
            this.toastr.success('Post Share');
          })
        })
      ).subscribe();
      this.close();
      this.filereset();
    } else {
      this.postshare.Insert(this.post);
      this.toastr.success('Post Share');
      this.filereset();
      this.close();
    }
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
  Sharethought(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
}
