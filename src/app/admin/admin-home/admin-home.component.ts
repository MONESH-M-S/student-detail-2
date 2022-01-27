import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
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
  isAdmin = false;
  isLoading = false;

  constructor(
    private adminService: AdminService,
    private dialog: MatDialog,
    private messageService: MessageService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.route.params.subscribe((params) => {
      if (params) {
        this.adminService
          .getAdminDetailByAdminName(params['name'])
          .subscribe((res) => {
            this.isAdmin = res.admin?.isAdmin;
          });
        this.adminService
          .getStudentDetailByAdminName(params['name'])
          .subscribe((res) => {
            console.log(res);
          });
      }
    });
  }

  addNewAdmin() {
    let dialogRef = this.dialog.open(AddAdminComponent, {
      width: '550px',
      disableClose: true,
      hasBackdrop: true,
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }
}
