import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../home/user.model';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  BACKEND_URL = environment.backend_url;
  constructor(private http: HttpClient) {}

  studentDetailUpdatePasswordCheck(data: { email: string; password: string }) {
    return this.http.post<{ user: User; message: string }>(
      `${this.BACKEND_URL}user/login`,
      data
    );
  }

  getStudentDataById(id: string) {
    return this.http.get<{ user: User; message: string }>(
      `${this.BACKEND_URL}user/${id}`
    );
  }

  updateStudentData(id: string, form: FormData) {
    return this.http.put<{ user: User; message: string }>(
      `${this.BACKEND_URL}user/${id}`,
      form
    );
  }

  uploadStudentActivity(id: string, form: FormData) {
    return this.http.post<{ activity: any; message: string }>(
      `${this.BACKEND_URL}activity/${id}`,
      form
    );
  }
}
