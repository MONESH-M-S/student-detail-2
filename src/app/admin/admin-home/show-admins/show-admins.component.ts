import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AdminService } from '../../admin.service';
import { AddAdminComponent } from '../add-admin/add-admin.component';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-show-admins',
  templateUrl: './show-admins.component.html',
  styleUrls: ['./show-admins.component.scss'],
})
export class ShowAdminsComponent implements OnInit {
  id: string;
  admins = [];
  isLoading = false;

  constructor(
    private adminService: AdminService,
    private router: Router,
    private location: Location,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.isLoading = true;
      if (params) {
        this.id = params['id'];
      }
    });
    this.adminService.getAllAdmins().subscribe((res) => {
      this.admins = res.admins;
      this.isLoading = false;
    });
  }

  goBack() {
    this.location.back();
  }

  addAdmin() {
    let dialogRef = this.dialog.open(AddAdminComponent, {
      width: '550px',
      disableClose: true,
      hasBackdrop: true,
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }

  deleteAdmin(id: string) {
    let dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '280px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'Delete') {
        this.adminService.deleteAdminById(id).subscribe((res) => {
          if (res.adminId) {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Delete Successfully!',
            });
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: res.message,
            });
          }
          this.adminService.getAllAdmins().subscribe((res) => {
            this.admins = res.admins;
          });
        });
      }
    });
  }
}
