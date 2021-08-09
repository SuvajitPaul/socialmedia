import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-leftpanel',
  templateUrl: './leftpanel.component.html',
  styleUrls: ['./leftpanel.component.css']
})
export class LeftpanelComponent implements OnInit {
  data:any;
  googledata:any;
  details:any;
  role1:any;
  constructor() { 
    this.profiledetails();
  }

  ngOnInit(): void {
  }
  profiledetails() {
    this.data = localStorage.getItem('authData');
    
    this.details = JSON.parse(this.data);
    
    
  }

}
