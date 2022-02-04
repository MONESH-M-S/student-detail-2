import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Admin } from '../admin.model';
import { AdminService } from '../admin.service';
import { AddAdminComponent } from './add-admin/add-admin.component';
import { NewPasswordComponent } from './change-password/new-password/new-password.component';
import { OldPasswordComponent } from './change-password/old-password/old-password.component';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss'],
})
export class AdminHomeComponent implements OnInit {
  adminDetail: Admin;
  id: string;
  adminEmail: string;
  studentDetail: any;
  isSutdentDetailAvailable = false;
  isAdmin = false;
  isLoading = false;

  constructor(
    private adminService: AdminService,
    private dialog: MatDialog,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.isLoading = true;
      if (params) {
        this.adminService
          .getAdminDetailByAdminName(params['name'])
          .subscribe((res) => {
            this.isAdmin = res.admin?.isAdmin;
            this.id = res.admin?._id;
            this.adminEmail = res.admin?.email;
          });
        this.adminService
          .getStudentDetailByAdminName(params['name'])
          .subscribe((res) => {
            if (res.users === null) {
              this.isSutdentDetailAvailable = true;
            }
            this.studentDetail = res.users;
          });
      }
      this.isLoading = false;
    });
  }

  onCardClick(id: string) {
    this.router.navigate([`admin/s/${id}`]);
  }

  changePassword() {
    let dialogRef = this.dialog.open(OldPasswordComponent, {
      disableClose: true,
      hasBackdrop: true,
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res === '') {
        return;
      }
      const form = {
        email: this.adminEmail,
        password: res,
      };
      this.adminService.adminLogin(form).subscribe((res) => {
        this.isLoading = false;
        if (res.admin === null) {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: res.message,
          });
        } else {
          let dialogRef = this.dialog.open(NewPasswordComponent, {
            disableClose: true,
            hasBackdrop: true,
          });
          dialogRef.afterClosed().subscribe((res) => {
            this.adminService
              .updateAdminPassword(this.id, res)
              .subscribe((res) => {
                if (res.admin?._id && res.message === 'Updated Successfully!') {
                  this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'Updated Successfully!',
                  });
                } else {
                  this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: res.message,
                  });
                }
              });
          });
        }
      });
    });
  }

  showAdmins() {
    this.router.navigate([`admin/show-admins/${this.id}`]);
  }

  addNewAdmin() {
    let dialogRef = this.dialog.open(AddAdminComponent, {
      width: '550px',
      disableClose: true,
      hasBackdrop: true,
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }

  showAllMarks() {
    this.router.navigate([`admin/show-marks/${this.id}`]);
  }
}
