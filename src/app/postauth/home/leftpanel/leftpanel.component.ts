import { Component, OnInit } from '@angular/core';
import { UserdetailsService } from 'src/app/service/userdetails.service';

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
  userid:any;
  constructor(public userinfo: UserdetailsService) { 
    this.profiledetails();
    this.viewdata();
    
  }

  ngOnInit(): void {
  }
  profiledetails() {
    this.data = localStorage.getItem('authData');
    this.details = JSON.parse(this.data);
  }
  viewdata(){
    this.userinfo.getuserdetails().subscribe((res) => {
      this.userid = res.map(item => {
        const object: any = item.payload.doc.data();
        object["id"] = item.payload.doc.id;
        return object;
      })
      console.log('userid', this.userid);
      //this.userinfo.userinformation.next(this.userid);
    });
  }
}
