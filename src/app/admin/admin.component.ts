import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  isLoading = false;
  constructor() {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    this.isLoading = true;
  }
}
