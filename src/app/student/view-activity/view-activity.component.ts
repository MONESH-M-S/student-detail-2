import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DeleteActivityDialogComponent } from '../delete-activity-dialog/delete-activity-dialog.component';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-view-activity',
  templateUrl: './view-activity.component.html',
  styleUrls: ['./view-activity.component.scss'],
})
export class ViewActivityComponent implements OnInit {
  userId: string;
  activityId: string;
  activityDetail: any;
  isLoading = false;
  deletedActivity: any;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private studentService: StudentService,
    private dialog: MatDialog,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params) {
        this.activityId = params['aid'];
      }
      this.studentService.getActivityById(this.activityId).subscribe((res) => {
        if (res.activity._id) {
          this.activityDetail = res.activity;
        }
      });
    });
  }

  goBack() {
    this.location.back();
  }

  editActivity() {
    let modifiedType = this.activityDetail.type;
    if (this.activityDetail.type === 'internship') {
      modifiedType = 'intern';
    }
    this.router.navigate([`s/${this.activityDetail.creator}/${modifiedType}`], {
      queryParams: { edit: true, aid: this.activityDetail._id },
    });
  }

  deleteActivity() {
    if (this.activityId) {
      let dialogRef = this.dialog.open(DeleteActivityDialogComponent);

      dialogRef.afterClosed().subscribe((res) => {
        this.isLoading = true;
        if (res === 'Delete') {
          this.studentService
            .getActivityById(this.activityId)
            .subscribe((res) => {
              if (res.activity) {
                this.deletedActivity = res.activity;
                this.studentService
                  .deleteStudentUploadedActivity(this.activityId)
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
                            window.setTimeout(() => {
                              this.isLoading = false;
                              this.goBack();
                            }, 2500);
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
    this.isLoading = false;
  }
}
