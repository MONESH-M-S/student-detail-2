import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
  @Output() activityDeleted = new EventEmitter();
  id: string;
  activityArray: any;
  isActivitiesAvailable = false;
  deletedActivity: any;

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

  editActivity(type: string, creator: string, id: string) {
    let modifiedType = type;
    if (type === 'internship') {
      modifiedType = 'intern';
    }
    this.router.navigate([`s/${creator}/${modifiedType}`], {
      queryParams: { edit: true, aid: id },
    });
  }

  deleteActivity(id: string) {
    let dialogRef = this.dialog.open(DeleteActivityDialogComponent);
    dialogRef.afterClosed().subscribe((res) => {
      if (res === 'Delete') {
        if (res === 'Delete') {
          this.adminService.getActivityById(id).subscribe((res) => {
            if (res.activity) {
              this.deletedActivity = res.activity;
              this.adminService
                .deleteStudentUploadedActivity(id)
                .subscribe((res) => {
                  this.activityDeleted.emit('Deleted');
                  if (res.activityId !== null) {
                    const type = this.deletedActivity.type;
                    const mark = 0 - this.deletedActivity.mark;
                    const creator = this.deletedActivity.creator;
                    this.adminService
                      .updateMarkById(type, creator, mark)
                      .subscribe((res) => {
                        if (res.message === 'Mark Updated!') {
                          this.messageService.add({
                            severity: 'success',
                            summary: 'Success',
                            detail: 'Activity Deleted!',
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
                            detail:
                              'Activity deleted, Mark Not updated Contact Admin!',
                          });
                        }
                      });
                  } else {
                    this.messageService.add({
                      severity: 'error',
                      summary: 'Error',
                      detail: 'Error, Activity not deleted!',
                    });
                  }
                });
            } else {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Error, Cannot be deleted contact admin',
              });
            }
          });
        }
      }
    });
  }
}
