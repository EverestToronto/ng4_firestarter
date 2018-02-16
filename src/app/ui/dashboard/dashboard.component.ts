import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public modalBoolean = false;

  constructor() { }

  ngOnInit() {
  }

  showModal() {
    this.modalBoolean = true;
  }

  closeModal() {
    this.modalBoolean = false;
  }

}
