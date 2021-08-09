import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { ColumnMode, SortType } from '@swimlane/ngx-datatable';
import { PostprojectService } from 'src/app/service/postproject.service';
import { PostshareService } from 'src/app/service/postshare.service';
import { PostthoughtsService } from 'src/app/service/postthoughts.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AngularFireStorage } from '@angular/fire/storage';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { finalize } from "rxjs/operators";
import { RegService } from 'src/app/service/reg.service';
import { Router } from '@angular/router';
import { SearchService } from 'src/app/service/search.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  data: any = {};
  details: any = {};
  jobpost: any;
  sharepost: any;
  projectpost: any;
  updateWithId: any;
  postjobform: FormGroup;
  modalRef!: BsModalRef;
  role: string = " ";
  profilerole: string = '';
  ColumnMode = ColumnMode;
  SortType = SortType;
  rows: any;
  block: boolean = false;
  isRegisterFormValid: boolean = false;
  editorContent: any = "";
  post: any = {};
  user: string = "Suvajit";
  cren: any;
  joblink: Subscription | any;
  postlink: Subscription | any;
  projectlink: Subscription | any;
  searchlink: Subscription | any;
  showjob: boolean = false;
  imgSrc: any = "../../../../assets/images/resources/no_image_placeholder.jpg";
  selectedImage: any = null;
  imageList: any = [];
  rowIndexArray: any = [];
  hit: boolean = true;
  title: any;
  search: any;
  searchjobitem: any;
  searchproject: any;
  searchpost: any;
  url: any;

  constructor(private jobapi: PostshareService, public postshare: PostthoughtsService, private projectapi: PostprojectService, private formBuilder: FormBuilder, private modalService: BsModalService, private storage: AngularFireStorage, private service: RegService, private router: Router, private toastr: ToastrService, private searchservice: SearchService) {
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
      imageUrl: [''],
      oldpassword: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
      confirmPassword: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
    },
      {
        validator: this.MustMatch('password', 'confirmPassword')
      });
    this.Viewdata();
  }
  ngOnDestroy(): void {
    if (this.joblink) {
      this.joblink.unsubscribe();
      console.log('Destroy');
    }
    if (this.postlink) {
      this.postlink.unsubscribe();
      console.log('Destroy');
    }
    if (this.projectlink) {
      this.projectlink.unsubscribe();
      console.log('Destroy');
    }
    if (this.searchlink) {
      this.searchlink.unsubscribe();
      console.log('Destroy');
    }
  }

  ngOnInit(): void {
    this.profiledetails();
    console.log('profilezzxzccdxc', this.details);
    this.profilerole = this.details.UserName;
    console.log('role1', this.profilerole);
    this.rows = this.details.data;
    this.searchdata();
  }
  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        // return if another validator has already found an error on the matchingControl
        return;
      }
      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }
  profiledetails() {
    this.data = localStorage.getItem('authData');
    this.details = JSON.parse(this.data);
  }
  chnpassword() {
    this.block = true;
  }
  cancel() {
    this.block = false;
  }
  passwordupdate() {
    console.log('password');
    this.isRegisterFormValid = true;
    if (this.postjobform.valid) {
      console.log('password valid');
      this.isRegisterFormValid = false;
      this.profiledetails();
      let oldPassword = this.details.password;
      let typeoldpassword = this.postjobform.value.oldpassword;
      if (oldPassword === typeoldpassword) {
        console.log('password match');
        this.details['password'] = this.postjobform.value.password;
        let record: any = {};
        record['password'] = this.details.password;
        record['FirstName'] = this.details.FirstName;
        record['Phonenumber'] = this.details.Phonenumber;
        record['UserName'] = this.details.UserName;
        record['dob'] = this.details.dob;
        record['email'] = this.details.email;
        record['gender'] = this.details.gender;
        record['role_id'] = this.details.role_id;
        this.cren = localStorage.getItem('authData1');
        let crenid = JSON.parse(this.cren);
        this.updateWithId = crenid.id;
        console.log('updatewithId', this.updateWithId);
        this.service.Update(this.updateWithId, record);
        this.toastr.success('Password updated');
        setTimeout(() => {
          this.postjobform.reset();
          localStorage.removeItem("authData");
          localStorage.removeItem("authData1");
          this.router.navigateByUrl('/');
        }, 2000);
      }
    } else {
      console.log('inside else');
      this.isRegisterFormValid = true;
      return;
    }
  }
  Deleterecordpost(id: any) {
    console.log(id);
    this.postshare.Delete(id);
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
    this.postjobform.value['name'] = this.details.FirstName;
    this.postjobform.value['username'] = this.details.UserName;
    this.projectapi.Update(this.updateWithId, this.postjobform.value);
    this.toastr.success('Project post updated');
    this.postjobform.reset();
    this.close();
  }
  Download(data: any) {
    console.log('show', data);
    window.open(data);
  }
  Viewdata() {
    this.joblink = this.jobapi.View().subscribe((res) => {
      this.jobpost = res.map(item => {
        const object: any = item.payload.doc.data();
        object["id"] = item.payload.doc.id;
        return object;
      })
      console.log('kk', this.jobpost);
    });
    this.postlink = this.postshare.View().subscribe((res) => {
      this.sharepost = res.map(item => {
        const object: any = item.payload.doc.data();
        object["id"] = item.payload.doc.id;
        return object;
      })
      console.log('sharepost', this.sharepost);
    });
    this.projectlink = this.projectapi.View().subscribe((res) => {
      this.projectpost = res.map(item => {
        const object: any = item.payload.doc.data();
        object["id"] = item.payload.doc.id;
        return object;
      })
      console.log('projectpost', this.projectpost);
    });
  }
  updatejobs() {
    this.postjobform.value['id'] = this.updateWithId;
    this.postjobform.value['name'] = this.details.FirstName;
    this.postjobform.value['username'] = this.details.UserName;
    this.jobapi.Update(this.updateWithId, this.postjobform.value);
    this.toastr.success('Job record updated');
    this.postjobform.reset();
    this.close();
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
            this.postshare.Update(this.updateWithId, this.post);
            this.toastr.success('Post updated');

          })
        })
      ).subscribe();
      this.modalRef.hide();
      this.filereset();
    } else {
      this.postshare.Update(this.updateWithId, this.post);
      this.toastr.success('Post updated');
      this.filereset();
      this.modalRef.hide();
    }
  }
  close() {
    this.modalRef.hide();
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
            return item1.data.title1.toLowerCase().includes(this.search.toLowerCase())
          });
          console.log('searchproject', this.searchproject)
        }
        if (this.search) {
          this.searchpost = this.sharepost.filter((item: any) => {
            return item.data.post.toLowerCase().includes(this.search.toLowerCase())
          });
          console.log('searchpost', this.searchpost)
        }
      }
    });
  }
}
