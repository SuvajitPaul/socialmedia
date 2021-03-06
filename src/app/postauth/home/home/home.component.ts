import { Component, OnInit, TemplateRef, OnDestroy } from '@angular/core';
import { PostshareService } from 'src/app/service/postshare.service';
import { PostprojectService } from 'src/app/service/postproject.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { SearchService } from 'src/app/service/search.service';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Subscription } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
import { UserdetailsService } from 'src/app/service/userdetails.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  post: any = {};
  joblink: Subscription | any;
  projectlink: Subscription | any;
  searchlink: Subscription | any;


  jobpost: any;
  projectpost: any = '';
  postjobform: FormGroup;
  postprojectform: FormGroup;
  sharepost: any;
  modalRef!: BsModalRef;
  updateWithId: any;
  data: any = {};
  details: any = {};
  email: any = "";
  search: any;
  title: any;
  searchjobitem: any;
  searchproject: any;
  isFormValid: boolean = false;
  userdetails: any;
  users: any;
  user: any;
  userid:any;
  constructor(private jobapi: PostshareService, private projectapi: PostprojectService, private formBuilder: FormBuilder, private modalService: BsModalService, private searchservice: SearchService, private toastr: ToastrService, private auth: AuthService, public userinfo: UserdetailsService, private auth1: UserdetailsService) {
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
    this.resetform();
    this.Viewdata();
    this.profiledetails();
    this.searchdata();
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
  }
  ngOnInit(): void {

  }
  profiledetails() {
    this.data = localStorage.getItem('authData');
    this.details = JSON.parse(this.data);
    this.email = this.details.email;
    console.log('email', this.email);
    this.auth.getUserState()
      .subscribe(user => {
        this.user = user;
      })
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

    

  }
  close() {
    this.resetform();
    this.modalRef.hide();
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
  updatejobs() {
    this.isFormValid = true;
    if (this.postjobform.valid) {
      this.isFormValid = false;
      this.postjobform.value['id'] = this.updateWithId;
      let record: any = {};
      record['title'] = this.postjobform.value.title;
      record['country'] = this.postjobform.value.country;
      record['skills'] = this.postjobform.value.skills;
      record['email'] = this.details.email;
      record['name'] = this.details.displayName;
      record['price'] = this.postjobform.value.price;
      record['description'] = this.postjobform.value.description;
      this.jobapi.Update(this.updateWithId, record);
      this.toastr.success('Job post updated');
      this.postjobform.reset();
      this.close();
    }
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
      let record: any = {};
      record['title1'] = this.postprojectform.value.title1;
      record['country1'] = this.postprojectform.value.country1;
      record['skills1'] = this.postprojectform.value.skills1;
      record['email'] = this.details.email;
      record['name'] = this.details.displayName;
      record['price1'] = this.postprojectform.value.price1;
      record['price2'] = this.postprojectform.value.price2;
      record['description1'] = this.postprojectform.value.description1;
      this.projectapi.Update(this.updateWithId, record);
      this.toastr.success('Project post updated');
      this.close();
      this.postprojectform.reset();
    }
  }
  searchdata() {
    this.searchlink = this.searchservice.searchdata.subscribe((search: any) => {
      console.log('searchdata', search);
      this.search = search;
      if (this.search) {
        this.searchjobitem = this.jobpost.find((item: any) => {
          return item.data.title.toLowerCase().includes(this.search.toLowerCase())
        });
      }
      console.log('searchitem', this.searchjobitem)
      if (this.search) {
        this.searchproject = this.projectpost.find((item1: any) => {
          //console.log('projectitem',item1.data.title1);
          return item1.data.title1.toLowerCase().includes(this.search.toLowerCase())
        });
        console.log('searchproject', this.searchproject)
      }
    });
  }
  resetform() {
    this.postjobform.reset();
    this.postprojectform.reset();
  }
}
