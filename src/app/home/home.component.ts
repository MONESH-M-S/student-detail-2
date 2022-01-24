import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { SignupComponent } from './signup/signup.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  errorMsg = '';
  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {}

  onSignUpClicked() {
    this.dialog.open(SignupComponent, {
      width: '450px',
      disableClose: true,
      hasBackdrop: true,
    });
  }
}
