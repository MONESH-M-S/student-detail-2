import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../home/user.model';
import { Admin } from './admin.model';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  BACKEND_URL = environment.backend_url;
  constructor(private http: HttpClient) {}

  adminLogin(form: { email: string; password: string }) {
    return this.http.post<{ admin: Admin; message: string }>(
      `${this.BACKEND_URL}admin/login`,
      form
    );
  }

  adminSignUp(form: Admin) {
    return this.http.post<{ admin: Admin; message: string }>(
      `${this.BACKEND_URL}admin/signup`,
      form
    );
  }

  getAdminDetailByAdminName(adminName: string) {
    return this.http.get<{ admin: Admin; message: string }>(
      `${this.BACKEND_URL}admin/${adminName}`
    );
  }

  getStudentDetailByAdminName(adminName: string) {
    return this.http.get<{ users: User[]; message: string }>(
      `${this.BACKEND_URL}user/${adminName}/admin-name`
    );
  }

  getStudentDetailById(id: string) {
    return this.http.get<{ user: User; message: string }>(
      `${this.BACKEND_URL}user/${id}`
    );
  }

  getStudentActivitesById(id: string) {
    return this.http.get<{ activities: any; message: string }>(
      `${this.BACKEND_URL}activity/s/${id}`
    );
  }

  getAllAdmins() {
    return this.http.get<{ admins: Admin[]; message: string }>(
      `${this.BACKEND_URL}admin/`
    );
  }

  lockActivityById(id: string) {
    return this.http.put<{ activity: any; message: string }>(
      `${this.BACKEND_URL}activity/lock-activity/${id}`,
      id
    );
  }

  deleteAdminById(id: string) {
    return this.http.delete<{ adminId: string; message: string }>(
      `${this.BACKEND_URL}admin/${id}`
    );
  }

  deleteStudentUploadedActivity(id: string) {
    return this.http.delete<{ activityId: string; message: string }>(
      `${this.BACKEND_URL}activity/${id}`
    );
  }

  getAllMarks() {
    return this.http.get<{ marks: any; message: string }>(
      `${this.BACKEND_URL}mark/`
    );
  }
}
