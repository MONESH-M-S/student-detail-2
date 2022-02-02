import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Admin } from '../admin.model';
import { AdminService } from '../admin.service';
import { AddAdminComponent } from './add-admin/add-admin.component';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss'],
})
export class AdminHomeComponent implements OnInit {
  adminDetail: Admin;
  id: string;
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
