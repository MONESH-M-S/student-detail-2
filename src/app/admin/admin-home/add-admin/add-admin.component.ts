import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MessageService } from 'primeng/api';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.scss'],
})
export class AddAdminComponent implements OnInit {
  addAdminForm: FormGroup;
  isLoading = false;
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
  constructor(
    private dialogRef: MatDialogRef<AddAdminComponent>,
    private formBuilder: FormBuilder,
    private adminService: AdminService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this._initForm();
  }

  onSubmit() {
    if (this.addAdminForm.invalid) return;

    this.isLoading = true;

    const f = this.addAdminForm.value;
    const form = {
      name: f.name,
      email: f.email,
      password: f.password,
      department: f.department,
      isAdmin: f.isAdmin,
    };

    this.adminService.adminSignUp(form).subscribe((res) => {
      this.isLoading = false;
      this.dialogRef.close();
      if (res.admin?._id) {
        return this.messageService.add({
          severity: 'success',
          summary: 'Admin Added Successfully!',
        });
      } else {
        return this.messageService.add({
          severity: 'error',
          summary: res.message,
        });
      }
    });
  }

  onClose() {
    this.dialogRef.close();
  }

  private _initForm() {
    this.addAdminForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.min(6)]],
      department: ['', [Validators.required]],
      isAdmin: [false, [Validators.required]],
    });
  }
}
