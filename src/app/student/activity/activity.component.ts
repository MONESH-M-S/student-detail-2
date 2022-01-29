import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MegaMenuItem } from 'primeng/api';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss'],
})
export class ActivityComponent implements OnInit {
  activites: MegaMenuItem[];

  constructor(
    private dialogRef: MatDialogRef<ActivityComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this._initActivities();
  }

  onClose() {
    this.dialogRef.close();
  }

  private _initActivities() {
    this.activites = [
      {
        label: 'Paper Presented',
        icon: 'pi pi-fw pi-file',
        command: () => {
          console.log('paper');
        },
      },
      {
        label: 'Project Presented',
        icon: 'pi pi-fw pi-th-large',
        command: () => {
          console.log('project');
        },
      },
      {
        label: 'Club',
        icon: 'pi pi-fw pi-palette',
        command: () => {
          console.log('project');
        },
      },
      {
        label: 'Value Added Course',
        icon: 'pi pi-fw pi-clone',
        command: () => {
          console.log('project');
        },
      },
      {
        label: 'Gate Exam',
        icon: 'pi pi-fw pi-eject',
        command: () => {
          console.log('project');
        },
      },
      {
        label: 'Sports',
        icon: 'pi pi-fw pi-ban',
        command: () => {
          console.log('project');
        },
      },
      {
        label: 'Internship',
        icon: 'pi pi-fw pi-circle-fill',
        command: () => {
          console.log('project');
        },
      },
      {
        label: 'Placement',
        icon: 'pi pi-fw pi-link',
        command: () => {
          console.log('project');
        },
      },
      {
        label: 'NCC',
        icon: 'pi pi-fw pi-caret-up',
        command: () => {
          console.log('project');
        },
      },
      {
        label: 'Social/Other Activities',
        icon: 'pi pi-fw pi-box',
        command: () => {
          console.log('project');
        },
      },
    ];
  }
}
