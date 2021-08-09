import { Component, OnDestroy, OnInit } from '@angular/core';
import { PostshareService } from 'src/app/service/postshare.service';
import { SearchService } from 'src/app/service/search.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit, OnDestroy {
  jobpost: any;
  role1: string = '';
  data: any;
  details: any;
  search: any;
  searchjobitem: any;
  joblink: Subscription | any;
  searchlink: Subscription | any;
  constructor(private jobapi: PostshareService, private searchservice: SearchService) { }
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
    this.Viewdata();
    this.searchdata(); 
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
}
