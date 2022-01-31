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
  date: string;
  file: File;
  imageDisplay: string;
  isLoading = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private studentService: StudentService,
    private location: Location,
    private formBuilder: FormBuilder,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this._initForm();
    this.date = new Date().toDateString();
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

  private _initForm() {
    this.activityForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      position: ['', [Validators.required]],
      mark: ['', [Validators.required]],
      image: ['', Validators.required],
    });
  }
}
