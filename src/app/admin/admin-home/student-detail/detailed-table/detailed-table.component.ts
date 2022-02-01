import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AdminService } from 'src/app/admin/admin.service';
import { DeleteActivityDialogComponent } from 'src/app/student/delete-activity-dialog/delete-activity-dialog.component';
import { LockConformationDialogComponent } from './lock-conformation-dialog/lock-conformation-dialog.component';

@Component({
  selector: 'app-detailed-table',
  templateUrl: './detailed-table.component.html',
  styleUrls: ['./detailed-table.component.scss'],
})
export class DetailedTableComponent implements OnInit {
  id: string;
  activityArray: any;
  isActivitiesAvailable = false;

  constructor(
    private adminService: AdminService,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.id = params['id'];
        this.adminService.getStudentActivitesById(this.id).subscribe((res) => {
          if (res.activities.length > 0) {
            this.isActivitiesAvailable = true;
            this.activityArray = res.activities;
          }
        });
      }
    });
  }

  lockedActivity(name: string) {
    this.messageService.add({
      severity: 'error',
      summary: 'Warning',
      detail: 'Activity is locked, Delete Activity is only Allowed!',
    });
  }

  lockActivity(id: string) {
    let dialogRef = this.dialog.open(LockConformationDialogComponent);

    dialogRef.afterClosed().subscribe((res) => {
      if (res === 'Lock') {
        this.adminService.lockActivityById(id).subscribe((res) => {
          if (res.activity._id !== null) {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: res.message,
            });
            this.adminService
              .getStudentActivitesById(this.id)
              .subscribe((res) => {
                if (res.activities !== null) {
                  this.isActivitiesAvailable = true;
                  this.activityArray = res.activities;
                } else {
                  this.isActivitiesAvailable = false;
                }
              });
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: res.message,
            });
          }
        });
      }
    });
  }

  viewActivity(id: string) {
    this.router.navigate([`admin/s/view/${id}`]);
  }

  deleteActivity(id: string) {
    let dialogRef = this.dialog.open(DeleteActivityDialogComponent);
    dialogRef.afterClosed().subscribe((res) => {
      if (res === 'Delete') {
        this.adminService.deleteStudentUploadedActivity(id).subscribe((res) => {
          if (res.activityId !== null) {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: res.message,
            });
            this.adminService
              .getStudentActivitesById(this.id)
              .subscribe((res) => {
                if (res.activities !== null) {
                  this.isActivitiesAvailable = true;
                  this.activityArray = res.activities;
                } else {
                  this.isActivitiesAvailable = false;
                }
              });
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: res.message,
            });
          }
        });
      }
    });
  }
}
