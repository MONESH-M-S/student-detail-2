import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss'],
})
export class ActivityComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<ActivityComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onClose() {
    this.dialogRef.close();
  }

  onClickedActivity(activity: string) {
    this.dialogRef.close();
    this.router.navigate([`s/${this.data.id}/${activity}`]);
  }
}
