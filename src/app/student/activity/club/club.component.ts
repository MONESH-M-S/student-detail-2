import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { StudentService } from '../../student.service';

@Component({
  selector: 'app-club',
  templateUrl: './club.component.html',
  styleUrls: ['./club.component.scss'],
})
export class ClubComponent implements OnInit {
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
    const mark = f.mark;

    const formData = new FormData();
    if (this.editMode === false) {
      formData.append('name', f.name);
      formData.append('position', f.position);
      formData.append('image', f.image, f.name);
      formData.append('mark', f.mark);
      formData.append('type', 'club');
      formData.append('uploadedDate', this.date);

      this.studentService
        .uploadStudentActivity(this.id, formData)
        .subscribe((res) => {
          if (res.activity._id) {
            this.studentService
              .updateMarkById('club', this.id, mark)
              .subscribe((result) => {
                if (result.message === 'Mark Updated!') {
                  this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'Activity Added, Mark Updated!',
                  });
                  window.setTimeout(() => {
                    this.isLoading = false;
                    this.router.navigate([
                      `s/${this.id}/a/${res.activity._id}`,
                    ]);
                  }, 3500);
                } else {
                  return this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail:
                      'Activity Added But not Updated, Delete this and try later!',
                  });
                }
              });
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
        position: f.position,
        mark: f.mark,
        uploadedDate: this.date,
      };

      this.studentService
        .updateStudentActivity(form, this.aid)
        .subscribe((res) => {
          if (form.mark !== this.formValues.mark) {
            const previousMark = 0 - this.formValues.mark;
            this.studentService
              .updateMarkById('club', this.id, previousMark)
              .subscribe((res) => {
                if (res.message === 'Mark Updated!') {
                  this.studentService
                    .updateMarkById('club', this.id, form.mark)
                    .subscribe((res) => {
                      if (res.message === 'Mark Updated!') {
                        this.messageService.add({
                          severity: 'success',
                          summary: 'Success',
                          detail: 'Activity, Mark Updated!',
                        });
                      } else {
                        return this.messageService.add({
                          severity: 'error',
                          summary: 'Error',
                          detail: 'Activity Mark not Updated!',
                        });
                      }
                    });
                }
              });
          }
          if (res.activity._id) {
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
        position: ['', [Validators.required]],
        mark: ['', [Validators.required]],
        image: ['', Validators.required],
      });
    } else {
      this.activityForm = this.formBuilder.group({
        name: ['', [Validators.required]],
        position: ['', [Validators.required]],
        mark: ['', [Validators.required]],
      });
    }
  }

  private _setFormValue() {
    if (this.aid !== null && this.aid !== undefined) {
      this.studentService.getActivityById(this.aid).subscribe((res) => {
        this.formValues = res.activity;
        this.activityForm.get('name').setValue(this.formValues.name);
        this.activityForm.get('position').setValue(this.formValues.position);
        this.activityForm.get('mark').setValue(this.formValues.mark);
        this.imageDisplay = this.formValues.image;
      });
    }
  }
}
