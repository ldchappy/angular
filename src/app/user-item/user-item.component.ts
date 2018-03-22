import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.css']
})
export class UserItemComponent implements OnInit {
    //name:string;
    @Input() name2:string;
  constructor() {
    //this.name = 'nihaoa'
    }

  ngOnInit() {
  }

}
