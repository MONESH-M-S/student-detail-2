import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
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
}
