import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  BACKEND_URL = environment.backend_url;
  constructor(private http: HttpClient) {}

  userSignup(form: FormData) {
    return this.http.post<{ user: any; message: string }>(
      `${this.BACKEND_URL}user/signup`,
      form
    );
  }
}
