import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SearchService } from 'src/app/service/search.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private route: Router, private service: SearchService, private toastr: ToastrService,private auth: AuthService) { }

  ngOnInit(): void {
  }
  searchdata(event: any) {
    console.log('search', event.target.value);
    this.service.setSearchData(event.target.value);
  }
  logout() {
    let logout = confirm("Are you want to logout");
    if (logout == true) {
      this.auth.logout();
      localStorage.removeItem('authData');
      this.toastr.success('Log Out');
      this.route.navigateByUrl('');
    } 
  }
}
