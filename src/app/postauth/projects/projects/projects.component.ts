import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { PostprojectService } from 'src/app/service/postproject.service';
import { SearchService } from 'src/app/service/search.service';
import { Subscription } from 'rxjs';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit, OnDestroy {
  projectpost: any;
  search: any;
  searchItem: any;
  postprojectform: FormGroup;
  projectlink: Subscription | any;
  searchlink: Subscription | any;
  updateWithId: any;
  isFormValid: boolean = false;
  modalRef: any;
  data: any;
  details: any;
  email: any;
  constructor(private projectapi: PostprojectService, private searchservice: SearchService, private formBuilder: FormBuilder, private modalService: BsModalService, private toastr: ToastrService) {
    this.postprojectform = this.formBuilder.group({
      title1: ['', Validators.required],
      skills1: [''],
      price1: [''],
      price2: [''],
      description1: [''],
      country1: [''],
    });
  }
  ngOnDestroy(): void {
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
    this.resetform();
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

  Viewdata() {
    this.projectlink = this.projectapi.View().subscribe((res) => {
      this.projectpost = res.map(item => {
        const object: any = item.payload.doc.data();
        object["id"] = item.payload.doc.id;
        return object;
      })
      console.log('projectpost', this.projectpost);
    });
  }
  Deleterecordproject(id: any) {
    this.projectapi.Delete(id);
    this.toastr.success('Project post deleted');
  }
  close() {
    this.resetform();
    this.modalRef.hide();
  }
  searchdata() {
    this.searchlink = this.searchservice.getSearchData().subscribe((search: any) => {
      this.search = search;
      if (this.search) {
        this.searchItem = this.projectpost.filter((item1: any) => {
          return item1.data.title1.toLowerCase().includes(this.search.toLowerCase())
        });
        console.log('searchitem', this.searchItem)
      }
    });
  }
  resetform() {
    this.postprojectform.reset();
  }
}
