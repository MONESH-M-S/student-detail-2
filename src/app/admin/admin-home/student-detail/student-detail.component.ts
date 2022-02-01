import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.scss'],
})
export class StudentDetailComponent implements OnInit {
  id: string;
  isLoading = false;
  paperCount: number = 0;
  projectCount: number = 0;
  total: number = 0;
  studentDetail: any;

  constructor(
    private adminService: AdminService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.isLoading = true;
      if (params) {
        this.id = params['id'];
      }
    });
    this.adminService.getStudentDetailById(this.id).subscribe((res) => {
      this.studentDetail = res?.user[0];
      this.isLoading = false;
    });
  }

  goBack() {
    this.location.back();
  }

  onRouteMarkSplitup() {}
}
