import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { StudentService } from '../../student.service';

@Component({
  selector: 'app-intern',
  templateUrl: './intern.component.html',
  styleUrls: ['./intern.component.scss'],
})
export class InternComponent implements OnInit {
  id: string;
  name: string;
  activityForm: FormGroup;
  date: any;
  file: File;
  imageDisplay: string;
  isLoading = false;
  editMode = false;
  aid: string;
  formValues: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private studentService: StudentService,
    private location: Location,
    private formBuilder: FormBuilder,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.date = new Date();
    this.route.queryParams.subscribe((query) => {
      if (query.edit) {
        this.editMode = true;
        this.aid = query.aid;
        this._setFormValue();
      }
    });
    this._initForm();
    this.route.params.subscribe((params) => {
      if (params) {
        this.id = params['id'];
        this.studentService.getStudentDataById(this.id).subscribe((res) => {
          if (res.user[0]._id) {
            this.name = res.user[0].username;
          }
        });
      }
    });
  }

  goBack() {
    this.location.back();
  }

  onUpload(event: any) {
    this.file = event.files[0];
    this.activityForm.patchValue({ image: this.file });
    this.activityForm.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imageDisplay = reader.result as string;
    };
    reader.readAsDataURL(this.file);
  }

  onClear() {
    window.location.reload();
  }

  onSubmit() {
    this.isLoading = true;
    if (this.activityForm.invalid) {
      return;
    }

    const f = this.activityForm.value;

    const formData = new FormData();

    if (this.editMode === false) {
      formData.append('name', f.name);
      formData.append('location', f.location);
      formData.append('stipend', f.stipend);
      formData.append('startDate', f.startDate);
      formData.append('endDate', f.endDate);
      formData.append('mark', f.mark);
      formData.append('image', f.image, f.name);
      formData.append('type', 'internship');
      formData.append('uploadedDate', this.date);

      this.studentService
        .uploadStudentActivity(this.id, formData)
        .subscribe((res) => {
          if (res.activity._id) {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: res.message,
            });
            window.setTimeout(() => {
              this.isLoading = false;
              this.router.navigate([`s/${this.id}/a/${res.activity._id}`]);
            }, 3500);
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: res.message,
            });
          }
        });
    } else {
      const form = {
        name: f.name,
        location: f.location,
        stipend: f.stipend,
        startDate: f.startDate,
        endDate: f.endDate,
        mark: f.mark,
        uploadedDate: this.date,
      };

      this.studentService
        .updateStudentActivity(form, this.aid)
        .subscribe((res) => {
          if (res.activity._id) {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: res.message,
            });
            window.setTimeout(() => {
              this.isLoading = false;
              this.router.navigate([`s/${this.id}/a/${res.activity._id}`]);
            }, 3500);
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: res.message,
            });
          }
        });
    }
  }

  private _initForm() {
    if (this.editMode == false) {
      this.activityForm = this.formBuilder.group({
        name: ['', [Validators.required]],
        location: ['', [Validators.required]],
        stipend: ['', [Validators.required]],
        startDate: ['', [Validators.required]],
        endDate: ['', [Validators.required]],
        mark: ['', [Validators.required]],
        image: ['', Validators.required],
      });
    } else {
      this.activityForm = this.formBuilder.group({
        name: ['', [Validators.required]],
        location: ['', [Validators.required]],
        stipend: ['', [Validators.required]],
        startDate: ['', [Validators.required]],
        endDate: ['', [Validators.required]],
        mark: ['', [Validators.required]],
      });
    }
  }

  private _setFormValue() {
    if (this.aid !== null || this.aid !== undefined) {
      this.studentService.getActivityById(this.aid).subscribe((res) => {
        this.formValues = res.activity;
        this.activityForm.get('name').setValue(this.formValues.name);
        this.activityForm.get('location').setValue(this.formValues.location);
        this.activityForm.get('stipend').setValue(this.formValues.stipend);
        this.activityForm.get('startDate').setValue(this.formValues.startDate);
        this.activityForm.get('endDate').setValue(this.formValues.endDate);
        this.activityForm.get('mark').setValue(this.formValues.mark);
        this.imageDisplay = this.formValues.image;
      });
    }
  }
}
