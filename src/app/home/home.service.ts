import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  BACKEND_URL = environment.backend_url;
  isLoggedIn = false

  constructor(private http: HttpClient) {}

  userLogin(form: { email: string; password: string }) {
    return this.http.post<{ user: User; message: string }>(
      `${this.BACKEND_URL}user/login`,
      form
    );
  }

  userSignup(form: FormData) {
    return this.http.post<{ user: User; message: string }>(
      `${this.BACKEND_URL}user/signup`,
      form
    );
  }
}
