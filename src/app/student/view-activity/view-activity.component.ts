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
        this.userId = params['id'];
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
        if (res === 'Delete') {
          this.studentService
            .deleteStudentUploadedActivity(this.activityId)
            .subscribe((res) => {
              this.isLoading = true;
              if (res.activityId !== null) {
                this.messageService.add({
                  severity: 'success',
                  summary: 'Success',
                  detail: res.message,
                });
                window.setTimeout(() => {
                  this.isLoading = false;
                  return this.goBack();
                }, 2500);
              } else {
                this.isLoading = false;
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
}
