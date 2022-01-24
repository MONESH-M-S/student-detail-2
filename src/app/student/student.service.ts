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

  getStudentDataById(id: string) {
    return this.http.get<{ user: User; message: string }>(
      `${this.BACKEND_URL}user/${id}`
    );
  }
}
