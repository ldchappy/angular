import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
    name2:string[];
  constructor() { this.name2 = ['a2','s','d','f2','g']}

  ngOnInit() {
  }

}
