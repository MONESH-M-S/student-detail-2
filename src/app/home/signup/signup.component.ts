import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { HomeService } from '../home.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  imageDisplay: string;
  mentors = [
    'Dr.S.Vijayachitra',
    'Dr.U.S.Ragupathy',
    'Dr.R.Subasri',
    'Dr.T.Kalavathidevi',
    'r.K.Prabhu',
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
    private dialogRef: MatDialogRef<SignupComponent>,
    private formBuilder: FormBuilder,
    private homeService: HomeService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this._initForm();
  }

  onClose(): void {
    this.dialogRef.close();
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
    this.isLoading = true;
    if (this.signupForm.invalid) {
      return;
    }

    const formData = new FormData();
    formData.append('username', this.signupForm.value.username);
    formData.append('password', this.signupForm.value.password);
    formData.append('email', this.signupForm.value.email);
    formData.append('rollno', this.signupForm.value.rollno);
    formData.append('mentor', this.signupForm.value.mentor);
    formData.append('image', this.signupForm.value.image);

    this.homeService.userSignup(formData).subscribe((res) => {
      this.isLoading = false;
      if (res.user === null) {
        return this.messageService.add({
          severity: 'error',
          summary: res.message,
        });
      }
      this.dialogRef.close();
      this.router.navigate([`student/${res.user[0]._id}`]);
      return this.messageService.add({
        severity: 'success',
        summary: res.message,
      });
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
}
