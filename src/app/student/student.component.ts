import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../home/user.model';
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
  constructor(
    private route: ActivatedRoute,
    private studentService: StudentService,
    private router: Router
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
      }
    });
  }

  openEditDialog() {
    this.router.navigate([`s/${this.id}/edit`]);
  }
}
