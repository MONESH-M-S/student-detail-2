import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-show-all-marks',
  templateUrl: './show-all-marks.component.html',
  styleUrls: ['./show-all-marks.component.scss'],
})
export class ShowAllMarksComponent implements OnInit {
  marks = [];
  constructor(private adminService: AdminService, private location: Location) {}

  ngOnInit(): void {
    this.adminService.getAllMarks().subscribe((res) => {
      this.marks = res.marks;
      console.log(res);
    });
  }

  goBack() {
    this.location.back();
  }
}
