import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-wildcard',
  templateUrl: './wildcard.component.html',
  styleUrls: ['./wildcard.component.css']
})
export class WildcardComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
    this.router.navigateByUrl('');
  }

}
