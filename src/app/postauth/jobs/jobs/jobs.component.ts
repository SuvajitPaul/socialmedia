import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { PostshareService } from 'src/app/service/postshare.service';
import { SearchService } from 'src/app/service/search.service';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit, OnDestroy {
  jobpost: any;
  search: any;
  data:any;
  details:any;
  email:any;
  postjobform:FormGroup;
  searchjobitem: any;
  joblink: Subscription | any;
  searchlink: Subscription | any;
  updateWithId:any;
  modalRef:any;
  isFormValid:boolean=false;
  constructor(private jobapi: PostshareService, private searchservice: SearchService, private formBuilder: FormBuilder,private modalService: BsModalService,private toastr: ToastrService) { 
    this.postjobform = this.formBuilder.group({
      price: [''],
      title: ['', Validators.required],
      skills: [''],
      description: [''],
      country: [''],
    });
  }
  ngOnDestroy(): void {
    if (this.joblink) {
      this.joblink.unsubscribe();
      console.log('Destroy');
    }
    if (this.searchlink) {
      this.searchlink.unsubscribe();
      console.log('Destroy');
    }
  }
  ngOnInit(): void {
    this.profiledetails();
    this.Viewdata();
    this.searchdata(); 
  }
  profiledetails() {
    this.data = localStorage.getItem('authData');
    this.details = JSON.parse(this.data);
    if (this.details) {
      this.email = this.details.email;
    }
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
      record['name'] = this.details.FirstName;
      record['price'] = this.postjobform.value.price;
      record['description'] = this.postjobform.value.description;
      this.jobapi.Update(this.updateWithId, record);
      this.toastr.success('Job post updated');
      this.postjobform.reset();
      this.close();
    }
  }
  Deleterecordjob(id: any) {
    this.jobapi.Delete(id);
    this.toastr.success('Job post deleted');
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
        console.log('searchitem', this.searchjobitem)
      }
    });
  }
  resetform() {
    this.postjobform.reset();
  }
}
