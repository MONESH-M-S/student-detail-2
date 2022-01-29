import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { StudentService } from '../student.service';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-edit-detail',
  templateUrl: './edit-detail.component.html',
  styleUrls: ['./edit-detail.component.scss'],
})
export class EditDetailComponent implements OnInit {
  signupForm: FormGroup;
  imageDisplay: string;
  id: string;
  userAlreadyEnteredData;
  password: string;
  mentors = [
    'Dr.S.Vijayachitra',
    'Dr.U.S.Ragupathy',
    'Dr.R.Subasri',
    'Dr.T.Kalavathidevi',
    'Dr.K.Prabhu',
    'Dr.S.J.Suji Prasad',
    'Dr.M.Madhan Mohan',
    'Dr.K.N.Baluprithviraj',
    'Dr.N.Mahesh',
    'Dr.M.Sasireka',
    'Dr.P.Vidhyalakshmi',
    'S.Janarthanan',
    'M.Raja',
    'M.Lizzy Nesa Bagyam',
    'P.Revathi',
    'R.Mouleeshuwarpprabhu',
    'R.Rajkumar',
    'M.Thangatamilan',
    'K.Yuvaraj',
    'C.Aravind',
    'S.Jegan',
    'B.Venkatesan',
    'D.Selvakarthi',
    'T.Mrunalini',
  ];
  isLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    private studentService: StudentService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this._initForm();
    this.route.params.subscribe((params) => {
      if (params) {
        this.id = params['id'];
        this.studentService
          .getStudentDataById(params['id'])
          .subscribe((res) => {
            this.userAlreadyEnteredData = res.user[0];
            this._setFormValue();
          });
      }
    });
  }

  onUpload(event: any) {
    const file = event.files[0];
    this.signupForm.patchValue({ image: file });
    this.signupForm.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imageDisplay = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onSubmitSignupForm() {
    if (this.signupForm.invalid) {
      return;
    }

    let dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { password: this.password },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result !== '') {
        this.isLoading = true;
        const form = {
          email: this.signupForm.value.email,
          password: result,
        };
        this.studentService
          .studentDetailUpdatePasswordCheck(form)
          .subscribe((res) => {
            if (res.message === 'Invalid Password!') {
              this.isLoading = false;
              return this.messageService.add({
                severity: 'error',
                summary: 'Invalid Password!',
              });
            } else {
              const formData = new FormData();
              formData.append('username', this.signupForm.value.username);
              formData.append('password', this.signupForm.value.password);
              formData.append('email', this.signupForm.value.email);
              formData.append('rollno', this.signupForm.value.rollno);
              formData.append('mentor', this.signupForm.value.mentor);
              formData.append('image', this.signupForm.value.image);

              this.studentService
                .updateStudentData(this.id, formData)
                .subscribe((res) => {
                  if (res.user !== null) {
                    this.messageService.add({
                      severity: 'success',
                      summary: 'Updated Successfully!',
                    });
                    window.setTimeout(() => {
                      this.router.navigate([`s/${this.id}`]);
                    }, 2500);
                  } else {
                    return this.messageService.add({
                      severity: 'error',
                      summary: res.message,
                    });
                  }
                });

              this.isLoading = false;
            }
          });
      }
    });
  }

  private _initForm() {
    this.signupForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      rollno: ['', [Validators.required, Validators.min(8)]],
      password: ['', [Validators.required, Validators.min(6)]],
      mentor: ['', [Validators.required]],
      image: ['', [Validators.required]],
    });
  }

  private _setFormValue() {
    this.signupForm
      .get('username')
      .setValue(this.userAlreadyEnteredData.username);
    this.signupForm.get('email').setValue(this.userAlreadyEnteredData.email);
    this.signupForm.get('rollno').setValue(this.userAlreadyEnteredData.rollno);
    this.signupForm.get('mentor').setValue(this.userAlreadyEnteredData.mentor);
    this.imageDisplay = this.userAlreadyEnteredData.image;
  }
}
