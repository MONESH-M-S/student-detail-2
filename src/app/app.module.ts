import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { MaterialModule } from './material.module';
import { PrimengModule } from './primeng.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './home/signup/signup.component';
import { HttpClientModule } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { StudentComponent } from './student/student.component';
import { AdminComponent } from './admin/admin.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { AddAdminComponent } from './admin/admin-home/add-admin/add-admin.component';
import { StudentDetailComponent } from './admin/admin-home/student-detail/student-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignupComponent,
    StudentComponent,
    AdminComponent,
    AdminHomeComponent,
    AddAdminComponent,
    StudentDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    PrimengModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
