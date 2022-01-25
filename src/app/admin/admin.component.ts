import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from './admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  isLoading = false;
  constructor(private adminService: AdminService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    this.isLoading = true;
    const loginForm = {
      email: form.value.email,
      password: form.value.password,
    };
    this.adminService.adminLogin(loginForm).subscribe((res) => {
      this.isLoading = false;
      console.log(res);
      this.router.navigate(['admin/4']);
    });
  }
}
