import { Component, OnDestroy, OnInit } from '@angular/core';
import { PostprojectService } from 'src/app/service/postproject.service';
import { SearchService } from 'src/app/service/search.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit, OnDestroy {
  projectpost: any;
  search: any;
  searchItem: any;
  projectlink: Subscription | any;
  searchlink: Subscription | any;
  constructor(private projectapi: PostprojectService, private searchservice: SearchService) { }
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
    this.Viewdata();
    this.searchdata();
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
}
