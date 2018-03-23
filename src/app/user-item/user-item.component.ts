import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.css']
})
export class UserItemComponent implements OnInit {
    name:string;
    @Input() name2:string;//有这个constructor里就不用写关于name2的
  constructor() {
    this.name = 'nihaoa'
    }

  ngOnInit() {
  }

}
