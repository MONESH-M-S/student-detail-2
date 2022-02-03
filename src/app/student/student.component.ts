import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { User } from '../home/user.model';
import { ActivityComponent } from './activity/activity.component';
import { DeleteActivityDialogComponent } from './delete-activity-dialog/delete-activity-dialog.component';
import { StudentService } from './student.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss'],
})
export class StudentComponent implements OnInit {
  id: string;
  userData: User;
  userActivity: any;
  isActivitiesAvailable = false;
  deletedActivity: any;
  studentMarkDetail: any;

  constructor(
    private route: ActivatedRoute,
    private studentService: StudentService,
    private router: Router,
    private dialog: MatDialog,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params) {
        this.id = params['id'];
        this.studentService
          .getStudentDataById(params['id'])
          .subscribe((res) => {
            if (res.user !== []) {
              this.userData = res?.user[0];
            }
          });
        this.studentService
          .getStudentUploadedActivity(this.id)
          .subscribe((res) => {
            if (res.activities !== null) {
              this.isActivitiesAvailable = true;
              this.userActivity = res.activities;
            }
          });
        this.studentService.getStudentMarkById(this.id).subscribe((res) => {
          if (res.mark) {
            this.studentMarkDetail = res.mark[0];
          }
        });
      }
    });
  }

  openEdit() {
    this.router.navigate([`s/${this.id}/edit`]);
  }

  openUploadNewDialog() {
    this.dialog.open(ActivityComponent, {
      data: {
        id: this.id,
      },
      disableClose: true,
      hasBackdrop: true,
    });
  }

  viewActivity(id: string) {
    this.router.navigate([`s/${this.id}/a/${id}`]);
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
        this.studentService.getActivityById(id).subscribe((res) => {
          if (res.activity) {
            this.deletedActivity = res.activity;
            this.studentService
              .deleteStudentUploadedActivity(id)
              .subscribe((res) => {
                if (res.activityId !== null) {
                  const type = this.deletedActivity.type;
                  const mark = 0 - this.deletedActivity.mark;
                  const creator = this.deletedActivity.creator;
                  this.studentService
                    .updateMarkById(type, creator, mark)
                    .subscribe((res) => {
                      if (res.message === 'Mark Updated!') {
                        this.messageService.add({
                          severity: 'success',
                          summary: 'Success',
                          detail: 'Activity Deleted!',
                        });
                        this.studentService
                          .getStudentUploadedActivity(this.id)
                          .subscribe((res) => {
                            if (res.activities !== null) {
                              this.isActivitiesAvailable = true;
                              this.userActivity = res.activities;
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
    });
  }
}
