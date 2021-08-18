import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { PostprojectService } from 'src/app/service/postproject.service';
import { PostshareService } from 'src/app/service/postshare.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { SearchService } from 'src/app/service/search.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { UserdetailsService } from 'src/app/service/userdetails.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  data: any = {};
  details: any = {};
  jobpost: any;
  projectpost: any;
  updateWithId: any;
  postjobform: FormGroup;
  postprojectform: FormGroup;
  userform: FormGroup;
  modalRef!: BsModalRef;
  email: string = '';
  block: boolean = false;
  isFormValid: boolean = false;
  joblink: Subscription | any;
  projectlink: Subscription | any;
  searchlink: Subscription | any;
  userlink: Subscription | any;
  search: any;
  searchjobitem: any;
  searchproject: any;
  userinformation: any;
  username: string = '';
  updateprofile: boolean = true;;
  constructor(private jobapi: PostshareService, private projectapi: PostprojectService, private formBuilder: FormBuilder, private modalService: BsModalService, private storage: AngularFireStorage, private router: Router, private toastr: ToastrService, private searchservice: SearchService, public userinfo: UserdetailsService) {
    this.postjobform = this.formBuilder.group({
      price: [''],
      title: ['', Validators.required],
      skills: [''],
      description: [''],
      country: [''],
    });
    this.postprojectform = this.formBuilder.group({
      title1: ['', Validators.required],
      skills1: [''],
      price1: [''],
      price2: [''],
      description1: [''],
      country1: [''],
    });
    this.userform = this.formBuilder.group({
      mobilenumber: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])],
      gender: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      profession: ['', Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(20)])]
    });
    this.resetform();
    this.Viewdata();
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
    if (this.searchlink) {
      this.searchlink.unsubscribe();
      console.log('Destroy');
    }
    if (this.userlink) {
      this.userlink.unsubscribe();
      console.log('Destroy');
    }
  }
  ngOnInit(): void {
    this.profiledetails();
    console.log('profilezzxzccdxc', this.details);
    this.email = this.details.email;
    this.username = this.details.displayName;
    console.log('role1', this.email);
    this.searchdata();
  }
  profiledetails() {
    this.data = localStorage.getItem('authData');
    this.details = JSON.parse(this.data);
  }

  cancel() {
    this.userform.reset();
    this.updateprofile = true;
    this.block = false;
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
    this.postjobform.setValue({
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
    this.postprojectform.setValue({
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
    this.isFormValid = true;
    if (this.postprojectform.valid) {
      this.isFormValid = false;
      this.postprojectform.value['id'] = this.updateWithId;
      this.postprojectform.value['name'] = this.details.displayName;
      this.postprojectform.value['email'] = this.details.email;
      this.projectapi.Update(this.updateWithId, this.postprojectform.value);
      this.toastr.success('Project post updated');
      this.postprojectform.reset();
      this.close();
    }
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
    this.projectlink = this.projectapi.View().subscribe((res) => {
      this.projectpost = res.map(item => {
        const object: any = item.payload.doc.data();
        object["id"] = item.payload.doc.id;
        return object;
      })
      console.log('projectpost', this.projectpost);
    });
    this.userlink = this.userinfo.getuserdetails().subscribe((res) => {
      this.userinformation = res.map(item => {
        const object: any = item.payload.doc.data();
        object["id"] = item.payload.doc.id;
        return object;
      });
      console.log('userinformation', this.userinformation);
    });
    // this.userinfo.userinformation.subscribe(data =>{  
    //   console.log('res',data);
    // })
  }
  updatejobs() {
    this.isFormValid = true;
    if (this.postjobform.valid) {
      this.isFormValid = false;
      this.postjobform.value['id'] = this.updateWithId;
      this.postjobform.value['name'] = this.details.displayName;
      this.postjobform.value['email'] = this.details.email;
      this.jobapi.Update(this.updateWithId, this.postjobform.value);
      this.toastr.success('Job record updated');
      this.postjobform.reset();
      this.close();
    }
  }
  close() {
    this.resetform();
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
      }
      console.log('searchitem', this.searchjobitem)
      if (this.search) {
        this.searchproject = this.projectpost.filter((item1: any) => {
          return item1.data.title1.toLowerCase().includes(this.search.toLowerCase())
        });
        console.log('searchproject', this.searchproject)
      }
    });
  }
  resetform() {
    this.postjobform.reset();
    this.postprojectform.reset();
    this.userform.reset();
  }
  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  userformupdate(record: any) {
    this.updateprofile = false;
    console.log('userrecord', record);
    this.block = true;
    this.updateWithId = record.id;
    this.userform.setValue({
      mobilenumber: record.Phonenumber,
      gender: record.gender,
      profession: record.profession,
    });
  }
  updateuserform() {
    this.isFormValid = true;
    if (this.userform.valid) {
      this.isFormValid = false;
      let record: any = {};
      record['gender'] = this.userform.value.gender;
      record['Phonenumber'] = this.userform.value.mobilenumber;
      record['profession'] = this.userform.value.profession;
      record['fullname'] = this.details.displayName;
      record['email'] = this.details.email;
      this.userinfo.updateuserDetails(this.updateWithId, record);
      this.cancel();
      this.toastr.success('Profile updated');
    }
  }
}
