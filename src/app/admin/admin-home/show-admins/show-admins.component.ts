import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../../admin.service';
import { AddAdminComponent } from '../add-admin/add-admin.component';

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
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params) {
        this.id = params['id'];
      }
    });
    this.adminService.getAllAdmins().subscribe((res) => {
      this.admins = res.admins;
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
}
