import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { StudentService } from '../../student.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
})
export class ProjectComponent implements OnInit {
  id: string;
  name: string;
  activityForm: FormGroup;
  date: any;
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
    const file = event.files[0];
    this.activityForm.patchValue({ image: file });
    this.activityForm.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imageDisplay = reader.result as string;
    };
    reader.readAsDataURL(file);
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
      formData.append('mode', f.mode);
      formData.append('prize', f.prize);
      formData.append('endDate', f.endDate);
      formData.append('mark', f.mark);
      formData.append('image', f.image, f.name);
      formData.append('type', 'project');
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
        mode: f.mode,
        prize: f.prize,
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
        mode: ['', [Validators.required]],
        prize: ['', [Validators.required]],
        endDate: ['', [Validators.required]],
        mark: ['', [Validators.required]],
        image: ['', Validators.required],
      });
    } else {
      this.activityForm = this.formBuilder.group({
        name: ['', [Validators.required]],
        location: ['', [Validators.required]],
        endDate: ['', [Validators.required]],
        mode: ['', [Validators.required]],
        prize: ['', [Validators.required]],
        mark: ['', [Validators.required]],
      });
    }
  }

  private _setFormValue() {
    if (this.aid !== null && this.aid !== undefined) {
      this.studentService.getActivityById(this.aid).subscribe((res) => {
        this.formValues = res.activity;
        console.log(this.formValues);
        this.activityForm.get('name').setValue(this.formValues.name);
        this.activityForm.get('location').setValue(this.formValues.location);
        this.activityForm.get('prize').setValue(this.formValues.prize);
        this.activityForm.get('mode').setValue(this.formValues.mode);
        this.activityForm
          .get('endDate')
          .setValue(new Date(this.formValues.endDate));
        this.activityForm.get('mark').setValue(this.formValues.mark);
        this.imageDisplay = this.formValues.image;
      });
    }
  }
}
