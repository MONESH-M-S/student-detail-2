import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MessageService } from 'primeng/api';
import { HomeService } from './home.service';
import { SignupComponent } from './signup/signup.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  errorMsg = '';
  constructor(
    private dialog: MatDialog,
    private homeService: HomeService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    const loginData = {
      email: form.value.email,
      password: form.value.password,
    };

    this.homeService.userLogin(loginData).subscribe((res) => {
      if (res.user === null) {
        return this.messageService.add({
          severity: 'error',
          summary: res.message,
        });
      }
    });
  }

  onSignUpClicked() {
    this.dialog.open(SignupComponent, {
      width: '450px',
      disableClose: true,
      hasBackdrop: true,
    });
  }
}
