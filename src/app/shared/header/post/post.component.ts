import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { PostprojectService } from 'src/app/service/postproject.service';
import { PostshareService } from 'src/app/service/postshare.service';
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  postjobform: FormGroup;
  postprojectform: FormGroup;
  modalRef!: BsModalRef;
  data: any;
  details: any;
  role1: any;
  post: any = {};
  isRegisterFormValid: boolean = false;
  constructor(private formBuilder: FormBuilder, private modalService: BsModalService, private projectapi: PostprojectService, private toastr: ToastrService, private jobapi: PostshareService) {
    this.postjobform = this.formBuilder.group({
      price: [''],
      title: ['', Validators.required],
      skills: [''],
      description: [''],
      country: [''],
      imageUrl: ['']
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
  }
  ngOnInit(): void {
    this.profiledetails();
  }
  openproject(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  openjob(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  profiledetails() {
    this.data = localStorage.getItem('authData');
    this.details = JSON.parse(this.data);
  }
  postprojects() {
    this.isRegisterFormValid = true;
    if (this.postprojectform.valid) {
      this.isRegisterFormValid = false;
      let rec: any = {};
      rec['title1'] = this.postprojectform.value.title1;
      rec['skills1'] = this.postprojectform.value.skills1;
      rec['price1'] = this.postprojectform.value.price1;
      rec['price2'] = this.postprojectform.value.price2;
      rec['description1'] = this.postprojectform.value.description1;
      rec['country1'] = this.postprojectform.value.country1;
      rec['name'] = this.details.FirstName;
      rec['email'] = this.details.email;
      this.projectapi.Insert(rec);
      this.postprojectform.reset();
      this.toastr.success('Project record inserted');
      this.close();
    }
    else {
      console.log('else');
    }
  }
  close() {
    this.resetform();
    this.modalRef.hide();
  }
  postjob() {
    this.isRegisterFormValid = true;
    if (this.postjobform.valid) {
      this.isRegisterFormValid = false;
      let record: any = {};
      record['title'] = this.postjobform.value.title;
      record['skills'] = this.postjobform.value.skills;
      record['price'] = this.postjobform.value.price;
      record['description'] = this.postjobform.value.description;
      record['country'] = this.postjobform.value.country;
      record['name'] = this.details.FirstName;
      record['email'] = this.details.email;
      this.jobapi.Insert(record).then((res: any) => {
        console.log('data', res);
        this.toastr.success('Job record inserted');
        record = '';
      }).catch((err: any) => {
        this.toastr.error('err', err);
        console.log('err', err);
      })
      this.close();
    }
  }
  resetform() {
    this.postjobform.reset();
    this.postprojectform.reset();
  }
}
