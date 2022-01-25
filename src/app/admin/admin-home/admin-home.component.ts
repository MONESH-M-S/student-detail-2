import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MessageService } from 'primeng/api';
import { AdminService } from '../admin.service';
import { AddAdminComponent } from './add-admin/add-admin.component';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss'],
})
export class AdminHomeComponent implements OnInit {
  constructor(
    private adminService: AdminService,
    private dialog: MatDialog,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {}

  addNewAdmin() {
    let dialogRef = this.dialog.open(AddAdminComponent, {
      width: '550px',
      disableClose: true,
      hasBackdrop: true,
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }
}
