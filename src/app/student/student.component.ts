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

  editActivity(type: string, id: string) {}

  deleteActivity(id: string) {
    let dialogRef = this.dialog.open(DeleteActivityDialogComponent);

    dialogRef.afterClosed().subscribe((res) => {
      if (res === 'Delete') {
        this.studentService
          .deleteStudentUploadedActivity(id)
          .subscribe((res) => {
            if (res.activityId !== null) {
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: res.message,
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
                detail: res.message,
              });
            }
          });
      }
    });
  }
}
