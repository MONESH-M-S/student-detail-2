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
import { ShowAdminsComponent } from './admin/admin-home/show-admins/show-admins.component';
import { DeleteDialogComponent } from './admin/admin-home/show-admins/delete-dialog/delete-dialog.component';
import { EditDetailComponent } from './student/edit-detail/edit-detail.component';
import { ConfirmationDialogComponent } from './student/edit-detail/confirmation-dialog/confirmation-dialog.component';
import { ActivityComponent } from './student/activity/activity.component';
import { PaperComponent } from './student/activity/paper/paper.component';
import { ProjectComponent } from './student/activity/project/project.component';
import { ClubComponent } from './student/activity/club/club.component';
import { VacComponent } from './student/activity/vac/vac.component';
import { GateComponent } from './student/activity/gate/gate.component';
import { SportsComponent } from './student/activity/sports/sports.component';
import { InternComponent } from './student/activity/intern/intern.component';
import { PlacementComponent } from './student/activity/placement/placement.component';
import { NccComponent } from './student/activity/ncc/ncc.component';
import { OtherComponent } from './student/activity/other/other.component';
import { ViewActivityComponent } from './student/view-activity/view-activity.component';
import { DeleteActivityDialogComponent } from './student/delete-activity-dialog/delete-activity-dialog.component';
import { DetailedTableComponent } from './admin/admin-home/student-detail/detailed-table/detailed-table.component';
import { LockConformationDialogComponent } from './admin/admin-home/student-detail/detailed-table/lock-conformation-dialog/lock-conformation-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignupComponent,
    StudentComponent,
    AdminComponent,
    AdminHomeComponent,
    AddAdminComponent,
    StudentDetailComponent,
    ShowAdminsComponent,
    DeleteDialogComponent,
    EditDetailComponent,
    ConfirmationDialogComponent,
    ActivityComponent,
    PaperComponent,
    ProjectComponent,
    ClubComponent,
    VacComponent,
    GateComponent,
    SportsComponent,
    InternComponent,
    PlacementComponent,
    NccComponent,
    OtherComponent,
    ViewActivityComponent,
    DeleteActivityDialogComponent,
    DetailedTableComponent,
    LockConformationDialogComponent
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
